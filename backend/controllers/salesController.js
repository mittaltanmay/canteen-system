const { exec } = require("child_process");

exports.getProcessedSales = (req, res) => {
    console.log("📥 Fetching processed sales from all MapReduce runs...");

    // STEP 1 — List all folders inside /salesprocessed
    exec(`hdfs dfs -ls /salesprocessed`, (err, stdout) => {
        if (err) {
            console.error("❌ Error listing /salesprocessed:", err.message);
            return res.status(500).json({ error: "Failed to list processed folders" });
        }

        const folders = stdout
            .split("\n")
            .filter(line => line.includes("run-"))
            .map(line => line.split(" ").pop());

        if (folders.length === 0) {
            return res.json([]);
        }

        console.log("📁 Detected processed runs:", folders);

        let combinedData = [];
        let pending = folders.length;

        // STEP 2 — Read part-r-00000 inside each run folder
        folders.forEach(folder => {
            const filePath = `${folder}/part-r-00000`;

            exec(`hdfs dfs -cat ${filePath}`, (err2, fileData) => {
                if (!err2) {
                    const lines = fileData.trim().split("\n");

                    lines.forEach(line => {
                        const [timestamp, record] = line.split("\t");
                        const [item, qty, price, total] = record.split(",");

                        combinedData.push({
                            timestamp,
                            item,
                            qty: Number(qty),
                            price: Number(price),
                            total: Number(total)
                        });
                    });
                }

                pending--;
                if (pending === 0) {
                    console.log("📤 Sending final JSON to frontend...");
                    res.json(combinedData);
                }
            });
        });
    });
};

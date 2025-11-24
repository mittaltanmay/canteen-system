const { exec } = require("child_process");

exports.getProcessedSales = (req, res) => {

  exec(`hdfs dfs -ls /salesprocessed`, (err, stdout, stderr) => {

    // Windows often sends harmless warnings to stderr → so ignore stderr completely
    if (!stdout || stdout.trim() === "") {
      console.error("❌ HDFS returned no output");
      return res.json([]);
    }

    let folders = stdout
      .split("\n")
      .map(l => l.trim())
      .filter(l => l.includes("run-"))
      .map(l => l.split(/\s+/).pop().replace(/\r/g, ""))
      .filter(Boolean);

    if (folders.length === 0) {
      console.log("⚠ No run folders found");
      return res.json([]);
    }

    // Use only last 5 runs
    folders = folders.slice(-5);

    let allData = [];
    let pending = folders.length;

    folders.forEach(folder => {
      const filePath = `${folder}/part-r-00000`;

      exec(`hdfs dfs -cat ${filePath}`, (err2, fileData, stderr2) => {

        // again: ignore stderr, only check stdout
        if (fileData && fileData.trim()) {
          fileData
            .trim()
            .split("\n")
            .forEach(line => {
              if (!line || line.includes("_COPYING_")) return;

              const [timestamp, record] = line.split("\t");
              if (!timestamp || !record) return;

              const [item, qty, price, total] = record.split(",");

              allData.push({
                timestamp: timestamp.trim(),
                item: item.trim(),
                qty: Number(qty),
                price: Number(price),
                total: Number(total)
              });
            });
        }

        pending--;
        if (pending === 0) {
          allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          return res.json(allData);
        }
      });
    });
  });
};

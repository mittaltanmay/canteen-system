const { exec } = require("child_process");

exports.getProcessedSales = (req, res) => {
  exec(`hdfs dfs -ls /salesprocessed`, (err, stdout) => {
    if (err) return res.json([]);

    const folders = stdout
      .split("\n")
      .filter(line => line.includes("run-"))
      .map(line => line.split(" ").pop());

    if (folders.length === 0) return res.json([]);

    let allData = [];
    let pending = folders.length;

    folders.forEach(folder => {
      exec(`hdfs dfs -cat ${folder}/part-r-00000`, (err2, fileData) => {
        if (!err2 && fileData.trim() !== "") {

          fileData
            .trim()
            .split("\n")
            .forEach(line => {
              const [timestamp, record] = line.split("\t");
              const [item, qty, price, total] = record.split(",");

              allData.push({
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
          allData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          res.json(allData);
        }
      });
    });
  });
};

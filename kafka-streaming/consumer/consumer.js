const kafka = require("kafka-node");
const fs = require("fs");
const { exec } = require("child_process");

const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(
  client,
  [{ topic: "canteen-sales", partition: 0 }],
  { autoCommit: true }
);

const CSV_FILE = "sales_batch.csv";

console.log("📡 Kafka Consumer Started...");

// Ensure CSV file exists with a header
if (!fs.existsSync(CSV_FILE)) {
  fs.writeFileSync(CSV_FILE, "timestamp,item,qty,price,total\n");
}

// When a message is received
consumer.on("message", msg => {
  const data = JSON.parse(msg.value);
  console.log("📥 Received:", data);

  const row = `${data.timestamp},${data.item},${data.qty},${data.price},${data.total}\n`;
  fs.appendFileSync(CSV_FILE, row);
});

// Error handling
consumer.on("error", err => console.error("❌ Kafka Error:", err));


// ----------------------------------------------
//  ⬆ Every 60 seconds: Upload CSV to HDFS
// ----------------------------------------------
setInterval(() => {
  if (!fs.existsSync(CSV_FILE)) return;

  console.log("⬆ Uploading batch to HDFS...");

  const cmd =
    `hdfs dfs -put -f ${CSV_FILE} /salesraw/sales_${Date.now()}.csv`;

  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ HDFS Upload Error:", err);
      return;
    }

    console.log("✅ Uploaded to HDFS:", stdout);

    // Clear file after upload
    fs.writeFileSync(CSV_FILE, "timestamp,item,qty,price,total\n");
    console.log("🧹 Local CSV reset for next batch.");
  });
}, 60000);

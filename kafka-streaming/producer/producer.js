const kafka = require("kafka-node");
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(client);

producer.on("ready", () => {
    console.log("🚀 Kafka Producer is ready");

    setInterval(() => {
        const items = [
            { name: "Samosa", price: 15 },
            { name: "Tea", price: 10 },
            { name: "Vada Pav", price: 20 },
            { name: "Pasta", price: 50 }
        ];

        const item = items[Math.floor(Math.random() * items.length)];
        const qty = Math.ceil(Math.random() * 3);
        const total = item.price * qty;

        const saleEvent = {
            item: item.name,
            qty: qty,
            price: item.price,
            total: total,
            timestamp: new Date().toISOString()
        };

        const payloads = [
            {
                topic: "canteen-sales",
                messages: JSON.stringify(saleEvent)
            }
        ];

        producer.send(payloads, (err, data) => {
            if (err) console.error("❌ Error sending message", err);
            else console.log("✔ Sent:", saleEvent);
        });

    }, 3000); // every 3 seconds
});

producer.on("error", err => {
    console.log("Producer Error:", err);
});

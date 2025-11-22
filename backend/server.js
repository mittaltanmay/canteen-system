const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => res.send("Smart Canteen API Running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

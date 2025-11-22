const express = require("express");
const cors = require("cors");
const salesRoutes = require("./routes/salesRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);

app.get("/", (req, res) => {
  res.send("Smart Canteen API running");
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});

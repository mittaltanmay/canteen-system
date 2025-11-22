const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

// Route to fetch all processed sales from HDFS
router.get("/processed", salesController.getProcessedSales);

module.exports = router;

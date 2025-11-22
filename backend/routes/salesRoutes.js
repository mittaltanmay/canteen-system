const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

router.get("/processed", salesController.getProcessedSales);

module.exports = router;

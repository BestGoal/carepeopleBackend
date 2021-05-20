const express = require('express');
const router = express.Router();
const apiController = require("../controller/apiController");

router.post("/getAssets", apiController.getAssets);
router.post("/getAssetsWithTrade", apiController.getAssetsWithTrade);
router.post("/getAssetsWithChart", apiController.getAssetsWithChart);
router.post("/exchangeCard", apiController.exchangeCard);

module.exports = router;
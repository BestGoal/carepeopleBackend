const express = require('express');
const router = express.Router();
const apiRouter = require("./apiRouter");

router.use("/api", apiRouter);

module.exports = router;
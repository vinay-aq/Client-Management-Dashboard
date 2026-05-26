const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../auth/auth.middleware");
const dashboardController = require("./dashboard.controller");

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);

module.exports = router;

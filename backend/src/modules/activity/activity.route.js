const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../auth/auth.middleware");
const {
  getActivity,
  fetchActivitiesByEntity,
} = require("./activity.controller");

router.get("/", authMiddleware, getActivity);
router.get("/:entityType/:entityId", authMiddleware, fetchActivitiesByEntity);

module.exports = router;

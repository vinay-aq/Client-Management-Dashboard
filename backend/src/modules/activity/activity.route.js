import express from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import {
  getActivity,
  fetchActivitiesByEntity,
} from "./activity.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getActivity);
router.get("/:entityType/:entityId", authMiddleware, fetchActivitiesByEntity);

export default router;

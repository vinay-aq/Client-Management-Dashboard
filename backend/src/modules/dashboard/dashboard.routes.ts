import express from "express";
import { authMiddleware } from "../auth/auth.middleware.js";
import * as dashboardController from "./dashboard.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);

export default router;

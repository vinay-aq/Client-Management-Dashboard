import type { Request, Response, NextFunction } from "express";
import { fetchDashboardStats } from "./dashboard.service.js";

export async function getDashboardStats(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { clientStatusCounts, recentClients } = await fetchDashboardStats();
    res
      .status(200)
      .json({ success: true, dashboardStats: clientStatusCounts, recentClients });
  } catch (err) {
    next(err);
  }
}

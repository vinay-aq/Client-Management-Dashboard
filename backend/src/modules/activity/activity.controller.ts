import type { Request, Response, NextFunction } from "express";
import {
  fetchActivityService,
  fetchActivityByEntityService,
} from "./activity.service.js";

export async function getActivity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const activities = await fetchActivityService();
    res.status(200).json({ success: true, activities });
  } catch (err) {
    next(err);
  }
}

export async function fetchActivitiesByEntity(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const entityType = req.params.entityType as string;
  const entityId = req.params.entityId as string;

  try {
    const activities = await fetchActivityByEntityService({
      entityType,
      entityId,
    });
    res.status(200).json({ success: true, activities });
  } catch (err) {
    next(err);
  }
}

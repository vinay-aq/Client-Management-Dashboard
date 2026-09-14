import type { Request, Response, NextFunction } from "express";
import {
  fetchActivityService,
  fetchActivityByEntityService,
} from "./activity.service.ts";

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
  const entityType = req.params.entityType;
  const entityId = req.params.entityId;

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

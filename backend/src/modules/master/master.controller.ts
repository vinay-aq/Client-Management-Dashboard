import type { Request, Response, NextFunction } from "express";
import {
  fetchMasterService,
  createMasterService,
  updateMasterService,
  deleteMasterService,
} from "./master.service.js";

export async function getMasters(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const type = String(req.query.type);

  try {
    const masters = await fetchMasterService(type);
    res.status(200).json({ success: true, masters, type });
  } catch (err) {
    next(err);
  }
}

export async function createMaster(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const master = await createMasterService(req.body);
    res.status(201).json({ success: true, message: "Master created", master });
  } catch (err) {
    next(err);
  }
}

export async function updateMaster(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id: masterId } = req.params;
  const { master } = req.body;

  try {
    const updatedMaster = await updateMasterService(String(masterId), master);
    res.status(200).json({
      success: true,
      message: "Master updated successfuly",
      updatedMaster,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteMaster(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const masterId = req.params.id;
  const masterType = String(req.query.type);
  try {
    await deleteMasterService(String(masterId), masterType);
    res.status(200).json({
      success: true,
      message: "Master deleted successfuly",
      id: masterId,
    });
  } catch (err) {
    next(err);
  }
}

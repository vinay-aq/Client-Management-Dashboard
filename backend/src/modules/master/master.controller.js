import {
  fetchMasterService,
  createMasterService,
  updateMasterService,
  deleteMasterService,
} from "./master.service.ts";

export async function getMasters(req, res, next) {
  const { type } = req.query;
  try {
    const masters = await fetchMasterService(type);
    res.status(200).json({ success: true, masters, type });
  } catch (err) {
    next(err);
  }
}

export async function createMaster(req, res, next) {
  try {
    const master = await createMasterService(req.body);
    res.status(201).json({ success: true, message: "Master created", master });
  } catch (err) {
    next(err);
  }
}

export async function updateMaster(req, res, next) {
  const { id: masterId } = req.params;
  const { master } = req.body;

  try {
    const updatedMaster = await updateMasterService(masterId, master);
    res.status(200).json({
      success: true,
      message: "Master updated successfuly",
      updatedMaster,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteMaster(req, res, next) {
  const { id: masterId } = req.params;
  const { type: masterType } = req.query;
  try {
    await deleteMasterService(masterId, masterType);
    res.status(200).json({
      success: true,
      message: "Master deleted successfuly",
      id: masterId,
    });
  } catch (err) {
    next(err);
  }
}

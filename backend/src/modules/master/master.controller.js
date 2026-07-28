const {
  fetchMasterService,
  createMasterService,
  updateMasterService,
  deleteMasterService,
} = require("./master.service");

async function getMasters(req, res, next) {
  const { type } = req.query;
  try {
    const masters = await fetchMasterService(type);
    res.status(201).json({ success: true, masters });
  } catch (err) {
    next(err);
  }
}

async function createMaster(req, res, next) {
  try {
    const master = await createMasterService(req.body);
    res.status(201).json({ success: true, message: "Master created", master });
  } catch (err) {
    next(err);
  }
}

async function updateMaster(req, res, next) {
  const { id: masterId } = req.params;
  const { master } = req.body;

  try {
    const updatedMaster = await updateMasterService(masterId, master);
    res
      .status(200)
      .json({ success: true, message: "Master updated successfuly", updatedMaster });
  } catch (err) {
    next(err);
  }
}

async function deleteMaster(req, res, next) {
  const { id: masterId } = req.params;
  try {
    await deleteMasterService(masterId);
    res
      .status(200)
      .json({
        success: true,
        message: "Master deleted successfuly",
        id: masterId,
      });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getMasters,
  createMaster,
  updateMaster,
  deleteMaster,
};

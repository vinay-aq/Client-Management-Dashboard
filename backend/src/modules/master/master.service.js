const AppError = require("../../utils/AppError");
const masterModel = require("./master.model");
const { masterTypes } = require("../../constants/masterTypes");
const mongoose = require("mongoose");

async function fetchMasterService(type) {
  if (!type) {
    throw new AppError("master type is required");
  }

  const validMasterType = masterTypes.includes(type);
  if (!validMasterType) {
    throw new AppError("Invalid master type");
  }

  const masters = await masterModel.find({ type });
  return masters;
}

async function createMasterService({ master }) {
  if (!master) {
    throw new AppError("Please provide master details");
  }

  if (!master?.type) {
    throw new AppError("Master type is required");
  }

  if (!master.value) {
    throw new AppError("Master value is required");
  }

  const duplicateMaster = await masterModel.findOne({
    type: master?.type,
    value: master?.value,
  });

  if (duplicateMaster) {
    throw new AppError("Master already exist", 400);
  }

  return await masterModel.create({ ...master, isActive: true });
}

async function updateMasterService(masterId, masterData) {
  const isIdValid = mongoose.Types.ObjectId.isValid(masterId);
  if (!isIdValid) {
    throw new AppError("Invalid id");
  }

  if (!masterData) {
    throw new AppError("Please provide master details");
  }

  if (!masterData?.type) {
    throw new AppError("Master type is required");
  }

  if (!masterData.value) {
    throw new AppError("Master value is required");
  }

  const updatedDoc = await masterModel.findByIdAndUpdate(
    masterId,
    { $set: masterData },
    { new: true },
  );
  return updatedDoc;
}

async function deleteMasterService(masterId) {
  const isIdValid = mongoose.Types.ObjectId.isValid(masterId);
  if (!isIdValid) {
    throw new AppError("Invalid id");
  }

  await masterModel.deleteOne({ _id: masterId });
}

module.exports = {
  fetchMasterService,
  createMasterService,
  updateMasterService,
  deleteMasterService,
};

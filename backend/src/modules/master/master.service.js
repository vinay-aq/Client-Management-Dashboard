const AppError = require("../../utils/AppError")
const masterModel = require("./master.model");
const masterTypes = require("../../constants/masterTypes");
const mongoose = require("mongoose");

async function fetchMasterService(type) {
    if (!type) {
        throw new AppError("master type is required")
    }

    const validMasterType = masterTypes.includes(type);
    if (!validMasterType) {
        throw new AppError("Invalid master type")
    }

    const masters = await masterModel.find({ type });
    return masters;

}

async function createMasterService(master) {
    if (!master) {
        throw new AppError("Please provide master details")
    }

    if (!master?.type) {
        throw new AppError("Master type is required")
    }

    if (!master.value) {
        throw new AppError("Master value is required")
    }


    return await masterModel.create(master);

}

async function updateMasterService(masterId) {
    const isIdValid = mongoose.Types.ObjectId.isValid(masterId);
    if (!isIdValid) {
        throw new AppError("Invalid id")
    }

    await masterModel.findById(masterId).updateOne()

}

async function deleteMasterService(masterId) {
    const isIdValid = mongoose.Types.ObjectId.isValid(masterId);
    if (!isIdValid) {
        throw new AppError("Invalid id")
    }

    await masterModel.deleteOne({ _id: masterId })
}


module.exports = {
    fetchMasterService,
    createMasterService,
    updateMasterService,
    deleteMasterService
}
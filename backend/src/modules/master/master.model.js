const mongoose = require("mongoose");
const { MASTER_TYPES } = require("../../constants/master");
const masterSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, index: true },
        value: { type: String, required: true, trim: true },
        description: { type: String, default: "", trim: true },
        isActive: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    },
);

const masterModel = mongoose.model("master", masterSchema);

module.exports = masterModel;
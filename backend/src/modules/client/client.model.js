const mongoose = require("mongoose");
const {CLIENT_STATUS} = require("../../constants/clientStatus")
const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    company: { type: String },
    status: {
      type: String,
      enum: Object.values(CLIENT_STATUS),
      default: CLIENT_STATUS.LEAD,
    },
    avatar: { type: String },
  },
  {
    timestamps: true,
  },
);

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;

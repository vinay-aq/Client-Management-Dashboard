const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    company: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "pending","suspended"], // Restricts input to specific values
      default: "pending",
    },
    avatar: {type: String},
  },
  {
    timestamps: true,
  },
);

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;

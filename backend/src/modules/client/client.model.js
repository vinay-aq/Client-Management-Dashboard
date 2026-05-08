const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true },
  status: {
    type: String,
    enum: ["active", "inactive", "pending"], // Restricts input to specific values
    default: "pending",
  }
  
}, {
    timestamps: true,
});

const clientModel = mongoose.model("client", clientSchema);

module.exports = clientModel;

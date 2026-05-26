const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password:{type: String, required: true},
    name:{type: String, required: true},
    role:{
      type:  String,
      enum: ["admin", "manager", "viewer"],
      default: "viewer"
    },
    isActive: {
      type: Boolean,
      default: true
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
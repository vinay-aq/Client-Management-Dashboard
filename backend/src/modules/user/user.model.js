const mongoose = require('mongoose');
const {ROLE_VALUES} = require("../../constants/roles")
const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password:{type: String, required: true},
    name:{type: String, required: true},
    role:{
      type:  String,
      enum: ROLE_VALUES,
      default: "viewer"
    },
    isActive: {
      type: Boolean,
      default: true
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
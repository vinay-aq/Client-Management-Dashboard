const mongoose = require('mongoose');

const activityModelSchema = new mongoose.Schema({
    message: {type: String, required: true},
}, {timestamps: true})

const activityModel = mongoose.model("Activities", activityModelSchema);

module.exports = activityModel;
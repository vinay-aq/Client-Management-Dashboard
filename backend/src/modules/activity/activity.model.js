const mongoose = require("mongoose");

const activityModelSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    entityType: {
      type: String,
      default: null,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    action: {
      type: String,
      default: null,
    },
    actorId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },
    actorName: {
        type: String, 
        default: null,
    },
    oldValue: {
      type: Object,
      default: {},
    },
    newValue: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

const activityModel = mongoose.model("Activities", activityModelSchema);

module.exports = activityModel;

const activityModel = require("./activity.model");
const { getIO } = require("../../socket/socket");

async function createActivityService({
  message,
  entityType = null,
  entityId = null,
  action = null,
  actorId = null,
  actorName = null,
  oldValue = {},
  newValue = {},
}) {
  const activity = await activityModel.create({
    message,
    entityType,
    entityId,
    action,
    actorId,
    actorName,
    oldValue,
    newValue,
  });
  const io = getIO();
  io.emit("new_activity", activity);
  return activity;
}

async function fetchActivityService() {
  const activities = await activityModel
    .find()
    .sort({ createdAt: -1 })
    .limit(20);
  return activities;
}

module.exports = {
  fetchActivityService,
  createActivityService,
};

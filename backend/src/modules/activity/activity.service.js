const prisma = require("../../db/prisma");
const { getIO } = require("../../socket/socket");

async function createActivityService({
  message,
  entityType = null,
  entityId = null,
  userId = null,
  oldValue = {},
  newValue = {},
}) {
  const activity = await prisma.activity.create({
    message,
    entityType,
    entityId,
    userId,
    oldValue,
    newValue,
  });
  const io = getIO();
  io.emit("new_activity", activity);
  return activity;
}

async function fetchActivityService() {
  const activities = await prisma.activity.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  return activities;
}

async function fetchActivityByEntityService({ entityType, entityId }) {
  const activities = await prisma.activity.findMany({
    where: { entityType, entityId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return activities;
}

module.exports = {
  fetchActivityService,
  createActivityService,
  fetchActivityByEntityService,
};

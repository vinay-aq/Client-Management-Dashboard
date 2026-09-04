const prisma = require("../../db/prisma");
const { getIO } = require("../../socket/socket");

async function createActivityService({
  message,
  entityType,
  entityId = null,
  actorId = null,
  oldValue = {},
  newValue = {},
}) {
  console.log(message, entityType, entityId, (oldValue = {}), newValue);
  const activity = await prisma.activity.create({
    data: {
      message,
      entityType,
      entityId,
      actorId,
      oldValue,
      newValue,
    },
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

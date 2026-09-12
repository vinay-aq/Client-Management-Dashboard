const prisma = require("../../db/prisma");
const { getIO } = require("../../socket/socket");
import  type { ActivityEntityType } from "../../generated/prisma";
import type { Prisma } from "../../generated/prisma";


type activiyServiceData = {
  message: string,
  entityType: ActivityEntityType,
  entityId: string | number,
  actorId: string | number,
  oldValue? : Prisma.InputJsonValue | null,
  newValue? : Prisma.InputJsonValue | null,
}
async function createActivityService({
  message,
  entityType,
  entityId,
  actorId,
  oldValue = null,
  newValue = null,
}: activiyServiceData) {
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

async function fetchActivityByEntityService({ entityType, entityId}: {
  entityType: string, entityId: number | string
}) {
  const activities = await prisma.activity.findMany({
    where: { entityType, entityId: Number(entityId) },
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

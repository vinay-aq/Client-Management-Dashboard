import prisma from "../../db/prisma.js";
import { getIO } from "../../socket/socket.js";
import type { ActivityEntityType, Prisma } from "../../generated/prisma/client.js";


type activiyServiceData = {
  message: string,
  entityType: ActivityEntityType,
  entityId:  number | undefined,
  actorId: number,
  oldValue? : Prisma.InputJsonValue | undefined,
  newValue? : Prisma.InputJsonValue | undefined,
}
async function createActivityService({
  message,
  entityType,
  entityId,
  actorId,
  oldValue ,
  newValue ,
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

export {
  fetchActivityService,
  createActivityService,
  fetchActivityByEntityService,
};

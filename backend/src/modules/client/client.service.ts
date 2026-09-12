const AppError = require("../../utils/AppError");
const { createActivityService } = require("../activity/activity.service.ts");
const { notifyDashboardDataChanged } = require("../dashboard/dashboard.events");
const { isValidClientTransition } = require("../client/client.utils");
const prisma = require("../../db/prisma");
const { ActivityEntityType } = require("../../generated/prisma");
import type { Prisma } from "../../generated/prisma";

type User = {
  id: number | string;
  email: string;
  name: string;
};

type CreateClientData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar?: string | null;
  user: User;
  clientTypeId: string | number;
  industryId: string | number;
};

type UpdateClientType = {
  name: string | number;
  email: string;
  phone: string;
  company: string;
  status_id: string;
  type_id: string;
  industry_id: string;
  avatar?: string | null;
  user: User;
};

async function fetchClients(page: number, limit: number, search?: string) {
  let skip = limit * (page - 1);

  let where: Prisma.ClientWhereInput = {};

  if (search) {
    where = {
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    };
  }

  let [clients, totalCount] = await Promise.all([
    prisma.client.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        company: true,
        createdAt: true,

        clientType: {
          select: {
            name: true,
          },
        },
        clientStatus: {
          select: {
            name: true,
          },
        },
        industry: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: limit,
    }),
    prisma.client.count({
      where,
    }),
  ]);

  return {
    page,
    limit,
    skip,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    clients,
  };
}

async function fetchClientsById(id: string) {
  let clientData = await prisma.client.findUnique({
    where: { id: Number(id) },
    include: {
      clientStatus: true,
      clientType: true,
      industry: true,
    },
  });
  if (!clientData) {
    throw new AppError("Client not found", 404);
  }
  return clientData;
}

async function createClientService(data: CreateClientData) {
  const {
    name,
    email,
    phone,
    company,
    avatar,
    user,
    clientTypeId,
    industryId,
  } = data;
  if (!name || !company || !phone || !email) {
    throw new AppError("One or more fields are missing", 404);
  }
  const existingClient = await prisma.client.findUnique({
    where: { email: email },
  });

  if (existingClient) {
    throw new AppError("Email already in use", 409);
  }

  const newClient = await prisma.client.create({
    data: {
      name,
      email,
      phone,
      company,
      avatar,
      clientStatusId: 17,
      industryId: Number(industryId),
      clientTypeId: Number(clientTypeId),
    },
  });

  await createActivityService({
    message: `User ${user.name} created client ${newClient.name}`,
    entityType: "client",
    entityId: newClient.id,
    action: "client_created",
    actorId: user.id,
    actorName: user.name,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return newClient;
}

async function updateClientService(
  id: number | string,
  data: UpdateClientType,
) {
  const {
    name,
    email,
    phone,
    company,
    status_id,
    type_id,
    industry_id,
    avatar,
    user,
  } = data;

  if (!id) {
    throw new AppError("Id is missing", 400);
  }

  if (
    !name ||
    !company ||
    !phone ||
    !email ||
    !status_id ||
    !type_id ||
    !industry_id
  ) {
    throw new AppError("One or more fields are missing", 400);
  }

  const client = await prisma.client.findUnique({ where: { id: id } });

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const updatedClient = await prisma.client.update({
    where: { id: id },
    data: { name, email, phone, company, status_id, avatar },
  });

  await createActivityService({
    message: `Client ${client.name} is updated to ${updatedClient.name}`,
    entityType: ActivityEntityType.client,
    entityId: id,
    actorId: user.id,
    oldValue: {
      name: client.name,
    },
    newValue: {
      name: updatedClient.name,
    },
  });

  notifyDashboardDataChanged();
  return updatedClient;
}

async function deleteClientService(id: string | number, user: User) {
  if (!id) {
    throw new AppError("Id is missing", 400);
  }

  id = Number(id);

  const client = await prisma.client.findUnique({ where: { id: id } });

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const deletedClient = await prisma.client.delete({ where: { id: id } });

  await createActivityService({
    message: `Client ${client.name} is deleted`,
    entityType: ActivityEntityType.client,
    entityId: client.id,
    actorId: user.id,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return deletedClient;
}

type UpdateWorkflowData = {
  clientId: number | string;
  nextStatusId: number | string;
  user: User;
};

async function updateClientWorkflowService({
  clientId,
  nextStatusId,
  user,
}: UpdateWorkflowData) {
  if (!nextStatusId) {
    throw new AppError("Status id for next status does not exist", 404);
  }

  clientId = Number(clientId);

  const client = await prisma.client.findUnique({
    where: { id: clientId },
    include: {
      clientStatus: true,
    },
  });

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const clientStatus = client.clientStatus;

  console.log("nextStatusId", nextStatusId);

  const nextStatus = await prisma.clientStatus.findUnique({
    where: { id: nextStatusId },
  });

  const isValidTransition = isValidClientTransition(
    clientStatus.code,
    nextStatus.code,
  );

  if (!isValidTransition) {
    throw new AppError(
      `Invalid client transition ${client.clientStatus.name} to ${nextStatus.name}`,
      403,
    );
  }

  const updatedClient = await prisma.client.update({
    where: {
      id: clientId,
    },
    data: { clientStatusId: nextStatusId },
  });

  await createActivityService({
    message: `User ${user.name} updated Client ${client.name} status: ${clientStatus.name} -> ${nextStatus.name}`,
    entityType: ActivityEntityType.client,
    entityId: client.id,
    actorId: user.id,
    oldValue: {
      status: client.clientStatus.name,
    },
    newValue: {
      status: nextStatus.name,
    },
  });

  return updatedClient;
}

module.exports = {
  fetchClients,
  fetchClientsById,
  createClientService,
  updateClientService,
  deleteClientService,
  updateClientWorkflowService,
};

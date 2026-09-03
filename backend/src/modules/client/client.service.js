const AppError = require("../../utils/AppError");
const { createActivityService } = require("../activity/activity.service");
const { notifyDashboardDataChanged } = require("../dashboard/dashboard.events");
const { isValidClientTransition } = require("../client/client.utils");
const prisma = require("../../db/prisma");
const { ActivityEntityType } = require("../../generated/prisma");

// async function testAbortController(search) {
//   let delay = 1000;

//   if (search.length === 1) {
//     delay = 4000;
//   }

//   if (search.length === 2) {
//     delay = 2000;
//   }

//   if (search.length >= 3) {
//     delay = 500;
//   }

//   await new Promise((resolve) => setTimeout(resolve, delay));
// }

async function fetchClients(page, limit, search) {
  // await testAbortController(search);
  let skip = limit * (page - 1);

  let where = {};

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
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      },

      ClientType: {
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

async function fetchClientsById(id) {
  let clientData = await prisma.client.findUnique({
    where: { id: id },
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

async function createClientService(data) {
  const { name, email, phone, company, status, avatar, user } = data;
  if (!name || !company || !phone || !email || !status) {
    throw new AppError("One or more fields are missing", 404);
  }
  const existingClient = await prisma.client.findUnique({
    where: { email: email },
  });
  if (existingClient.length) {
    throw new AppError("Email already in use", 409);
  }

  const newClient = await prisma.client.create({
    data: {
      name,
      email,
      phone,
      company,
      status,
      avatar,
    },
  });

  await createActivityService({
    message: `Client ${newClient.name} is created`,
    entityType: "client",
    entityId: newClient._id,
    action: "client_created",
    actorId: user.id,
    actorName: user.name,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return newClient;
}

async function updateClientService(id, data) {
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
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return updatedClient;
}

async function deleteClientService(id, user) {
  if (!id) {
    throw new AppError("Id is missing", 400);
  }

  const client = await prisma.client.findUnique({ where: { id: id } });

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const deletedClient = await prisma.client.delete({ where: { id: id } });

  await createActivityService({
    message: `Client ${client.name} is deleted`,
    entityType: prisma.activity.clien,
    entityId: client.id,
    actorId: user.id,
    actorName: user.name,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return deletedClient;
}

async function updateClientWorkflowService({ clientId, nextStatusId, user }) {
  if (!nextStatusId) {
    throw new AppError("Status id for next status does not exist", 404);
  }

  const client = await prisma.client.findUnique({
    where: { id: clientId },
  });

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const clientStatus = client.clientStatus;

  const nextStatus = prisma.client.findUnique({
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
    data: { client_status_id: nextStatusId },
  });

  await createActivityService({
    message: `Client ${client.clientStatus.name} status updated to ${nextStatus.name}`,
    entityType: ActivityEntityType.client,
    entityId: client._id,
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

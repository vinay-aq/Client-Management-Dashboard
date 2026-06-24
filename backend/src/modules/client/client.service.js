const clientModel = require("./client.model");
const AppError = require("../../utils/AppError");
const mongoose = require("mongoose");
const { createActivityService } = require("../activity/activity.service");
const { notifyDashboardDataChanged } = require("../dashboard/dashboard.events");
const { isValidClientTransition } = require("../client/client.utils");

async function testAbortController(search) {
  let delay = 1000;

  if (search.length === 1) {
    delay = 4000;
  }

  if (search.length === 2) {
    delay = 2000;
  }

  if (search.length >= 3) {
    delay = 500;
  }

  await new Promise((resolve) => setTimeout(resolve, delay));
}
async function fetchClients(page, limit, search) {
  // await testAbortController(search);

  let query = {};

  if (search) {
    query = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ],
    };
  }

  let skip = limit * (page - 1);

  let [clients, totalCount] = await Promise.all([
    clientModel
      .find(query)
      .select("_id name email phone company status createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    clientModel.countDocuments(query),
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
  let clientData = await clientModel.findById(id).lean();
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
  const existingClient = await clientModel.find({ email });
  if (existingClient.length) {
    throw new AppError("Email already in use", 409);
  }

  const newClient = await clientModel.create({
    name,
    email,
    phone,
    company,
    status,
    avatar,
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
  return newClient.toObject();
}

async function updateClientService(id, data) {
  const { name, email, phone, company, status, avatar, user } = data;
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new AppError("Id is invalid", 400);
  }

  if (!id) {
    throw new AppError("Id is missing", 400);
  }

  if (!name || !company || !phone || !email || !status) {
    throw new AppError("One or more fields are missing", 400);
  }

  const client = await clientModel.findById(id);

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const duplicateClient = await clientModel.findOne({
    email: email,
    _id: { $ne: id },
  });
  if (duplicateClient) {
    throw new AppError("Email already exist", 400);
  }

  const updatedClient = await clientModel.findByIdAndUpdate(
    id,
    { name, email, phone, company, status, avatar },
    { new: true },
  );

  await createActivityService({
    message: `Client ${newClient.name} is updated`,
    entityType: "client",
    entityId: newClient._id,
    action: "client_updated",
    actorId: user.id,
    actorName: user.name,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return updatedClient.toObject();
}

async function deleteClientService(id) {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new AppError("Id is invalid", 400);
  }

  if (!id) {
    throw new AppError("Id is missing", 400);
  }

  const client = await clientModel.findById(id);

  if (!client) {
    throw new AppError("Client does not exist", 404);
  }

  const deletedClient = await clientModel.findByIdAndDelete(id);
  await createActivityService({
    message: `Client ${newClient.name} is deleted`,
    entityType: "client",
    entityId: newClient._id,
    action: "client_deleted",
    actorId: user.id,
    actorName: user.name,
    oldValue: null,
    newValue: null,
  });

  notifyDashboardDataChanged();
  return;
}

async function updateClientWorkflowService({ clientId, nextStatus, user }) {
  const client = await clientModel.findById(clientId);
  if (!client) {
    throw new AppError("Client does not exist", 404);
  }
  const currentStatus = client.status;

  const isValidTransition = isValidClientTransition(currentStatus, nextStatus);
  if (!isValidTransition) {
    throw new AppError(
      `Invalid client transition ${currentStatus} to ${nextStatus}`,
      403,
    );
  }

  const updatedClient = await clientModel.findByIdAndUpdate(
    clientId,
    { status: nextStatus },
    { new: true },
  );

  await createActivityService({
    message: `Client ${client.name} is status updated to ${nextStatus}`,
    entityType: "client",
    entityId: client._id,
    action: "status_updated",
    actorId: user.id,
    actorName: user.name,
    oldValue: {
      status: currentStatus,
    },
    newValue: {
      status: nextStatus,
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

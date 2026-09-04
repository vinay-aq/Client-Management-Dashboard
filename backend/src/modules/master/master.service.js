const AppError = require("../../utils/AppError");
const masterModel = require("./master.model");
const { masterTypes, MASTER_TYPES } = require("../../constants/masterTypes");
const prisma = require("../../db/prisma");

async function fetchMasterService(type) {
  if (!type) {
    throw new AppError("master type is required");
  }

  const validMasterType = masterTypes.includes(type);
  if (!validMasterType) {
    throw new AppError("Invalid master type");
  }

  let masters;

  switch (type) {
    case MASTER_TYPES.USER_ROLE:
      masters = await fetchUserRoles();
      break;
    case MASTER_TYPES.CLIENT_TYPE:
      masters = await fetchClientTypes();
      break;
    case MASTER_TYPES.CLIENT_STATUS:
      masters = await fetchClientStatuses();
      break;
    case MASTER_TYPES.CLIENT_INDUSTRY:
      masters = await fetchClientIndustries();
      break;

    default:
      throw new AppError("Invalid master type", 400);
  }

  return masters;
}

async function fetchUserRoles() {
  return await prisma.userRole.findMany();
}

async function fetchClientTypes() {
  return await prisma.clientType.findMany();
}

async function fetchClientStatuses() {
  return await prisma.clientStatus.findMany();
}

async function fetchClientIndustries() {
  return await prisma.industry.findMany();
}

async function createMasterService({ master }) {
  validateMasterData(master);
  let createdMaster;
  switch (master?.type) {
    case MASTER_TYPES.USER_ROLE:
      createdMaster = await createUserRole(master);
      break;
    case MASTER_TYPES.CLIENT_TYPE:
      createdMaster = await createClientTypes(master);
      break;
    case MASTER_TYPES.CLIENT_STATUS:
      createdMaster = await createClientStatuses(master);
      break;
    case MASTER_TYPES.CLIENT_INDUSTRY:
      createdMaster = await createClientIndustries(master);
      break;

    default:
      throw new AppError("Invalid master type", 400);
  }

  return createdMaster;
}

async function createUserRole(master) {
  const duplicateMaster = await prisma.userRole.findFirst({
    where: {
      name: master?.name,
    },
  });
  if (duplicateMaster) {
    throw new AppError("Master already exist", 400);
  }

  return await prisma.userRole.create({
    data: {
      name: master?.name,
      description: master?.description,
      isActive: true,
    },
  });
}

async function createClientTypes(master) {
  const duplicateMaster = await prisma.clientType.findFirst({
    where: {
      name: master?.name,
    },
  });
  if (duplicateMaster) {
    throw new AppError("Master already exist", 400);
  }

  return await prisma.clientType.create({
    data: {
      name: master?.name,
      description: master?.description,
      isActive: true,
    },
  });
}

async function createClientStatuses(master) {
  const duplicateMaster = await prisma.clientStatus.findFirst({
    where: {
      name: master?.name,
    },
  });
  if (duplicateMaster) {
    throw new AppError("Master already exist", 400);
  }

  return await prisma.clientStatus.create({
    data: {
      name: master?.name,
      description: master?.description,
      isActive: true,
    },
  });
}

async function createClientIndustries(master) {
  const duplicateMaster = await prisma.industry.findFirst({
    where: {
      name: master?.name,
    },
  });
  if (duplicateMaster) {
    throw new AppError("Master already exist", 400);
  }

  return await prisma.industry.create({
    data: {
      name: master?.name,
      description: master?.description,
      isActive: true,
    },
  });
}

function validateMasterData(master) {
  if (!master) {
    throw new AppError("Please provide master details");
  }

  if (!master.type) {
    throw new AppError("Master type is required");
  }

  if (!master.name) {
    throw new AppError("Master name is required");
  }
}

async function updateMasterService(masterId, master) {
  validateMasterData(master);
  let updatedMaster;
  switch (master?.type) {
    case MASTER_TYPES.USER_ROLE:
      updatedMaster = await updateUserRole(masterId, master);
      break;
    case MASTER_TYPES.CLIENT_TYPE:
      updatedMaster = await updateClientTypes(masterId, master);
      break;
    case MASTER_TYPES.CLIENT_STATUS:
      updatedMaster = await updateClientStatuses(masterId, master);
      break;
    case MASTER_TYPES.CLIENT_INDUSTRY:
      updatedMaster = await updateClientIndustries(masterId, master);
      break;

    default:
      throw new AppError("Invalid master type", 400);
  }

  return updatedMaster;
}

async function updateUserRole(masterId, master) {
  const existingMaster = await prisma.userRole.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.userRole.update({
    where: { id: masterId },
    data: { ...master },
  });
}
async function updateClientTypes(masterId, master) {
  const existingMaster = await prisma.clientType.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.userRole.update({
    where: { id: masterId },
    data: { ...master },
  });
}
async function updateClientStatuses(masterId, master) {
  const existingMaster = await prisma.clientStatus.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.userRole.update({
    where: { id: masterId },
    data: { ...master },
  });
}
async function updateClientIndustries(masterId, master) {
  const existingMaster = await prisma.industry.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.userRole.update({
    where: { id: masterId },
    data: { ...master },
  });
}

async function deleteMasterService(masterId, masterType) {
  let deletedMaster;
  switch (masterType) {
    case MASTER_TYPES.USER_ROLE:
      deletedMaster = await deleteUserRole(masterId, deletedMaster);
      break;
    case MASTER_TYPES.CLIENT_TYPE:
      deletedMaster = await deleteClientTypes(masterId, deletedMaster);
      break;
    case MASTER_TYPES.CLIENT_STATUS:
      deletedMaster = await deleteClientStatuses(masterId, deletedMaster);
      break;
    case MASTER_TYPES.CLIENT_INDUSTRY:
      deletedMaster = await deleteClientIndustries(masterId, deletedMaster);
      break;

    default:
      throw new AppError("Invalid master type", 400);
  }

  await masterModel.deleteOne({ _id: masterId });

  return deletedMaster;
}

async function deleteUserRole(masterId) {
  return await prisma.userRole.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientTypes(masterId) {
  return await prisma.clientType.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientStatuses(masterId) {
  return await prisma.clientStatus.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientIndustries(masterId) {
  return await prisma.industry.delete({
    where: {
      id: masterId,
    },
  });
}

module.exports = {
  fetchMasterService,
  createMasterService,
  updateMasterService,
  deleteMasterService,
};

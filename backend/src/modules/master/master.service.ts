const AppError = require("../../utils/AppError");
const { masterTypes, MASTER_TYPES } = require("../../constants/masterTypes.ts");
const prisma = require("../../db/prisma");

type MasterData = {
  type: string;
  name: string;
  description?: string;
};

type UpdateMasterData = {
  name: string;
  description?: string;
};


async function fetchMasterService(type: string) {
  if (!type) {
    throw new AppError("master type is required");
  }

  const validMasterType = masterTypes.includes(type);
  if (!validMasterType) {
    throw new AppError("Invalid master type");
  }

  switch (type) {
    case MASTER_TYPES.USER_ROLE:
      return await fetchUserRoles();

    case MASTER_TYPES.CLIENT_TYPE:
      return await fetchClientTypes();

    case MASTER_TYPES.CLIENT_STATUS:
      return await fetchClientStatuses();

    case MASTER_TYPES.CLIENT_INDUSTRY:
      return await fetchClientIndustries();

    default:
      throw new AppError("Invalid master type", 400);
  }
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

async function createMasterService({ master }: { master: MasterData }) {
  validateMasterData(master);
  switch (master?.type) {
    case MASTER_TYPES.USER_ROLE:
      return await createUserRole(master);

    case MASTER_TYPES.CLIENT_TYPE:
      return await createClientTypes(master);

    case MASTER_TYPES.CLIENT_STATUS:
      return await createClientStatuses(master);

    case MASTER_TYPES.CLIENT_INDUSTRY:
      return await createClientIndustries(master);

    default:
      throw new AppError("Invalid master type", 400);
  }
}

async function createUserRole(master: MasterData) {
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

async function createClientTypes(master: MasterData) {
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

async function createClientStatuses(master: MasterData) {
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

async function createClientIndustries(master: MasterData) {
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

function validateMasterData(master: MasterData) {
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

async function updateMasterService(masterId: string, master: MasterData) {
  validateMasterData(master);
  const updateMasterData = {
    name: master.name,
    description: master.description,
  };
  const id = Number(masterId);
  switch (master?.type) {
    case MASTER_TYPES.USER_ROLE:
      return await updateUserRole(id, updateMasterData);

    case MASTER_TYPES.CLIENT_TYPE:
      return await updateClientTypes(id, updateMasterData);

    case MASTER_TYPES.CLIENT_STATUS:
      return await updateClientStatuses(id, updateMasterData);

    case MASTER_TYPES.CLIENT_INDUSTRY:
      return await updateClientIndustries(id, updateMasterData);

    default:
      throw new AppError("Invalid master type", 400);
  }
}

async function updateUserRole(
  masterId: number,
  updatedMaster: UpdateMasterData,
) {
  const existingMaster = await prisma.userRole.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.userRole.update({
    where: { id: masterId },
    data: { ...updatedMaster },
  });
}

async function updateClientTypes(
  masterId: number,
  updatedMaster: UpdateMasterData,
) {
  const existingMaster = await prisma.clientType.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.clientType.update({
    where: { id: masterId },
    data: { ...updatedMaster },
  });
}
async function updateClientStatuses(
  masterId: number,
  updatedMaster: UpdateMasterData,
) {
  const existingMaster = await prisma.clientStatus.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.clientStatus.update({
    where: { id: masterId },
    data: { ...updatedMaster },
  });
}
async function updateClientIndustries(
  masterId: number,
  updatedMaster: UpdateMasterData,
) {
  const existingMaster = await prisma.industry.findFirst({
    where: { id: masterId },
  });
  if (!existingMaster) {
    throw AppError("Invalid master id", 400);
  }
  return await prisma.industry.update({
    where: { id: masterId },
    data: { ...updatedMaster },
  });
}

async function deleteMasterService(masterId: string, masterType: string) {
  const id = Number(masterId);
  switch (masterType) {
    case MASTER_TYPES.USER_ROLE:
      return await deleteUserRole(id);

    case MASTER_TYPES.CLIENT_TYPE:
      return await deleteClientTypes(id);

    case MASTER_TYPES.CLIENT_STATUS:
      return await deleteClientStatuses(id);

    case MASTER_TYPES.CLIENT_INDUSTRY:
      return await deleteClientIndustries(id);

    default:
      throw new AppError("Invalid master type", 400);
  }
}

async function deleteUserRole(masterId: number) {
  return await prisma.userRole.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientTypes(masterId: number) {
  return await prisma.clientType.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientStatuses(masterId: number) {
  return await prisma.clientStatus.delete({
    where: {
      id: masterId,
    },
  });
}
async function deleteClientIndustries(masterId: number) {
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

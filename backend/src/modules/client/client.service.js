const clientModel = require("./client.model");
const AppError = require("../../utils/AppError");
async function fetchClients(page, limit) {
  let skip = limit * (page - 1);
  try {
    let [clients, totalCount] = await Promise.all([
      clientModel
        .find()
        .select("_id name email phone company status createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      clientModel.countDocuments(),
    ]);

    return {
      page,
      limit,
      skip,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      clients,
    };
  } catch (err) {
    throw new AppError("Failed to fetch clients", 400);
  }
}

async function fetchClientsById(id) {
  try {
    let clientData = await clientModel.findById(id).lean();
    if (!clientData) {
      throw new AppError("Client not found", 404);
    }
    return clientData;
  } catch (err) {
    throw new AppError("Failed to fetch client", 400);
  }
}

async function createClientService(data) {
  const { name, email, phone, company, status } = data;
  if (!name || !company || !phone || !email || !status) {
    throw new AppError("One or more fields are missing", 404);
  }
  const existingClient = await clientModel.find({ email });
  if (existingClient.length) {
    throw new AppError("Email already in use", 409);
  }
  try {
    const newClient = await clientModel.create({
      name,
      email,
      phone,
      company,
      status,
    });
    return newClient.toObject();
  } catch (err) {
    throw new AppError(err, 500);
  }
}

module.exports = {
  fetchClients,
  fetchClientsById,
  createClientService,
};

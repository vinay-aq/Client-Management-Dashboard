const clientModel = require("./client.model");

async function fetchClients(page, limit) {
  let skip = limit * (page - 1);
  try {
    let [clients, totalCount] = await Promise.all([
      clientModel.find()
        .select("_id name email status createdAt")
        .sort({createdAt:-1})
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
    throw new AppError("Failed to fetch clients", 400)
  }
}


module.exports = {
    fetchClients
}
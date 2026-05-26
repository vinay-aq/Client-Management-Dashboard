const clientModel = require("../client/client.model");

async function fetchDashboardStats() {
  const [
    totalClients,
    recentClients,
    activeClients,
    inactiveClients,
    pendingClients,
    suspendedClients,
  ] = await Promise.all([
    clientModel.countDocuments(),
    clientModel.find().sort({ createdAt: -1 }).limit(5),
    clientModel.countDocuments({ status: "active" }),
    clientModel.countDocuments({ status: "inactive" }),
    clientModel.countDocuments({ status: "pending" }),
    clientModel.countDocuments({ status: "suspended" }),
  ]);

  return {
    totalClients,
    recentClients,
    activeClients,
    inactiveClients,
    pendingClients,
    suspendedClients,
  };
}

module.exports = { fetchDashboardStats };

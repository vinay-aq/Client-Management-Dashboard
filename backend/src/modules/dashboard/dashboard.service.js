const clientModel = require("../client/client.model");
const { CLIENT_STATUS } = require("../../constants/clientStatus");
async function fetchDashboardStats() {
  const [
    totalClients,
    recentClients,
    leadClients,
    contactedClients,
    qualifiedClients,
    proposalSentClients,
    approvedClients,
    onboardedClients,
    suspendedClients,
    archievedClients,
  ] = await Promise.all([
    clientModel.countDocuments(),
    clientModel.find().sort({ createdAt: -1 }).limit(5),
    clientModel.countDocuments({ status: "lead" }),
    clientModel.countDocuments({ status: "contacted" }),
    clientModel.countDocuments({ status: "qualified" }),
    clientModel.countDocuments({ status: "proposal sent" }),
    clientModel.countDocuments({ status: "approved" }),
    clientModel.countDocuments({ status: "onboarded" }),
    clientModel.countDocuments({ status: "suspended" }),
    clientModel.countDocuments({ status: "archived" }),
  ]);

  return {
    totalClients,
    recentClients,
    leadClients,
    contactedClients,
    qualifiedClients,
    proposalSentClients,
    approvedClients,
    onboardedClients,
    suspendedClients,
    archievedClients,
  };
}

module.exports = { fetchDashboardStats };

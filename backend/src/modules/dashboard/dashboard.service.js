const clientModel = require("../client/client.model");
// const { CLIENT_STATUS } = require("../../constants/clientStatus");
const prisma = require("../../db/prisma");

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
    prisma.client.count(),
    prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
    prisma.client.count({ where: { status: "lead" } }),
    prisma.client.count({ where: { status: "contacted" } }),
    prisma.client.count({ where: { status: "qualified" } }),
    prisma.client.count({ where: { status: "proposal sent" } }),
    prisma.client.count({ where: { status: "approved" } }),
    prisma.client.count({ where: { status: "onboarded" } }),
    prisma.client.count({ where: { status: "suspended" } }),
    prisma.client.count({ where: { status: "archived" } }),
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

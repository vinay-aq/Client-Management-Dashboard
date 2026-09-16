import prisma from "../../db/prisma.js";

export async function fetchDashboardStats() {
  const [statusCount, clientStatuses, recentClients] = await Promise.all([
    prisma.client.groupBy({
      by: ["clientStatusId"],
      _count: { _all: true },
    }),
    prisma.clientStatus.findMany({
      select: {
        id: true,
        name: true,
        code: true,
      },
    }),
    prisma.client.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        clientStatus: true,
      },
      take: 5,
    }),
  ]);

  const statusCountLookup = Object.fromEntries(
    statusCount.map((item) => {
      const clientStatusId = item.clientStatusId;
      const count = item._count._all;
      return [clientStatusId, count];
    }),
  );

  const clientStatusCounts = clientStatuses.map((item) => ({
    id: item.id,
    label: item.name,
    code: item.code,
    count: statusCountLookup[item.id] ? statusCountLookup[item.id] : 0,
  }));

  return { clientStatusCounts, recentClients };
}

import prisma from "../src/db/prisma.js";
import clientTypes from "./seedFiles/clientTypes.js";
import industries from "./seedFiles/industries.js";
import roles from "./seedFiles/roles.js";
import clientStatuses from "./seedFiles/statuses.js";

async function main() {
  for (const clientType of clientTypes) {
    await prisma.clientType.upsert({
      where: {
        name: clientType.name,
      },
      update: clientType,
      create: clientType,
    });
  }

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: {
        name: industry.name,
      },
      update: industry,
      create: industry,
    });
  }

  for (const role of roles) {
    await prisma.userRole.upsert({
      where: {
        name: role.name,
      },
      update: role,
      create: role,
    });
  }

  for (const status of clientStatuses) {
    await prisma.clientStatus.upsert({
      where: {
        name: status.name,
      },
      update: status,
      create: status,
    });
  }

  console.log("Database seed completed.");
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

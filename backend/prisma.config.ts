import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  dataSource:{
      url: process.env.DATABASE_URL
  },
  skills: {
    agents: ["claude", "cursor", "agents", "devin"],
  },

});

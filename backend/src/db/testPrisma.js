require("dotenv").config();

const prisma = require("./prisma");

async function testPrisma() {
  try {
    const users = await prisma.user.findMany();

    console.log("Users:", users);
  } catch (error) {
    console.error("Prisma connection failed:");
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
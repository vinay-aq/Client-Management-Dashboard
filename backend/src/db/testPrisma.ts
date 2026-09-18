import "dotenv/config";
import prisma from "./prisma.js";

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

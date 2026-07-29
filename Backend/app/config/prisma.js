const { PrismaClient } = require("@prisma/client")

const prisma = globalThis.__petsVetaPrismaClient || new PrismaClient();
globalThis.__petsVetaPrismaClient = prisma;

module.exports = prisma 

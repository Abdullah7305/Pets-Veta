"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRagPrismaClient = getRagPrismaClient;
const client_1 = require("@prisma/client");
let client;
/** One Prisma pool for all TypeScript RAG repositories in this process. */
function getRagPrismaClient() {
    const processGlobal = globalThis;
    client ??= processGlobal.__petsVetaPrismaClient ?? new client_1.PrismaClient();
    processGlobal.__petsVetaPrismaClient = client;
    return client;
}
//# sourceMappingURL=prisma-client.js.map
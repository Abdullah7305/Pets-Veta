import { PrismaClient } from "@prisma/client";

let client: PrismaClient | undefined;

/** One Prisma pool for all TypeScript RAG repositories in this process. */
export function getRagPrismaClient(): PrismaClient {
  const processGlobal = globalThis as typeof globalThis & {
    __petsVetaPrismaClient?: PrismaClient;
  };
  client ??= processGlobal.__petsVetaPrismaClient ?? new PrismaClient();
  processGlobal.__petsVetaPrismaClient = client;
  return client;
}

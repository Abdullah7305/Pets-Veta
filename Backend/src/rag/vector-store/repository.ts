import { Prisma, PrismaClient } from "@prisma/client";

import type {
  VectorStoreDatabase,
  VectorStoreTransaction,
} from "./vector-store.interface";

import { getRagPrismaClient } from '../database';

export function getVectorStorePrismaClient(): PrismaClient {
  return getRagPrismaClient();
}

/** Prisma repository for native pgvector SQL unsupported by generated models. */
export class PrismaVectorStoreRepository implements VectorStoreDatabase {
  constructor(private readonly client: PrismaClient = getVectorStorePrismaClient()) {}

  execute(query: Prisma.Sql): Promise<number> {
    return this.client.$executeRaw(query);
  }

  query<T>(query: Prisma.Sql): Promise<T[]> {
    return this.client.$queryRaw<T[]>(query);
  }

  transaction<T>(work: (transaction: VectorStoreTransaction) => Promise<T>): Promise<T> {
    return this.client.$transaction((client) =>
      work({
        execute: (query) => client.$executeRaw(query),
        query: <TRow>(query: Prisma.Sql) => client.$queryRaw<TRow[]>(query),
      }),
    );
  }
}

/** Backward-compatible repository name. */
export const PrismaVectorStoreDatabase = PrismaVectorStoreRepository;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaVectorStoreDatabase = exports.PrismaVectorStoreRepository = void 0;
exports.getVectorStorePrismaClient = getVectorStorePrismaClient;
const database_1 = require("../database");
function getVectorStorePrismaClient() {
    return (0, database_1.getRagPrismaClient)();
}
/** Prisma repository for native pgvector SQL unsupported by generated models. */
class PrismaVectorStoreRepository {
    client;
    constructor(client = getVectorStorePrismaClient()) {
        this.client = client;
    }
    execute(query) {
        return this.client.$executeRaw(query);
    }
    query(query) {
        return this.client.$queryRaw(query);
    }
    transaction(work) {
        return this.client.$transaction((client) => work({
            execute: (query) => client.$executeRaw(query),
            query: (query) => client.$queryRaw(query),
        }));
    }
}
exports.PrismaVectorStoreRepository = PrismaVectorStoreRepository;
/** Backward-compatible repository name. */
exports.PrismaVectorStoreDatabase = PrismaVectorStoreRepository;
//# sourceMappingURL=repository.js.map
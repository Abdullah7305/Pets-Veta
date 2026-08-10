"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorBatchRepository = void 0;
const vector_store_utils_1 = require("./vector-store.utils");
/** Guarantees that each batch is committed or rolled back as one unit. */
class VectorBatchRepository {
    database;
    constructor(database) {
        this.database = database;
    }
    insert(knowledgeDocumentId, chunks) {
        return this.database.transaction((transaction) => transaction.execute((0, vector_store_utils_1.buildUpsertQuery)(knowledgeDocumentId, chunks)));
    }
}
exports.VectorBatchRepository = VectorBatchRepository;
//# sourceMappingURL=batch.repository.js.map
import type { PreparedChunk } from "./vector-store.utils";
import { buildUpsertQuery } from "./vector-store.utils";
import type { VectorStoreDatabase } from "./vector-store.interface";

/** Guarantees that each batch is committed or rolled back as one unit. */
export class VectorBatchRepository {
  constructor(private readonly database: VectorStoreDatabase) {}

  insert(knowledgeDocumentId: string, chunks: readonly PreparedChunk[]): Promise<number> {
    return this.database.transaction((transaction) =>
      transaction.execute(buildUpsertQuery(knowledgeDocumentId, chunks)),
    );
  }
}

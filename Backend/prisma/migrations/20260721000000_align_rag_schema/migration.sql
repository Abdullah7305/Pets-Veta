-- Align the original RAG migration with the current Prisma schema.
ALTER TABLE "KnowledgeDocument" ALTER COLUMN "source" DROP NOT NULL;
ALTER TABLE "KnowledgeDocument" ALTER COLUMN "checksum" DROP NOT NULL;
ALTER TABLE "KnowledgeChunk" ADD COLUMN IF NOT EXISTS "embeddingModel" VARCHAR(255);

CREATE INDEX IF NOT EXISTS "KnowledgeDocument_subCategory_idx"
ON "KnowledgeDocument"("subCategory");

CREATE INDEX IF NOT EXISTS "KnowledgeChunk_embeddingModel_idx"
ON "KnowledgeChunk"("embeddingModel");

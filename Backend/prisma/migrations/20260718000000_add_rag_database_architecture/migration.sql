-- pgvector must be enabled before creating a vector-typed column.
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateEnum
CREATE TYPE "Animal" AS ENUM ('DOG', 'CAT', 'BIRD', 'RABBIT', 'GENERAL');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('MARKDOWN', 'PDF');

-- CreateTable
CREATE TABLE "KnowledgeDocument" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "animal" "Animal" NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "subCategory" VARCHAR(100),
    "language" VARCHAR(16) NOT NULL DEFAULT 'en',
    "version" INTEGER NOT NULL DEFAULT 1,
    "source" VARCHAR(255) NOT NULL,
    "filePath" VARCHAR(1024) NOT NULL,
    "fileType" "FileType" NOT NULL DEFAULT 'MARKDOWN',
    "checksum" VARCHAR(64) NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeDocument_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "KnowledgeDocument_version_check" CHECK ("version" >= 1)
);

-- CreateTable
CREATE TABLE "KnowledgeChunk" (
    "id" UUID NOT NULL,
    "knowledgeDocumentId" UUID NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "heading" VARCHAR(500),
    "content" TEXT NOT NULL,
    "tokenCount" INTEGER NOT NULL,
    -- The selected embedding model must produce exactly 384 dimensions.
    "embedding" vector(384),
    "metadata" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeChunk_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "KnowledgeChunk_chunkIndex_check" CHECK ("chunkIndex" >= 0),
    CONSTRAINT "KnowledgeChunk_tokenCount_check" CHECK ("tokenCount" >= 0),
    CONSTRAINT "KnowledgeChunk_metadata_object_check" CHECK (jsonb_typeof("metadata") = 'object')
);

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeDocument_slug_key" ON "KnowledgeDocument"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeDocument_filePath_key" ON "KnowledgeDocument"("filePath");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_animal_idx" ON "KnowledgeDocument"("animal");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_category_idx" ON "KnowledgeDocument"("category");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_source_idx" ON "KnowledgeDocument"("source");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_checksum_idx" ON "KnowledgeDocument"("checksum");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_status_idx" ON "KnowledgeDocument"("status");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_language_status_idx" ON "KnowledgeDocument"("language", "status");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_animal_category_subCategory_status_idx"
ON "KnowledgeDocument"("animal", "category", "subCategory", "status");

-- CreateIndex
CREATE INDEX "KnowledgeDocument_status_updatedAt_idx" ON "KnowledgeDocument"("status", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeChunk_knowledgeDocumentId_chunkIndex_key"
ON "KnowledgeChunk"("knowledgeDocumentId", "chunkIndex");

-- CreateIndex
CREATE INDEX "KnowledgeChunk_knowledgeDocumentId_idx" ON "KnowledgeChunk"("knowledgeDocumentId");

-- CreateIndex
CREATE INDEX "KnowledgeChunk_chunkIndex_idx" ON "KnowledgeChunk"("chunkIndex");

-- CreateIndex: JSON containment and metadata-path filtering.
CREATE INDEX "KnowledgeChunk_metadata_idx"
ON "KnowledgeChunk" USING GIN ("metadata" jsonb_path_ops);

-- CreateIndex: cosine-distance approximate nearest-neighbor search.
CREATE INDEX "KnowledgeChunk_embedding_hnsw_idx"
ON "KnowledgeChunk" USING hnsw ("embedding" vector_cosine_ops)
WHERE "embedding" IS NOT NULL;

-- CreateIndex: language-neutral PostgreSQL full-text index for future hybrid search.
CREATE INDEX "KnowledgeChunk_content_fts_idx"
ON "KnowledgeChunk"
USING GIN (to_tsvector('simple'::regconfig, COALESCE("heading", '') || ' ' || "content"));

-- AddForeignKey
ALTER TABLE "KnowledgeChunk"
ADD CONSTRAINT "KnowledgeChunk_knowledgeDocumentId_fkey"
FOREIGN KEY ("knowledgeDocumentId") REFERENCES "KnowledgeDocument"("id")
ON DELETE CASCADE ON UPDATE CASCADE;


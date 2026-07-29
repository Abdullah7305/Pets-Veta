-- Idempotently guarantee the cosine HNSW index used by the production
-- `ORDER BY embedding <=> query_vector LIMIT n` retrieval query.
CREATE INDEX CONCURRENTLY IF NOT EXISTS "KnowledgeChunk_embedding_hnsw_idx"
ON "KnowledgeChunk"
USING hnsw ("embedding" vector_cosine_ops)
WHERE "embedding" IS NOT NULL;

-- Refresh planner statistics after deployments that ingest chunks before this
-- migration is applied. This does not alter data or the database schema.
ANALYZE "KnowledgeChunk";

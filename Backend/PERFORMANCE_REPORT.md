# RAG Performance Optimization Report

## Scope and invariants

The existing request flow remains unchanged:

`query -> HuggingFace embedding -> pgvector search -> retrieval -> prompt -> Gemini -> JSON response`

No route, request/response contract, database model, provider, or RAG
architecture was replaced. Both `/api/v1/ai/chat` and the existing legacy AI
route remain mounted as before.

## Baseline and expected latency

The pre-change TypeScript check and full existing suite passed. A live
PostgreSQL `EXPLAIN ANALYZE` and end-to-end Gemini benchmark could not be run
because the Docker daemon/PostgreSQL service is not available in this
workspace. The numbers below are therefore engineering estimates, not claimed
measurements. Staging p50/p95 measurements should replace them after deployment.

| Scenario | Before optimization (estimated) | After optimization (expected) |
| --- | ---: | ---: |
| First request after process start | 3-20 s, dominated by model load and Gemini | 3-18 s; DB connection overlaps model/embedding work |
| Warm, unique question | 0.9-4.5 s | 0.8-4.0 s (roughly 5-20% lower) |
| Repeated question with different retrieval options | 0.9-4.5 s | 0.85-4.4 s; embedding generation is skipped |
| Exact repeated question, local-memory hit | 0.9-4.5 s | typically 2-10 ms plus network transfer |
| Exact repeated question, Redis hit | 0.9-4.5 s | typically 5-25 ms; Redis work is capped at 100 ms |

The largest remaining bottleneck on uncached requests is the Gemini network and
generation time. The largest cold-start bottleneck is loading the local
HuggingFace model. Both are now separately visible in request logs.

## Optimizations

### Request-scoped performance telemetry

- **Why:** Component logs did not provide one correlated view of database, LLM,
  CPU, memory, serialization, and total request cost.
- **Change:** Added request-scoped timing with `AsyncLocalStorage`, a request ID,
  stage accumulation, process CPU delta, memory snapshot/delta, cache outcomes,
  response status, and a final structured `rag.performance` event.
- **Measured stages:** request receipt, response-cache lookup,
  embedding-cache lookup, embedding generation, database connection, vector
  search, chunk mapping/filtering, prompt build, Gemini API, Gemini response
  mapping, retry delay, JSON serialization, and total response completion.
- **Expected improvement:** Primarily diagnostic. It makes p50/p95 bottlenecks
  actionable and adds only small in-process timing/JSON overhead.
- **Trade-off:** More log volume. CPU values are process deltas during the
  request, so concurrent work can contribute to them.
- **Files:** `src/observability/rag-performance.js`,
  `src/api/middlewares/rag-performance.middleware.js`,
  `src/api/utils/measured-json-response.js`, chat route/controller/error
  middleware.

Example final event:

```json
{
  "event": "rag.performance",
  "stagesMs": {
    "embedding": 24.1,
    "databaseConnection": 0.2,
    "vectorSearch": 8.7,
    "chunkRetrieval": 0.3,
    "promptBuild": 0.8,
    "geminiApiRequest": 1130.4,
    "geminiResponse": 0.1,
    "jsonSerialization": 0.1
  },
  "databaseTimeMs": 8.9,
  "llmTimeMs": 1130.5,
  "totalTimeMs": 1168.2
}
```

### pgvector and Prisma

- **Why:** The normal unfiltered query joined `KnowledgeDocument` even though
  no document column was needed, and the TypeScript RAG repositories could
  create separate Prisma pools.
- **Change:** The unfiltered query now scans only `KnowledgeChunk`. A correlated
  `EXISTS` clause is added only when animal/category filters are present. The
  query still selects only `content`, `metadata`, and computed similarity and
  keeps the indexable `ORDER BY embedding <=> query_vector LIMIT n` shape.
- **Change:** The backend's central Prisma configuration, vector store, and
  retriever now reuse one process-wide Prisma client. The first `$connect()` is
  promise-cached and overlaps query embedding work; later requests reuse the
  resolved connection.
- **Change:** Added an idempotent, concurrent HNSW safeguard migration using
  `vector_cosine_ops`, followed by `ANALYZE`.
- **Expected improvement:** Common unfiltered vector-query time should fall by
  roughly 5-30%, depending on corpus size and cache state. Pool reuse prevents
  duplicate connections and resource contention. First-request latency becomes
  approximately `max(connection, embedding)` instead of their sum.
- **Trade-off:** HNSW consumes memory/disk and has approximate-recall trade-offs.
  The existing project already selected HNSW; the migration guarantees rather
  than changes that choice. `CREATE INDEX CONCURRENTLY` takes longer than a
  blocking build but permits production writes.
- **Files:** `src/rag/retrieval/retriever.utils.js`,
  `src/rag/database/*`, `src/rag/vector-store/repository.js`,
  `app/config/prisma.js`, and
  `prisma/migrations/20260723000000_optimize_rag_vector_search/migration.sql`.

PostgreSQL documents that a regular index build can block writes, while
`CONCURRENTLY` avoids that write-blocking lock:
<https://www.postgresql.org/docs/current/indexes-intro.html>. Prisma also calls
out non-concurrent index creation as a risky deployment pattern:
<https://docs.prisma.io/docs/orm/prisma-client/deployment/deploy-database-changes-with-prisma-migrate>.

### Retriever quality and work reduction

- **Why:** The runtime default similarity was effectively `0`, duplicate rows
  could enter the prompt, and mapped rows were not defensively rechecked.
- **Change:** The configured `SIMILARITY_THRESHOLD` now controls the default
  (default `0.7`). SQL filters low scores, and post-query validation removes
  malformed/low-score results and normalized duplicate content while retaining
  highest-ranked order and `topK`.
- **Expected improvement:** Less context mapping and fewer prompt tokens; most
  importantly, lower-quality chunks no longer consume Gemini input.
- **Trade-off:** A threshold that is too high can reduce recall. It remains
  configurable globally and per request through the existing API.
- **Files:** `src/rag/retrieval/retriever.service.js`,
  `retriever.utils.js`, `retriever.interface.js`, and `retriever.types.js`.

### Prompt reduction

- **Why:** Full source paths, file paths, chunk indexes, and similarity values
  were sent to Gemini even though the model only needs a source ID and useful
  title/heading. Safety and answer instructions also repeated concepts.
- **Change:** Prompt context retains source IDs, titles, headings, content, tag
  escaping, citation rules, safety rules, and insufficient-context behavior.
  Path/similarity metadata remains in the API response but is omitted from the
  LLM prompt. Duplicate context is removed again at this boundary for custom
  retrievers.
- **Expected improvement:** Common prompts should use roughly 10-30% fewer
  non-content tokens, depending on path/metadata length. Gemini latency and
  token cost should fall correspondingly where input processing is material.
- **Trade-off:** Gemini no longer sees path and raw similarity values; callers
  still receive them unchanged in `sources`.
- **Files:** `src/rag/prompt/prompt.utils.js`,
  `prompt.service.js`, and `prompt.templates.js`.

### Embedding cache

- **Why:** Identical questions regenerated the same deterministic 384-value
  embedding.
- **Change:** Added SHA-256 keyed, model-aware query-embedding caching with a
  default 24-hour TTL, finite-value/dimension validation, bounded in-memory LRU,
  optional Redis backing, and in-flight generation coalescing.
- **Expected improvement:** Repeated questions save the full local embedding
  cost (commonly tens of milliseconds once warm, and more under CPU pressure).
- **Trade-off:** Up to 1,000 entries are retained per cache instance by default.
  Model name is part of the key; TTL/versioning bounds stale data.
- **Files:** `src/rag/cache/*` and
  `src/rag/retrieval/retriever.service.js`.

### Exact response cache

- **Why:** An exact repeated request otherwise repeats embedding, database,
  prompt, and paid LLM work.
- **Change:** The AI service checks a stable SHA-256 key before retrieval. The
  key includes the trimmed exact question and every retrieval option/filter but
  excludes `conversationId`; the current conversation ID and current total
  latency are restored on each response. Default TTL is five minutes.
- **Expected improvement:** More than 95% latency reduction for exact hits, with
  no Gemini call.
- **Trade-off:** A cached answer can remain until its short TTL after knowledge
  ingestion. Retrieval options are deliberately part of the key, which avoids
  incorrect reuse but reduces hit rate.
- **Files:** `src/api/services/ai.service.js`,
  `src/api/types/chat.types.js`, and `src/rag/cache/*`.

### Redis fallback and bounded memory

- **Why:** Redis is already optional in the application; caching must remain
  available without adding a hard dependency or a new service.
- **Change:** The RAG cache reuses the existing Redis connection when ready,
  otherwise falls back to a bounded per-process LRU. Local memory is the L1;
  Redis provides cross-process reuse. Redis operations time out after 100 ms by
  default and never fail a chat request.
- **Trade-off:** Without Redis, entries are not shared across replicas. Redis
  outages reduce hit rate but not correctness.
- **Files:** `app/config/redis.config.js`, `src/rag/cache/*`,
  `src/config/env.js`, and `.env.example`.

### Gemini timeout and retry handling

- **Why:** A single transient 429, network reset, or 5xx failed the request.
- **Change:** Retryable failures receive at most two retries using capped
  exponential backoff with jitter. All attempts and delays remain inside one
  30-second total deadline; each attempt receives the remaining abort budget.
  Non-transient/configuration failures are not retried. Client responses still
  contain only existing generic error messages.
- **Expected improvement:** Better success rate during short upstream incidents
  without unbounded latency.
- **Trade-off:** A transient failure can take longer and may incur an additional
  upstream attempt. Retries are capped at five even under direct
  misconfiguration (default two).
- **Files:** `src/rag/gemini/gemini.service.js`,
  `gemini.interface.js`, `gemini.types.js`, and `gemini.constants.js`.

## Configuration defaults

```dotenv
SIMILARITY_THRESHOLD=0.7
EMBEDDING_CACHE_TTL_SECONDS=86400
RESPONSE_CACHE_TTL_SECONDS=300
RAG_CACHE_MAX_ENTRIES=1000
RAG_CACHE_OPERATION_TIMEOUT_MS=100
GEMINI_TIMEOUT_MS=30000
GEMINI_MAX_RETRIES=2
GEMINI_RETRY_BASE_DELAY_MS=200
# REDIS_URL=redis://localhost:6379
```

## Verification

- Pre-change: TypeScript check passed and the original suite passed.
- Post-change: production TypeScript build passed.
- Post-change: TypeScript no-emit check passed.
- Post-change: Prisma schema validation passed.
- Post-change: expanded suite passed: **67 tests, 0 failures**.
- Added coverage for memory/Redis cache behavior, cache TTL/LRU, embedding cache
  hits, index-friendly no-filter SQL, filtered SQL, duplicate/threshold
  retrieval, prompt metadata reduction, transient Gemini retry, response cache
  bypass, and unchanged API responses/errors.

## Staging validation still required

Run at least 30 representative unique questions and 100 repeated questions,
reporting p50/p95 by the `rag.performance` event. With the production corpus,
also run `EXPLAIN (ANALYZE, BUFFERS)` for filtered and unfiltered similarity
queries and confirm `KnowledgeChunk_embedding_hnsw_idx` is selected. PostgreSQL
can reasonably choose a sequential scan for a very small table, so index usage
must be evaluated with representative row counts rather than forced globally.

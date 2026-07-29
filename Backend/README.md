# Pets Veta Backend

The development stack runs the Node.js backend and PostgreSQL 17 with pgvector in Docker. Run all commands in this `Backend` directory.

## Prerequisites

- Docker Desktop with Docker Compose
- A Gemini API key

## First-time setup

1. Copy `.env.example` to `.env` and replace development credentials and API keys. `DATABASE_URL` uses `localhost` for Prisma commands run from the host; Compose overrides it to use the `postgres` service inside the backend container.
2. Start the complete stack:

   ```bash
   docker compose up -d
   docker ps
   ```

The PostgreSQL data is persisted in the named `pets_veta_postgres_data` volume. The backend waits for a healthy database and runs `prisma migrate deploy` before starting. The API is exposed on `PORT` (8000 by default), and PostgreSQL is exposed on port 5432.

## Database commands

Start only PostgreSQL when running Node.js on the host:

```bash
npm run db:start
npm run db:migrate
```

Useful commands:

```bash
npm run db:logs
npm run db:shell
npm run db:studio
docker compose down
```

`docker compose down` preserves database data. To deliberately remove it, use `docker compose down -v` (this permanently deletes the development database volume).

## pgvector initialization

The official `pgvector/pgvector:pg17` image is used. On a new volume, `docker/postgres/init/001-enable-vector.sql` automatically executes:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

To verify or enable it manually inside Docker:

```bash
docker compose exec postgres psql -U postgres -d pets_veta -c "CREATE EXTENSION IF NOT EXISTS vector;"
docker compose exec postgres psql -U postgres -d pets_veta -c "SELECT extversion FROM pg_extension WHERE extname = 'vector';"
```

If `POSTGRES_USER` or `POSTGRES_DB` differs from the defaults, substitute those values. Initialization scripts only run when PostgreSQL creates a fresh data directory; the Prisma RAG migration also uses `CREATE EXTENSION IF NOT EXISTS vector` for existing databases.

## Prisma and ingestion

Apply committed migrations and generate the Prisma client:

```bash
npm run db:migrate
npx prisma generate
```

Load Markdown, chunk it, generate 384-dimensional BGE embeddings, and store the chunks in pgvector:

```bash
npm run ingest
```

From Docker, use `docker compose exec backend npm run ingest`. The first embedding run may download the configured Hugging Face model and therefore requires network access.

## Validation

```bash
npm run typecheck:rag
npm test
docker compose config
```

Required RAG settings are documented in `.env.example`. The wider backend also reads integration settings for JWT, Redis, Stripe, Cloudinary, Gmail, Google OAuth, and frontend origins; configure those before exercising the corresponding features.

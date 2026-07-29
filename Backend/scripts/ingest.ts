import { createHash } from "node:crypto";

import { PrismaClient, type AnimalType } from "@prisma/client";

import { appConfig } from "../src/config";
import {
  EmbeddingService,
  chunkMarkdownDocuments,
  PgVectorStoreService,
  ProductionMarkdownLoader,
} from "../src/rag";

const prisma = new PrismaClient();

async function main(): Promise<void> {
  const documents = await new ProductionMarkdownLoader({
    knowledgeDirectory: appConfig.rag.knowledgeBasePath,
  }).loadDocuments();

  const embedder = new EmbeddingService();
  const vectorStore = new PgVectorStoreService();

  let storedChunks = 0;
  for (const document of documents) {
    const checksum = createHash("sha256").update(document.pageContent).digest("hex");
    const slug = document.metadata.id;
    const record = await prisma.knowledgeDocument.upsert({
      where: { slug },
      create: {
        title: document.metadata.title,
        slug,
        animal: document.metadata.animal as AnimalType,
        category: document.metadata.category,
        subCategory: document.metadata.subcategory,
        source: document.metadata.source,
        filePath: document.metadata.filePath,
        checksum,
        status: "ACTIVE",
      },
      update: {
        title: document.metadata.title,
        animal: document.metadata.animal as AnimalType,
        category: document.metadata.category,
        subCategory: document.metadata.subcategory,
        source: document.metadata.source,
        checksum,
        status: "ACTIVE",
      },
    });

    const chunks = await chunkMarkdownDocuments([document]);
    const embedded = await embedder.generateEmbeddings(chunks);
    if (embedded.length !== chunks.length) {
      throw new Error(`Embedding failed for ${slug}: ${embedded.length}/${chunks.length} chunks`);
    }
    const result = await vectorStore.replaceDocumentChunks(record.id, embedded);
    if (!result.success) throw new Error(`Vector storage failed for ${slug}`);
    storedChunks += result.affected;
  }

  console.info(`Ingestion complete: ${documents.length} documents, ${storedChunks} chunks stored.`);
}

main()
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());

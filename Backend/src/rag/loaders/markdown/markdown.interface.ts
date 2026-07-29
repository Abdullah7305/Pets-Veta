import type { Document } from "@langchain/core/documents";
import type { Logger } from "pino";

import type {
  MarkdownDocumentMetadata,
  MarkdownFileDescriptor,
} from "./markdown.types";

export interface MarkdownFileService {
  assertKnowledgeDirectory(directory: string): Promise<string>;
  scan(directory: string): Promise<readonly MarkdownFileDescriptor[]>;
  read(canonicalDirectory: string, file: MarkdownFileDescriptor): Promise<string>;
}

export interface MarkdownLoaderOptions {
  knowledgeDirectory?: string;
  logger?: Logger;
  fileService?: MarkdownFileService;
}

export interface MarkdownDocumentLoader {
  loadDocuments(): Promise<Array<Document<MarkdownDocumentMetadata>>>;
}

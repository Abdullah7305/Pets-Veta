export const SUPPORTED_ANIMALS = [
  "DOG",
  "CAT",
  "BIRD",
  "RABBIT",
  "GENERAL",
] as const;

export type MarkdownAnimal = (typeof SUPPORTED_ANIMALS)[number];

export interface MarkdownFrontMatter {
  [key: string]: unknown;
  id: string;
  title: string;
  animal: MarkdownAnimal;
  category: string;
  subcategory?: string;
  tags?: string[];
}

export interface MarkdownDocumentMetadata extends MarkdownFrontMatter {
  subcategory?: string;
  tags: string[];
  filePath: string;
  fileName: string;
  source: string;
  extension: ".md";
}

export interface MarkdownFileDescriptor {
  absolutePath: string;
  relativePath: string;
}

export interface MarkdownLoaderSummary {
  totalFiles: number;
  loadedFiles: number;
  skippedFiles: number;
  invalidMetadata: number;
  processingErrors: number;
  processingTimeMs: number;
}

export type MetadataValidationResult =
  | Readonly<{ success: true; metadata: MarkdownFrontMatter }>
  | Readonly<{
      success: false;
      issues: readonly Readonly<{ path: string; message: string }>[];
    }>;

import path from "node:path";

export const DEFAULT_KNOWLEDGE_DIRECTORY = path.resolve(
  __dirname,
  "../../../knowledge",
);

export const MARKDOWN_EXTENSION = ".md";
export const MARKDOWN_FILE_TYPE = "markdown" as const;
export const KNOWLEDGE_PATH_PREFIX = "knowledge";

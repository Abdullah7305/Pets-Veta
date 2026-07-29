export const SUPPORTED_MARKDOWN_HEADING_LEVELS = [1, 2, 3] as const;

export const RECURSIVE_MARKDOWN_SEPARATORS = [
  "\n\n",
  "\n",
  ". ",
  "! ",
  "? ",
  "; ",
  ", ",
  " ",
  "",
] as const;

export const CHUNK_TRUNCATION_ID_SEPARATOR = "#chunk-";

import matter = require("gray-matter");

import type { ParsedMarkdownFile } from "../types/markdown-loader.interfaces";

const UTF8_BYTE_ORDER_MARK = "\uFEFF";
const YAML_DELIMITER = "---";

interface FrontMatterBoundary {
  frontMatter: string;
  contentStart: number;
}

function stripByteOrderMark(content: string): string {
  return content.startsWith(UTF8_BYTE_ORDER_MARK) ? content.slice(1) : content;
}

function hasExactYamlOpeningDelimiter(content: string): boolean {
  return content.startsWith(`${YAML_DELIMITER}\n`) ||
    content.startsWith(`${YAML_DELIMITER}\r\n`);
}

function locateExactYamlClosingDelimiter(
  content: string,
): FrontMatterBoundary {
  const openingLineEnd = content.indexOf("\n");
  let lineStart = openingLineEnd + 1;

  while (lineStart <= content.length) {
    const nextLineFeed = content.indexOf("\n", lineStart);
    const lineEnd = nextLineFeed === -1 ? content.length : nextLineFeed;
    const rawLine = content.slice(lineStart, lineEnd);
    const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;

    if (line.startsWith(YAML_DELIMITER)) {
      if (line !== YAML_DELIMITER) {
        throw new SyntaxError(
          "YAML front matter delimiters must be on their own line.",
        );
      }

      return {
        frontMatter: content.slice(openingLineEnd + 1, lineStart),
        contentStart:
          nextLineFeed === -1 ? content.length : nextLineFeed + 1,
      };
    }

    if (nextLineFeed === -1) break;
    lineStart = nextLineFeed + 1;
  }

  throw new SyntaxError("YAML front matter is missing a closing delimiter.");
}

export function parseYamlFrontMatter(content: string): ParsedMarkdownFile {
  const normalizedContent = stripByteOrderMark(content);

  if (!hasExactYamlOpeningDelimiter(normalizedContent)) {
    return { content: normalizedContent, data: {} };
  }

  const boundary = locateExactYamlClosingDelimiter(normalizedContent);
  const normalizedFrontMatter = boundary.frontMatter.endsWith("\n")
    ? boundary.frontMatter
    : `${boundary.frontMatter}\n`;

  try {
    const parsed = matter(
      `${YAML_DELIMITER}\n${normalizedFrontMatter}${YAML_DELIMITER}\n`,
      { language: "yaml" },
    );

    return {
      content: normalizedContent.slice(boundary.contentStart),
      data: parsed.data,
    };
  } catch (error) {
    throw new SyntaxError("Invalid YAML front matter.", { cause: error });
  }
}

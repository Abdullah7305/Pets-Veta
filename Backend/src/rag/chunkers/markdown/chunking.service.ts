import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import { RECURSIVE_MARKDOWN_SEPARATORS } from "./chunk.constants";
import type {
  TextSplitter,
  TextSplitterFactory,
} from "./chunk.interface";
import { estimateChunkTokens } from "./chunk.utils";

/** LangChain adapter isolated behind a factory for deterministic testing. */
export class LangChainTextSplitterFactory implements TextSplitterFactory {
  create(chunkSize: number, chunkOverlap: number): TextSplitter {
    return new RecursiveCharacterTextSplitter({
      chunkSize,
      chunkOverlap,
      keepSeparator: true,
      lengthFunction: estimateChunkTokens,
      separators: [...RECURSIVE_MARKDOWN_SEPARATORS],
    });
  }
}

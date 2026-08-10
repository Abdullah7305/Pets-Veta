"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LangChainTextSplitterFactory = void 0;
const textsplitters_1 = require("@langchain/textsplitters");
const chunk_constants_1 = require("./chunk.constants");
const chunk_utils_1 = require("./chunk.utils");
/** LangChain adapter isolated behind a factory for deterministic testing. */
class LangChainTextSplitterFactory {
    create(chunkSize, chunkOverlap) {
        return new textsplitters_1.RecursiveCharacterTextSplitter({
            chunkSize,
            chunkOverlap,
            keepSeparator: true,
            lengthFunction: chunk_utils_1.estimateChunkTokens,
            separators: [...chunk_constants_1.RECURSIVE_MARKDOWN_SEPARATORS],
        });
    }
}
exports.LangChainTextSplitterFactory = LangChainTextSplitterFactory;
//# sourceMappingURL=chunking.service.js.map
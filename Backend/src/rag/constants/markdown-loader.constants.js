"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KNOWLEDGE_PATH_PREFIX = exports.MARKDOWN_FILE_TYPE = exports.MARKDOWN_EXTENSION = exports.DEFAULT_KNOWLEDGE_DIRECTORY = void 0;
const node_path_1 = __importDefault(require("node:path"));
exports.DEFAULT_KNOWLEDGE_DIRECTORY = node_path_1.default.resolve(__dirname, "../../../knowledge");
exports.MARKDOWN_EXTENSION = ".md";
exports.MARKDOWN_FILE_TYPE = "markdown";
exports.KNOWLEDGE_PATH_PREFIX = "knowledge";
//# sourceMappingURL=markdown-loader.constants.js.map
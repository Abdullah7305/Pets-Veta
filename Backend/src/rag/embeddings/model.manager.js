"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.embeddingModelManager = exports.HuggingFaceModelManager = void 0;
const embedding_constants_1 = require("./embedding.constants");
class HuggingFaceEmbeddingModel {
    extractor;
    constructor(extractor) {
        this.extractor = extractor;
    }
    async embed(texts) {
        const result = await this.extractor([...texts], {
            pooling: embedding_constants_1.EMBEDDING_POOLING,
            normalize: embedding_constants_1.NORMALIZE_EMBEDDINGS,
        });
        return result.tolist();
    }
}
/** Process-wide model cache that also deduplicates concurrent model loads. */
class HuggingFaceModelManager {
    static models = new Map();
    getModel(modelName) {
        const cached = HuggingFaceModelManager.models.get(modelName);
        if (cached)
            return cached;
        const loading = this.load(modelName).catch((error) => {
            HuggingFaceModelManager.models.delete(modelName);
            throw error;
        });
        HuggingFaceModelManager.models.set(modelName, loading);
        return loading;
    }
    async load(modelName) {
        const { pipeline } = await import("@huggingface/transformers");
        const extractor = await pipeline("feature-extraction", modelName);
        return new HuggingFaceEmbeddingModel(extractor);
    }
}
exports.HuggingFaceModelManager = HuggingFaceModelManager;
exports.embeddingModelManager = new HuggingFaceModelManager();
//# sourceMappingURL=model.manager.js.map
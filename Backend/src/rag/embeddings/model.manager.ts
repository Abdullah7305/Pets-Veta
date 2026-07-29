import {
  EMBEDDING_POOLING,
  NORMALIZE_EMBEDDINGS,
} from "./embedding.constants";
import type {
  EmbeddingModel,
  EmbeddingModelManager,
} from "./embedding.interface";

type TensorResult = { tolist(): unknown };
type FeatureExtractor = (
  texts: string[],
  options: { pooling: typeof EMBEDDING_POOLING; normalize: boolean },
) => Promise<TensorResult>;

class HuggingFaceEmbeddingModel implements EmbeddingModel {
  constructor(private readonly extractor: FeatureExtractor) {}

  async embed(texts: readonly string[]): Promise<number[][]> {
    const result = await this.extractor([...texts], {
      pooling: EMBEDDING_POOLING,
      normalize: NORMALIZE_EMBEDDINGS,
    });
    return result.tolist() as number[][];
  }
}

/** Process-wide model cache that also deduplicates concurrent model loads. */
export class HuggingFaceModelManager implements EmbeddingModelManager {
  private static readonly models = new Map<string, Promise<EmbeddingModel>>();

  getModel(modelName: string): Promise<EmbeddingModel> {
    const cached = HuggingFaceModelManager.models.get(modelName);
    if (cached) return cached;

    const loading = this.load(modelName).catch((error: unknown) => {
      HuggingFaceModelManager.models.delete(modelName);
      throw error;
    });
    HuggingFaceModelManager.models.set(modelName, loading);
    return loading;
  }

  private async load(modelName: string): Promise<EmbeddingModel> {
    const { pipeline } = await import("@huggingface/transformers");
    const extractor = await pipeline("feature-extraction", modelName);
    return new HuggingFaceEmbeddingModel(extractor as unknown as FeatureExtractor);
  }
}

export const embeddingModelManager = new HuggingFaceModelManager();

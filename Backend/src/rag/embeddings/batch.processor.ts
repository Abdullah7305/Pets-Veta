export type BatchResult<T> = Readonly<{
  values: T[];
  processedBatches: number;
  failedBatches: number;
}>;

/** Runs batches sequentially to put a predictable ceiling on inference memory. */
export class BatchProcessor {
  constructor(private readonly batchSize: number) {}

  async process<TInput, TOutput>(
    inputs: readonly TInput[],
    processBatch: (batch: readonly TInput[], batchIndex: number) => Promise<TOutput[]>,
    onFailure: (error: unknown, batch: readonly TInput[], batchIndex: number) => void,
  ): Promise<BatchResult<TOutput>> {
    const values: TOutput[] = [];
    let processedBatches = 0;
    let failedBatches = 0;
    for (let start = 0; start < inputs.length; start += this.batchSize) {
      const batchIndex = Math.floor(start / this.batchSize);
      const batch = inputs.slice(start, start + this.batchSize);
      try {
        values.push(...(await processBatch(batch, batchIndex)));
        processedBatches += 1;
      } catch (error) {
        failedBatches += 1;
        onFailure(error, batch, batchIndex);
      }
    }
    return { values, processedBatches, failedBatches };
  }
}

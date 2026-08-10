"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BatchProcessor = void 0;
/** Runs batches sequentially to put a predictable ceiling on inference memory. */
class BatchProcessor {
    batchSize;
    constructor(batchSize) {
        this.batchSize = batchSize;
    }
    async process(inputs, processBatch, onFailure) {
        const values = [];
        let processedBatches = 0;
        let failedBatches = 0;
        for (let start = 0; start < inputs.length; start += this.batchSize) {
            const batchIndex = Math.floor(start / this.batchSize);
            const batch = inputs.slice(start, start + this.batchSize);
            try {
                values.push(...(await processBatch(batch, batchIndex)));
                processedBatches += 1;
            }
            catch (error) {
                failedBatches += 1;
                onFailure(error, batch, batchIndex);
            }
        }
        return { values, processedBatches, failedBatches };
    }
}
exports.BatchProcessor = BatchProcessor;
//# sourceMappingURL=batch.processor.js.map
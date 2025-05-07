"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OobeVectorMemory = void 0;
const openai_1 = require("@langchain/openai");
const ZeroFormatRecord_1 = require("./ZeroFormatRecord");
class OobeVectorMemory {
    constructor(fetcher, embedder = new openai_1.OpenAIEmbeddings()) {
        this.data = [];
        this.embedder = embedder;
        this.fetcher = fetcher;
    }
    async syncFromBlockchain(batchActions, formatRes) {
        const actions = await this.fetcher.execute(batchActions || 1000); // deve restituire: { content: string, signature: string, timestamp: string }[]
        this.data = await new ZeroFormatRecord_1.ZeroFormatRecord().analyzeActions(actions.finalTransactions.tools, formatRes || "EMBEDDED");
        const vectors = await this.embedder.embedDocuments(this.data.map((entry) => JSON.stringify(entry)));
        return vectors;
    }
    async similaritySearch(query, topK = 3) {
        const queryVec = await this.embedder.embedQuery(query);
        const scored = this.data.map((entry) => ({
            ...entry,
            score: cosineSimilarity(entry.vector, queryVec),
        }));
        return scored
            .sort((a, b) => b.score - a.score)
            .slice(0, topK)
            .map(({ score, ...rest }) => rest);
    }
    getAll() {
        return this.data;
    }
}
exports.OobeVectorMemory = OobeVectorMemory;
// Util per cosine similarity
function cosineSimilarity(a, b) {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
}
//# sourceMappingURL=OobeVectorMemory.js.map
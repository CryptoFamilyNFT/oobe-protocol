import { OpenAIEmbeddings } from "@langchain/openai";
import { ZeroCombineFetcher } from "../../config/ZeroCombineFetcher";
import { PublicKey } from "@solana/web3.js";
import { ZeroFormatRecord } from "./ZeroFormatRecord";

export type EmbeddedAction = {
    content: string;
    vector: number[];
    meta: {
        signature: string;
        timestamp: string;
    };
};

export class OobeVectorMemory {
    private embedder: OpenAIEmbeddings;
    private fetcher: ZeroCombineFetcher;
    private data: EmbeddedAction[] = [];

    constructor(fetcher: ZeroCombineFetcher, embedder = new OpenAIEmbeddings()) {
        this.embedder = embedder;
        this.fetcher = fetcher;
    }

    async syncFromBlockchain(batchActions?: number, formatRes?: "JSON" | "TEXT" | "EMBEDDED" | undefined): Promise<number[][]> {

        const actions = await this.fetcher.execute(batchActions || 1000); // deve restituire: { content: string, signature: string, timestamp: string }[]
        this.data = await new ZeroFormatRecord().analyzeActions(actions.finalTransactions.tools, formatRes ||  "EMBEDDED") as EmbeddedAction[];

        const vectors = await this.embedder.embedDocuments(this.data.map((entry) => JSON.stringify(entry)));
        return vectors
    }

    async similaritySearch(query: string, topK = 3): Promise<EmbeddedAction[]> {
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

    getAll(): EmbeddedAction[] {
        return this.data;
    }
}

// Util per cosine similarity
function cosineSimilarity(a: number[], b: number[]): number {
    const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
    return dot / (normA * normB);
}

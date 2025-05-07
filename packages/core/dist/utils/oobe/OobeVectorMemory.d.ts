import { OpenAIEmbeddings } from "@langchain/openai";
import { ZeroCombineFetcher } from "../../config/ZeroCombineFetcher";
export type EmbeddedAction = {
    content: string;
    vector: number[];
    meta: {
        signature: string;
        timestamp: string;
    };
};
export declare class OobeVectorMemory {
    private embedder;
    private fetcher;
    private data;
    constructor(fetcher: ZeroCombineFetcher, embedder?: OpenAIEmbeddings);
    syncFromBlockchain(batchActions?: number, formatRes?: "JSON" | "TEXT" | "EMBEDDED" | undefined): Promise<number[][]>;
    similaritySearch(query: string, topK?: number): Promise<EmbeddedAction[]>;
    getAll(): EmbeddedAction[];
}
//# sourceMappingURL=OobeVectorMemory.d.ts.map
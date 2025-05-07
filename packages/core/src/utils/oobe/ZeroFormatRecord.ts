import { SpriteProfile } from "../../agent-personality";
import { ProofRecord } from "../../types/agent.interface";
import { EmbeddedAction } from "./OobeVectorMemory";

export type Personality = {
    profile: SpriteProfile[]
}

export class ZeroFormatRecord {


    public sanitizeBlockchainString(input: string): string {
        if (input === null || input === undefined) return 'NULL';
        if (typeof input === 'object') {
            return JSON.stringify(input).replace(/[^\x20-\x7E]/g, '');
        }
        return String(input).replace(/[^\w\s@?=.:/-]/gi, '');
    };
    /**
     * Analyzes the actions of the agent based on the provided records.
     * @param records - The array of ProofRecord objects to analyze.
     * @param formatRes - Optional parameter to specify the format of the result ("JSON" or "TEXT").
     * @returns A string representation of the analyzed actions in the specified format.
     */

    public async analyzeActions(records: ProofRecord[], formatRes: "JSON" | "TEXT" | "EMBEDDED" | "PERSONALITY" = "TEXT"): Promise<string | EmbeddedAction[] | Personality |null > {

        if (!records.length) {
            return "No past actions found on-chain.";
        }

        const summaries = records.map((record, index) => {

            const { transaction, firstChunkContent, cycledContent, proofSignature } = record;

            const time = new Date(transaction.blockTime * 1000).toISOString();
            const base = `#${index + 1} | ⏱️ ${time}\n🔐 Proof Signature: ${proofSignature}`;

            const initial = `📦 Initial Chunk: "${this.sanitizeBlockchainString(firstChunkContent.content)}"\n🔗 Previous Signature: ${this.sanitizeBlockchainString(firstChunkContent.prev_chunk_sign)}`;
            const cycleLogs = cycledContent.map((cycle, i) => {

                const step = [
                    cycle.content ? `🧩 Step ${i + 1}: "${this.sanitizeBlockchainString(cycle.content)}"` : null,
                    cycle.leaf1 && cycle.leaf2 ? `🌿 Leaves: [${cycle.leaf1}, ${cycle.leaf2}]` : null,
                    cycle.prevSign ? `↩️ Linked to: ${cycle.prevSign}` : null,
                ].filter(Boolean).join("\n");

                return step;
            }).join("\n\n");

            const error = transaction.err ? `❌ Transaction Error: ${JSON.stringify(transaction.err)}` : null;

            return [base, initial, cycleLogs, error].filter(Boolean).join("\n---\n");
        });


        console.log(...summaries);

        if (formatRes === "JSON") {
            return JSON.stringify({
                title: "🧠 AGENT HISTORICAL AWARENESS",
                description: "This log reflects your on-chain history and the reasoning behind past decisions and actions. Also refers to chat with your owner.",
                records: summaries.map((summary, index) => ({
                    index: index + 1,
                    summary: summary,
                    totalActions: records.length,
                    timestamp: new Date().toISOString(),
                })),
            });
        } else if (formatRes === "EMBEDDED") {
            return records.filter((rec) => rec.firstChunkContent.content).map((record) => ({
                content: record.firstChunkContent.content,
                vector: record.cycledContent.map((cycle) => cycle.content).flat().filter((content): content is string => content !== undefined).map(Number),
                meta: {
                    signature: record.proofSignature,
                    timestamp: record.transaction.blockTime.toString(),
                },
            } as EmbeddedAction));
        } else if (formatRes === "PERSONALITY") {
            return {
                profile: records.map((p: ProofRecord) => {
                    const data = p.cycledContent.map((cycle: { content?: string }) => {
                        return cycle.content ? this.sanitizeBlockchainString(cycle.content) : null;
                    }).filter((step): step is string => step !== null);

                    return data;
                })
            } as unknown as Personality;
        } else {
            return null
        }
    }
}
import { SpriteProfile } from "../../agent-personality";
import { ProofRecord } from "../../types/agent.interface";
import { EmbeddedAction } from "./OobeVectorMemory";
export type Personality = {
    profile: SpriteProfile[];
};
export declare class ZeroFormatRecord {
    sanitizeBlockchainString(input: string): string;
    /**
     * Analyzes the actions of the agent based on the provided records.
     * @param records - The array of ProofRecord objects to analyze.
     * @param formatRes - Optional parameter to specify the format of the result ("JSON" or "TEXT").
     * @returns A string representation of the analyzed actions in the specified format.
     */
    analyzeActions(records: ProofRecord[], formatRes?: "JSON" | "TEXT" | "EMBEDDED" | "PERSONALITY"): Promise<string | EmbeddedAction[] | Personality | null>;
}
//# sourceMappingURL=ZeroFormatRecord.d.ts.map
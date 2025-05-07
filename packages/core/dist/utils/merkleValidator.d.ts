import { SpriteProfile } from "../agent-personality";
import { Agent } from "../agent/Agents";
import { ResponseMessage } from "../types/agent.interface";
export interface MerkleValidator {
    status: string;
    message?: string;
    details?: any;
    code?: string;
}
export interface MerkleValidatorResult {
    merkleRoot: string | null;
    merkleProof: {
        input: string[] | null;
        result: string[] | null;
    };
    merkleLeaf: {
        input: string | null;
        result: string | null;
    };
    merkleEvents: string | null;
}
export declare function merkleValidator(agent: Agent, input: ResponseMessage[] | Partial<SpriteProfile> | any[], result: Record<string, any>): MerkleValidatorResult;
//# sourceMappingURL=merkleValidator.d.ts.map
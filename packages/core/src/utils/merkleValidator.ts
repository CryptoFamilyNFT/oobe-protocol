import { SpriteProfile } from "../agent-personality";
import { Agent } from "../agent/Agents";
import { MerkleTreeManager } from "../operations/merkle.operation";
import { ResponseMessage } from "../types/agent.interface";
import { compressData } from "./glib";
import Logger from "./logger/logger";

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


export function merkleValidator(agent: Agent, input: ResponseMessage[] | Partial<SpriteProfile> | any[], result: Record<string, any>): MerkleValidatorResult {
    try {
        const merkleTM = new MerkleTreeManager(agent);
        const logger = new Logger()

        merkleTM.addEvent(JSON.stringify(result)); // event1
        merkleTM.addEvent(JSON.stringify(input)); // event2

        const root = merkleTM.getMerkleRoot();

        const proof = merkleTM.getProof(JSON.stringify(result));
        const proofInput = merkleTM.getProof(JSON.stringify(input));

        const events: {id: string, timestamp: number, details: string}[] = merkleTM.getEvents();

        const leaf = merkleTM.getLeaf(JSON.stringify(result));
        const leafInput = merkleTM.getLeaf(JSON.stringify(input));

        return result = {
            merkleRoot: root,
            merkleProof: {input: proofInput, result: proof},
            merkleLeaf: {input: leafInput, result: leaf},
            merkleEvents: JSON.stringify(events.map((e) => e.details)),
        } as MerkleValidatorResult;

    } catch (error: any) {
        return result = {
            merkleRoot: null,
            merkleProof: {input: null, result: null},
            merkleLeaf: {input: null, result: null},
            merkleEvents: null,
        } as MerkleValidatorResult;
    }

}
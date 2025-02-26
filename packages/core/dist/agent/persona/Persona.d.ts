import { ProofOfAction } from '../../types/proofOfAction.interface';
import { ProofOfEvidence } from '../../types/proofOfEvidence.interface';
import { ProofOfEvolution } from '../../types/proofOfEvolution.interface';
import { MerkleTree } from 'merkletreejs';
export interface Persona {
    id: string;
    name: string;
    proofsOfAction: ProofOfAction[];
    proofsOfEvidence: ProofOfEvidence[];
    proofsOfEvolution: ProofOfEvolution[];
    addProofOfAction(proof: ProofOfAction): void;
    addProofOfEvidence(proof: ProofOfEvidence): void;
    addProofOfEvolution(proof: ProofOfEvolution): void;
    getProofs(): {
        actions: ProofOfAction[];
        evidences: ProofOfEvidence[];
        evolutions: ProofOfEvolution[];
    };
    evolve(): void;
    generateMerkleTree(): MerkleTree;
    sendToDatabase(): Promise<void>;
}
export declare class PersonaImpl implements Persona {
    id: string;
    name: string;
    proofsOfAction: ProofOfAction[];
    proofsOfEvidence: ProofOfEvidence[];
    proofsOfEvolution: ProofOfEvolution[];
    constructor(id: string, name: string);
    addProofOfAction(proof: ProofOfAction): void;
    addProofOfEvidence(proof: ProofOfEvidence): void;
    addProofOfEvolution(proof: ProofOfEvolution): void;
    getProofs(): {
        actions: ProofOfAction[];
        evidences: ProofOfEvidence[];
        evolutions: ProofOfEvolution[];
    };
    evolve(): void;
    generateMerkleTree(): MerkleTree;
    sendToDatabase(): Promise<void>;
}
//# sourceMappingURL=Persona.d.ts.map
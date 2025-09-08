import { AgentPersona } from './AgentPersona.entity';
export declare class ProofOfEvolution {
    id: string;
    evolutionType: string;
    previousState: object;
    newState: object;
    changes: object;
    reasoning?: string;
    trigger?: string;
    version: number;
    isReversible: boolean;
    impactScore: number;
    merkleProof?: string;
    createdAt: Date;
    persona: AgentPersona;
    persona_id: string;
}
//# sourceMappingURL=ProofOfEvolution.entity.d.ts.map
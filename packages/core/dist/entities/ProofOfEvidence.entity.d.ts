import { AgentPersona } from './AgentPersona.entity';
export declare class ProofOfEvidence {
    id: string;
    evidenceType: string;
    evidenceData: string;
    sourceType?: string;
    sourceUrl?: string;
    hash?: string;
    metadata?: object;
    isVerified: boolean;
    confidenceScore: number;
    verificationMethod?: string;
    createdAt: Date;
    persona: AgentPersona;
    persona_id: string;
}
//# sourceMappingURL=ProofOfEvidence.entity.d.ts.map
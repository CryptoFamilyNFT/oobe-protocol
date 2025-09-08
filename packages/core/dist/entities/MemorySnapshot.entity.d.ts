import { AgentPersona } from './AgentPersona.entity';
export declare class MemorySnapshot {
    id: string;
    snapshotType: string;
    memoryData: object;
    merkleRoot: string;
    merkleProofs?: object;
    nodeCount: number;
    sizeBytes: number;
    compressionMethod?: string;
    isCompressed: boolean;
    description?: string;
    metadata?: object;
    createdAt: Date;
    persona: AgentPersona;
    persona_id: string;
}
//# sourceMappingURL=MemorySnapshot.entity.d.ts.map
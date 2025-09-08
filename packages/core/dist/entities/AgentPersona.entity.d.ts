import { ProofOfAction } from './ProofOfAction.entity';
import { ProofOfEvidence } from './ProofOfEvidence.entity';
import { ProofOfEvolution } from './ProofOfEvolution.entity';
import { MemorySnapshot } from './MemorySnapshot.entity';
export declare class AgentPersona {
    id: string;
    name: string;
    walletAddress?: string;
    description?: string;
    personality?: object;
    traits?: object;
    avatar?: string;
    merkleRoot?: string;
    evolutionLevel: number;
    experiencePoints: number;
    memoryData?: object;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    proofsOfAction: ProofOfAction[];
    proofsOfEvidence: ProofOfEvidence[];
    proofsOfEvolution: ProofOfEvolution[];
    memorySnapshots: MemorySnapshot[];
}
//# sourceMappingURL=AgentPersona.entity.d.ts.map
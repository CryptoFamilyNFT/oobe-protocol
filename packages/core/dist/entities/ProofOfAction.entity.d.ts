import { AgentPersona } from './AgentPersona.entity';
export declare class ProofOfAction {
    id: string;
    actionType: string;
    actionData: string;
    actionParameters?: object;
    transactionHash?: string;
    blockNumber?: string;
    amount?: number;
    tokenAddress?: string;
    result?: string;
    isSuccessful: boolean;
    gasUsed?: number;
    errorMessage?: string;
    createdAt: Date;
    persona: AgentPersona;
    persona_id: string;
}
//# sourceMappingURL=ProofOfAction.entity.d.ts.map
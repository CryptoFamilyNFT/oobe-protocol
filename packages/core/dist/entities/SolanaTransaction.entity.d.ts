export declare class SolanaTransaction {
    id: string;
    transactionHash: string;
    agentWallet?: string;
    blockNumber?: string;
    blockTime?: Date;
    slot: number;
    status: string;
    confirmations?: number;
    instructions?: object[];
    accountKeys?: string[];
    fee: number;
    memo?: string;
    logs?: string[];
    errorMessage?: string;
    balanceChanges?: object[];
    tokenBalanceChanges?: object[];
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=SolanaTransaction.entity.d.ts.map
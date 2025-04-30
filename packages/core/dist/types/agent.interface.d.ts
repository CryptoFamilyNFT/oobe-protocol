export type ResponseMessage = {
    id: string;
    content: string;
    name: string;
    additional_kwargs: Record<string, any>;
    response_metadata: Record<string, any>;
    tool_call_id: string;
};
export interface MemoContent {
    leaf1: string;
    leaf2: string;
    prevSign: string;
}
export interface Transaction {
    blockTime: number;
    confirmationStatus: string;
    err: null | any;
    memo: MemoContent;
    signature: string;
    slot: number;
}
export interface FirstChunkContent {
    prev_chunk_sign: string;
    content: string;
}
export interface CycledContent {
    prev_chunk_sign?: string;
    content?: string;
    leaf1?: string;
    leaf2?: string;
    prevSign?: string;
    result?: string;
}
export interface ProofRecord {
    root: string;
    proofSignature: string;
    transaction: Transaction;
    firstChunkContent: FirstChunkContent;
    cycledContent: CycledContent[];
}
//# sourceMappingURL=agent.interface.d.ts.map
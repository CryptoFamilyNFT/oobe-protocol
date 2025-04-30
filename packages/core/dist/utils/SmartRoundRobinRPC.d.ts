import { Commitment, ConfirmedSignatureInfo, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';
export declare class SolanaRpcClient {
    private transports;
    private transportsRpc;
    constructor(transportRPC?: string[]);
    private sleep;
    private calculateRetryDelay;
    getRpcTransports(): string[];
    private fastRaceTransport;
    private retryingFastTransport;
    getParsedTransaction(txSignature: string): Promise<string>;
    getSignaturesForAddress(address: PublicKey, options?: any, commitment?: Commitment): Promise<Array<ConfirmedSignatureInfo>>;
    getBlock(slot: string, maxSupportedTransactionVersion?: number): Promise<string>;
    getLatestBlockhash(): Promise<string | {
        blockhash: string;
        lastValidBlockHeight: number;
    }>;
    sendRawTransaction(rawTransaction: Buffer | Uint8Array | Array<number>, options?: SendOptions): Promise<TransactionSignature>;
}
//# sourceMappingURL=SmartRoundRobinRPC.d.ts.map
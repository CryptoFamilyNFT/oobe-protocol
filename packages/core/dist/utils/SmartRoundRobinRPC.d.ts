import { AccountInfo, Commitment, ConfirmedSignatureInfo, ParsedAccountData, PublicKey, RpcResponseAndContext, SendOptions, TransactionSignature } from '@solana/web3.js';
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
    getBalance(address: PublicKey, commitment?: Commitment): Promise<string>;
    getTokenAccountsByOwner(address: PublicKey, programId: PublicKey, encoding?: 'jsonParsed'): Promise<RpcResponseAndContext<Array<{
        pubkey: PublicKey;
        account: AccountInfo<ParsedAccountData>;
    }>>>;
    getMultipleAccountInfo(addresses: PublicKey[]): Promise<Array<AccountInfo<Buffer> | null>>;
}
//# sourceMappingURL=SmartRoundRobinRPC.d.ts.map
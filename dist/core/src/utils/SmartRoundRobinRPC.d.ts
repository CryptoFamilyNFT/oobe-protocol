import { SendOptions, TransactionSignature } from '@solana/web3.js';
export declare function getParsedTransaction(txSignature: string): Promise<string>;
export declare function getBlock(slot: string, maxSupportedTransactionVersion?: number): Promise<string>;
export declare function getLatestBlockhash(): Promise<string | {
    blockhash: string;
    lastValidBlockHeight: number;
}>;
export declare function sendRawTransaction(rawTransaction: Buffer | Uint8Array | Array<number>, options?: SendOptions): Promise<TransactionSignature>;
//# sourceMappingURL=SmartRoundRobinRPC.d.ts.map
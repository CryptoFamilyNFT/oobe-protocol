import { Keypair } from '@solana/web3.js';
export declare class SolanaCore {
    private connection;
    constructor(endpoint: string);
    createWallet(): Keypair;
    getBalance(publicKey: string): Promise<number>;
}

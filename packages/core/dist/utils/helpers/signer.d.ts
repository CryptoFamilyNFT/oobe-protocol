import { Wallet } from "@coral-xyz/anchor";
import { PublicKey, Transaction, VersionedTransaction, Keypair } from "@solana/web3.js";
export declare class CustomWallet implements Wallet {
    readonly payer: Keypair;
    constructor(payer: Keypair);
    signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T>;
    signAllTransactions<T extends Transaction | VersionedTransaction>(txs: T[]): Promise<T[]>;
    get publicKey(): PublicKey;
}
//# sourceMappingURL=signer.d.ts.map
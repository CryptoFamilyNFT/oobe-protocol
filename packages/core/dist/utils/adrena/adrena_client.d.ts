import { Connection, PublicKey } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
import { IdlAccounts, Program } from "@coral-xyz/anchor";
import { Adrena } from "../helpers/idls/adrena_idls";
export type AdrenaProgram = Program<Adrena>;
type Accounts = IdlAccounts<Adrena>;
export type Cortex = Accounts["cortex"];
export type Custody = Accounts["custody"] & {
    pubkey: PublicKey;
};
export type Pool = Accounts["pool"];
export default class AdrenaClient {
    program: AdrenaProgram;
    mainPool: Pool;
    cortex: Cortex;
    custodies: Custody[];
    static programId: PublicKey;
    constructor(program: AdrenaProgram, mainPool: Pool, cortex: Cortex, custodies: Custody[]);
    static mainPool: PublicKey;
    static load(agent: Agent): Promise<AdrenaClient>;
    static findCustodyAddress(mint: PublicKey): PublicKey;
    static findCustodyTokenAccountAddress(mint: PublicKey): PublicKey;
    static findPositionAddress(owner: PublicKey, custody: PublicKey, side: "long" | "short"): PublicKey;
    static cortex: PublicKey;
    static lpTokenMint: PublicKey;
    static lmTokenMint: PublicKey;
    static getStakingPda(stakedTokenMint: PublicKey): PublicKey;
    static lmStaking: PublicKey;
    static lpStaking: PublicKey;
    static transferAuthority: PublicKey;
    static findATAAddressSync(wallet: PublicKey, mint: PublicKey): PublicKey;
    getCustodyByMint(mint: PublicKey): Custody;
    static getUserProfilePda(wallet: PublicKey): PublicKey;
    static stakingRewardTokenMint: PublicKey;
    static getStakingRewardTokenVaultPda(stakingPda: PublicKey): PublicKey;
    static lmStakingRewardTokenVault: PublicKey;
    static lpStakingRewardTokenVault: PublicKey;
    static isAccountInitialized(connection: Connection, address: PublicKey): Promise<boolean>;
    static createATAInstruction({ ataAddress, mint, owner, payer, }: {
        ataAddress: PublicKey;
        mint: PublicKey;
        owner: PublicKey;
        payer?: PublicKey;
    }): import("@solana/web3.js").TransactionInstruction;
}
export {};
//# sourceMappingURL=adrena_client.d.ts.map
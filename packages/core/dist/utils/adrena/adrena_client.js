"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const adrena_idls_1 = require("../helpers/idls/adrena_idls");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const spl_v1_1 = require("spl-v1");
class AdrenaClient {
    constructor(program, mainPool, cortex, custodies) {
        this.program = program;
        this.mainPool = mainPool;
        this.cortex = cortex;
        this.custodies = custodies;
    }
    static async load(agent) {
        const program = new anchor_1.Program(adrena_idls_1.IDL, AdrenaClient.programId, new anchor_1.AnchorProvider(agent.connection, new nodewallet_1.default(agent.wallet), {
            commitment: "processed",
            skipPreflight: true,
        }));
        const [cortex, mainPool] = await Promise.all([
            program.account.cortex.fetch(AdrenaClient.cortex),
            program.account.pool.fetch(AdrenaClient.mainPool),
        ]);
        const custodiesAddresses = mainPool.custodies.filter((custody) => !custody.equals(web3_js_1.PublicKey.default));
        const custodies = await program.account.custody.fetchMultiple(custodiesAddresses);
        if (!custodies.length || custodies.some((c) => c === null)) {
            throw new Error("Custodies not found");
        }
        return new AdrenaClient(program, mainPool, cortex, custodies.map((c, i) => ({
            ...c,
            pubkey: custodiesAddresses[i],
        })));
    }
    static findCustodyAddress(mint) {
        return web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("custody"),
            AdrenaClient.mainPool.toBuffer(),
            mint.toBuffer(),
        ], AdrenaClient.programId)[0];
    }
    static findCustodyTokenAccountAddress(mint) {
        return web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("custody_token_account"),
            AdrenaClient.mainPool.toBuffer(),
            mint.toBuffer(),
        ], AdrenaClient.programId)[0];
    }
    static findPositionAddress(owner, custody, side) {
        return web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("position"),
            owner.toBuffer(),
            AdrenaClient.mainPool.toBuffer(),
            custody.toBuffer(),
            Buffer.from([
                {
                    long: 1,
                    short: 2,
                }[side],
            ]),
        ], AdrenaClient.programId)[0];
    }
    static getStakingPda(stakedTokenMint) {
        return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("staking"), stakedTokenMint.toBuffer()], AdrenaClient.programId)[0];
    }
    static findATAAddressSync(wallet, mint) {
        return web3_js_1.PublicKey.findProgramAddressSync([wallet.toBuffer(), spl_v1_1.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], spl_v1_1.ASSOCIATED_TOKEN_PROGRAM_ID)[0];
    }
    getCustodyByMint(mint) {
        const custody = this.custodies.find((custody) => custody.mint.equals(mint));
        if (!custody) {
            throw new Error(`Cannot find custody for mint ${mint.toBase58()}`);
        }
        return custody;
    }
    static getUserProfilePda(wallet) {
        return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("user_profile"), wallet.toBuffer()], AdrenaClient.programId)[0];
    }
    static getStakingRewardTokenVaultPda(stakingPda) {
        return web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("staking_reward_token_vault"), stakingPda.toBuffer()], AdrenaClient.programId)[0];
    }
    static async isAccountInitialized(connection, address) {
        return !!(await connection.getAccountInfo(address));
    }
    static createATAInstruction({ ataAddress, mint, owner, payer = owner, }) {
        return (0, spl_v1_1.createAssociatedTokenAccountInstruction)(payer, ataAddress, owner, mint);
    }
}
AdrenaClient.programId = new web3_js_1.PublicKey("13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet");
AdrenaClient.mainPool = new web3_js_1.PublicKey("4bQRutgDJs6vuh6ZcWaPVXiQaBzbHketjbCDjL4oRN34");
AdrenaClient.cortex = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("cortex")], AdrenaClient.programId)[0];
AdrenaClient.lpTokenMint = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("lp_token_mint"), AdrenaClient.mainPool.toBuffer()], AdrenaClient.programId)[0];
AdrenaClient.lmTokenMint = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("lm_token_mint")], AdrenaClient.programId)[0];
AdrenaClient.lmStaking = AdrenaClient.getStakingPda(AdrenaClient.lmTokenMint);
AdrenaClient.lpStaking = AdrenaClient.getStakingPda(AdrenaClient.lpTokenMint);
AdrenaClient.transferAuthority = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from("transfer_authority")], AdrenaClient.programId)[0];
AdrenaClient.stakingRewardTokenMint = new web3_js_1.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
AdrenaClient.lmStakingRewardTokenVault = AdrenaClient.getStakingRewardTokenVaultPda(AdrenaClient.lmStaking);
AdrenaClient.lpStakingRewardTokenVault = AdrenaClient.getStakingRewardTokenVaultPda(AdrenaClient.lpStaking);
exports.default = AdrenaClient;
//# sourceMappingURL=adrena_client.js.map
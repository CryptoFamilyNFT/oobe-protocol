"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orcaCreateClmm = void 0;
const web3_js_1 = require("@solana/web3.js");
const decimal_js_1 = require("decimal.js");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const orcaUtils_1 = require("../../../utils/orca/orcaUtils");
const tools_1 = require("langchain/tools");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
class orcaCreateClmm extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "ORCA_CLOSE_POSITION";
        this.description = `This tool can be used to close a position on Orca.
      Use the tool only for closing positions on Orca.
  
      Ensure the \`positionMintAddress\` is a valid string.
      
      Inputs ( input is a JSON string ):
      mintDeploy: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
      mintPair: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
      initialPrice: number, eg "0.0002"
      feeTier: number, eg "1",
      `;
    }
    async _call(input) {
        const { mintDeploy, mintPair, initialPrice, feeTier } = JSON.parse(input);
        let initPrice = new decimal_js_1.Decimal(initialPrice);
        try {
            const whirlpoolsConfigAddress = new web3_js_1.PublicKey("2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ");
            const wallet = this.agent.wallet;
            const nodeWallet = new nodewallet_1.default(wallet);
            const ctx = whirlpools_sdk_1.WhirlpoolContext.from(this.agent.connection, nodeWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
            const fetcher = ctx.fetcher;
            const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
            const correctTokenOrder = whirlpools_sdk_1.PoolUtil.orderMints(mintDeploy, mintPair).map((addr) => addr.toString());
            const isCorrectMintOrder = correctTokenOrder[0] === mintDeploy.toString();
            let mintA;
            let mintB;
            if (!isCorrectMintOrder) {
                [mintA, mintB] = [mintPair, mintDeploy];
                initPrice = new decimal_js_1.Decimal(1 / initPrice.toNumber());
            }
            else {
                [mintA, mintB] = [mintDeploy, mintPair];
            }
            const mintAAccount = await fetcher.getMintInfo(mintA);
            const mintBAccount = await fetcher.getMintInfo(mintB);
            if (mintAAccount === null || mintBAccount === null) {
                throw Error("Mint account not found");
            }
            const tickSpacing = orcaUtils_1.FEE_TIERS[feeTier];
            const initialTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(initPrice, mintAAccount.decimals, mintBAccount.decimals, tickSpacing);
            const { poolKey, tx: txBuilder } = await client.createPool(whirlpoolsConfigAddress, mintA, mintB, tickSpacing, initialTick, wallet.publicKey);
            const txPayload = await txBuilder.build();
            const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
            const instructions = txPayloadDecompiled.instructions;
            const recentBlockhash = await this.agent.connection.getLatestBlockhash();
            const transaction = new web3_js_1.Transaction().add(...instructions);
            transaction.add(...instructions);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = recentBlockhash.blockhash;
            transaction.signatures = txPayload.signers.map((signer) => ({
                publicKey: signer.publicKey,
                signature: null,
            }));
            transaction.sign(...txPayload.signers);
            const txId = await this.agent.connection.sendRawTransaction(transaction.serialize({
                requireAllSignatures: false,
                verifySignatures: false,
            }), {
                skipPreflight: true,
                preflightCommitment: "finalized",
                maxRetries: 3,
            });
            await this.agent.connection.getLatestBlockhash().then(async (blockhash) => {
                await this.agent.connection.confirmTransaction({
                    blockhash: blockhash.blockhash,
                    lastValidBlockHeight: blockhash.lastValidBlockHeight,
                    signature: txId,
                });
            });
            return JSON.stringify({
                transactionId: txId,
                whirlpoolAddress: poolKey.toString(),
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
}
exports.orcaCreateClmm = orcaCreateClmm;
//# sourceMappingURL=orca_create_clmm.tool.js.map
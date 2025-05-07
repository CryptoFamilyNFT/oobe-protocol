"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orcaOpenSingleSidePositionTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const common_sdk_1 = require("@orca-so/common-sdk");
const spl_v1_1 = require("spl-v1");
const anchor_1 = require("@coral-xyz/anchor");
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class orcaOpenSingleSidePositionTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        whirlpoolAddress: zod_1.z.string().describe("The address of the Whirlpool pool."),
        inputTokenMint: zod_1.z.string().describe("The mint address of the input token."),
        inputAmount: zod_1.z.number().describe("The amount of input token to be used."),
        distanceFromCurrentPriceBps: zod_1.z.number().describe("The distance from the current price in basis points."),
        widthBps: zod_1.z.number().describe("The width of the position in basis points."),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "ORCA_OPEN_SINGLE_SIDED_POSITION";
        this.description = `
    This tool can be used to open a single-sided position on Orca.
    Use the tool only for opening positions on Orca.`;
    }
    async _call(input) {
        // Ensure input is correctly parsed
        const parsedInput = JSON.parse(JSON.stringify(input));
        const { whirlpoolAddress, inputTokenMint, inputAmount, distanceFromCurrentPriceBps, widthBps, } = parsedInput;
        try {
            const wallet = new anchor_1.Wallet(this.agent.wallet);
            const ctx = whirlpools_sdk_1.WhirlpoolContext.from(this.agent.connection, wallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
            const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
            const whirlpool = await client.getPool(whirlpoolAddress);
            const whirlpoolData = whirlpool.getData();
            const mintInfoA = whirlpool.getTokenAInfo();
            const mintInfoB = whirlpool.getTokenBInfo();
            const price = whirlpools_sdk_1.PriceMath.sqrtPriceX64ToPrice(whirlpoolData.sqrtPrice, mintInfoA.decimals, mintInfoB.decimals);
            const isTokenA = inputTokenMint.equals(mintInfoA.mint);
            let lowerBoundPrice;
            let upperBoundPrice;
            let lowerTick;
            let upperTick;
            if (isTokenA) {
                lowerBoundPrice = price.mul(1 + distanceFromCurrentPriceBps / 10000);
                upperBoundPrice = lowerBoundPrice.mul(1 + widthBps / 10000);
                upperTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(upperBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
                lowerTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(lowerBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
            }
            else {
                lowerBoundPrice = price.mul(1 - distanceFromCurrentPriceBps / 10000);
                upperBoundPrice = lowerBoundPrice.mul(1 - widthBps / 10000);
                lowerTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(upperBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
                upperTick = whirlpools_sdk_1.PriceMath.priceToInitializableTickIndex(lowerBoundPrice, mintInfoA.decimals, mintInfoB.decimals, whirlpoolData.tickSpacing);
            }
            const txBuilderTickArrays = await whirlpool.initTickArrayForTicks([
                lowerTick,
                upperTick,
            ]);
            let instructions = [];
            let signers = [];
            if (txBuilderTickArrays !== null) {
                const txPayloadTickArrays = await txBuilderTickArrays.build();
                const txPayloadTickArraysDecompiled = web3_js_1.TransactionMessage.decompile(txPayloadTickArrays.transaction.message);
                instructions = instructions.concat(txPayloadTickArraysDecompiled.instructions);
                signers = signers.concat(txPayloadTickArrays.signers);
            }
            const tokenExtensionCtx = {
                ...whirlpools_sdk_1.NO_TOKEN_EXTENSION_CONTEXT,
                tokenMintWithProgramA: mintInfoA,
                tokenMintWithProgramB: mintInfoB,
            };
            const increaseLiquiditQuote = (0, whirlpools_sdk_1.increaseLiquidityQuoteByInputToken)(inputTokenMint, inputAmount, lowerTick, upperTick, common_sdk_1.Percentage.fromFraction(1, 100), whirlpool, tokenExtensionCtx);
            const { positionMint, tx: txBuilder } = await whirlpool.openPositionWithMetadata(lowerTick, upperTick, increaseLiquiditQuote, undefined, undefined, undefined, spl_v1_1.TOKEN_2022_PROGRAM_ID);
            const txPayload = await txBuilder.build();
            const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
            instructions = instructions.concat(txPayloadDecompiled.instructions);
            signers = signers.concat(txPayload.signers);
            const recentBlockhash = await this.agent.connection.getLatestBlockhash();
            const transaction = new web3_js_1.Transaction().add(...instructions);
            transaction.add(...instructions);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = recentBlockhash.blockhash;
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
                transactionIds: txId,
                positionMint: positionMint.toString(),
            });
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.orcaOpenSingleSidePositionTool = orcaOpenSingleSidePositionTool;
//# sourceMappingURL=orca_open_single_side_pos.js.map
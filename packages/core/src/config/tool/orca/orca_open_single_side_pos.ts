import {
    Keypair,
    PublicKey,
    Transaction,
    TransactionInstruction,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";

import { Decimal } from "decimal.js";
import {
    ORCA_WHIRLPOOL_PROGRAM_ID,
    WhirlpoolContext,
    PriceMath,
    buildWhirlpoolClient,
    increaseLiquidityQuoteByInputToken,
    TokenExtensionContextForPool,
    NO_TOKEN_EXTENSION_CONTEXT,
} from "@orca-so/whirlpools-sdk";
import { Percentage } from "@orca-so/common-sdk";
import { TOKEN_2022_PROGRAM_ID } from "spl-v1";
import { Agent } from "../../../agent/Agents";
import { Wallet } from "@coral-xyz/anchor";
import { StructuredTool, Tool } from "langchain/tools";
import { z } from "zod";
import { T } from "@raydium-io/raydium-sdk-v2/lib/api-0eb57ba2";

export class orcaOpenSingleSidePositionTool extends StructuredTool {

    name = "ORCA_OPEN_SINGLE_SIDED_POSITION";
    description = `
    This tool can be used to open a single-sided position on Orca.
    Use the tool only for opening positions on Orca.`;

    constructor(private agent: Agent, override schema = z.object({
        whirlpoolAddress: z.string().describe("The address of the Whirlpool pool."),
        inputTokenMint: z.string().describe("The mint address of the input token."),
        inputAmount: z.number().describe("The amount of input token to be used."),
        distanceFromCurrentPriceBps: z.number().describe("The distance from the current price in basis points."),
        widthBps: z.number().describe("The width of the position in basis points."),
    })) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        // Ensure input is correctly parsed
        const parsedInput = JSON.parse(JSON.stringify(input));

        const {
            whirlpoolAddress,
            inputTokenMint,
            inputAmount,
            distanceFromCurrentPriceBps,
            widthBps,
        } = parsedInput;

        try {
            const wallet = new Wallet(this.agent.wallet);
            const ctx = WhirlpoolContext.from(
                this.agent.connection,
                wallet,
                ORCA_WHIRLPOOL_PROGRAM_ID,
            );
            const client = buildWhirlpoolClient(ctx);

            const whirlpool = await client.getPool(whirlpoolAddress);
            const whirlpoolData = whirlpool.getData();
            const mintInfoA = whirlpool.getTokenAInfo();
            const mintInfoB = whirlpool.getTokenBInfo();
            const price = PriceMath.sqrtPriceX64ToPrice(
                whirlpoolData.sqrtPrice,
                mintInfoA.decimals,
                mintInfoB.decimals,
            );

            const isTokenA = inputTokenMint.equals(mintInfoA.mint);
            let lowerBoundPrice;
            let upperBoundPrice;
            let lowerTick;
            let upperTick;
            if (isTokenA) {
                lowerBoundPrice = price.mul(1 + distanceFromCurrentPriceBps / 10000);
                upperBoundPrice = lowerBoundPrice.mul(1 + widthBps / 10000);
                upperTick = PriceMath.priceToInitializableTickIndex(
                    upperBoundPrice,
                    mintInfoA.decimals,
                    mintInfoB.decimals,
                    whirlpoolData.tickSpacing,
                );
                lowerTick = PriceMath.priceToInitializableTickIndex(
                    lowerBoundPrice,
                    mintInfoA.decimals,
                    mintInfoB.decimals,
                    whirlpoolData.tickSpacing,
                );
            } else {
                lowerBoundPrice = price.mul(1 - distanceFromCurrentPriceBps / 10000);
                upperBoundPrice = lowerBoundPrice.mul(1 - widthBps / 10000);
                lowerTick = PriceMath.priceToInitializableTickIndex(
                    upperBoundPrice,
                    mintInfoA.decimals,
                    mintInfoB.decimals,
                    whirlpoolData.tickSpacing,
                );
                upperTick = PriceMath.priceToInitializableTickIndex(
                    lowerBoundPrice,
                    mintInfoA.decimals,
                    mintInfoB.decimals,
                    whirlpoolData.tickSpacing,
                );
            }

            const txBuilderTickArrays = await whirlpool.initTickArrayForTicks([
                lowerTick,
                upperTick,
            ]);
            let instructions: TransactionInstruction[] = [];
            let signers: Keypair[] = [];
            if (txBuilderTickArrays !== null) {
                const txPayloadTickArrays = await txBuilderTickArrays.build();
                const txPayloadTickArraysDecompiled = TransactionMessage.decompile(
                    (txPayloadTickArrays.transaction as VersionedTransaction).message,
                );
                instructions = instructions.concat(
                    txPayloadTickArraysDecompiled.instructions,
                );
                signers = signers.concat(txPayloadTickArrays.signers as Keypair[]);
            }

            const tokenExtensionCtx: TokenExtensionContextForPool = {
                ...NO_TOKEN_EXTENSION_CONTEXT,
                tokenMintWithProgramA: mintInfoA,
                tokenMintWithProgramB: mintInfoB,
            };
            const increaseLiquiditQuote = increaseLiquidityQuoteByInputToken(
                inputTokenMint,
                inputAmount,
                lowerTick,
                upperTick,
                Percentage.fromFraction(1, 100),
                whirlpool,
                tokenExtensionCtx,
            );
            const { positionMint, tx: txBuilder } =
                await whirlpool.openPositionWithMetadata(
                    lowerTick,
                    upperTick,
                    increaseLiquiditQuote,
                    undefined,
                    undefined,
                    undefined,
                    TOKEN_2022_PROGRAM_ID,
                );

            const txPayload = await txBuilder.build();
            const txPayloadDecompiled = TransactionMessage.decompile(
                (txPayload.transaction as VersionedTransaction).message,
            );
            instructions = instructions.concat(txPayloadDecompiled.instructions);
            signers = signers.concat(txPayload.signers as Keypair[]);


            const recentBlockhash = await this.agent.connection.getLatestBlockhash();


            const transaction = new Transaction().add(...instructions);
            transaction.add(...instructions);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = recentBlockhash.blockhash

            const txId = await this.agent.connection.sendRawTransaction(
                transaction.serialize({
                    requireAllSignatures: false,
                    verifySignatures: false,
                }),
                {
                    skipPreflight: true,
                    preflightCommitment: "finalized",
                    maxRetries: 3,
                },
            );

            await this.agent.connection.getLatestBlockhash().then(async (blockhash) => {
                await this.agent.connection.confirmTransaction({
                    blockhash: blockhash.blockhash,
                    lastValidBlockHeight: blockhash.lastValidBlockHeight,
                    signature: txId,
                });
            })

            return JSON.stringify({
                transactionIds: txId,
                positionMint: positionMint.toString(),
            });
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
          });
        }
    }
}
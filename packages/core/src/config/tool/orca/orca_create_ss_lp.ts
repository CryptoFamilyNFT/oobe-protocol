import {
    Keypair,
    PublicKey,
    Transaction,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";
import { BN, Wallet } from "@coral-xyz/anchor";
import { Decimal } from "decimal.js";
import {
    PDAUtil,
    ORCA_WHIRLPOOL_PROGRAM_ID,
    WhirlpoolContext,
    TickUtil,
    PriceMath,
    PoolUtil,
    TokenExtensionContextForPool,
    NO_TOKEN_EXTENSION_CONTEXT,
    TokenExtensionUtil,
    WhirlpoolIx,
    IncreaseLiquidityQuoteParam,
    increaseLiquidityQuoteByInputTokenWithParams,
} from "@orca-so/whirlpools-sdk";
import {
    Percentage,
    resolveOrCreateATAs,
    TransactionBuilder,
} from "@orca-so/common-sdk";
import {
    increaseLiquidityIx,
    increaseLiquidityV2Ix,
    initTickArrayIx,
    openPositionWithTokenExtensionsIx,
} from "@orca-so/whirlpools-sdk/dist/instructions";
import {
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { FEE_TIERS } from "../../../utils/orca/orcaUtils";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export class orcaCreateSsLp extends Tool {

    name = "ORCA_CREATE_SS_LP";
    description = `This tool can be used to create single-sided liquidity on Orca.
      Use the tool only for creating single-sided liquidity on Orca.
      ## Example Usage:
      * You created a new token called MARK, and you want to set the initial price to 0.001 USDC.
      * You set \`depositTokenMint\` to MARK's mint address and \`otherTokenMint\` to USDC's mint address.
      * You can minimize price impact for buyers in a few ways:
      * 1. Increase the amount of tokens you deposit
      * 2. Set the initial price very low
      * 3. Set the maximum price closer to the initial price
      
      ### Note for experts:
      The Whirlpool program initializes the Whirlpool in a specific order. This might not be
      the order you expect, so the function checks the order and adjusts or inverts the prices. This means that
      on-chain the Whirlpool might be configured as USDC/SHARK instead of SHARK/USDC, and the on-chain price will
      be 1/\`initialPrice\`. This will not affect the price of the token as you intended it to be.
      
      @param depositTokenAmount - The amount of the deposit token to deposit in the pool.
      @param depositTokenMint - The mint address of the token being deposited into the pool, eg. SHARK.
      @param otherTokenMint - The mint address of the other token in the pool, eg. USDC.
      @param initialPrice - The initial price of the deposit token in terms of the other token.
      @param maxPrice - The maximum price at which liquidity is added.
      `;

    constructor(private agent: Agent) {
        super();
    }

    protected async _call(
        arg: any,
    ): Promise<string> {
        const {
            depositTokenAmount,
            depositTokenMint,
            otherTokenMint,
            initialPrice,
            maxPrice,
            feeTierBps,
        }: {
            depositTokenAmount: number;
            depositTokenMint: PublicKey;
            otherTokenMint: PublicKey;
            initialPrice: Decimal;
            maxPrice: Decimal;
            feeTierBps: keyof typeof FEE_TIERS;
        } = JSON.parse(arg);
        let initPrice = new Decimal(initialPrice);
        let maxPriceDecimal = new Decimal(maxPrice);
        let depositTokenAmountDecimal = depositTokenAmount;
        try {
            const whirlpoolsConfigAddress = new PublicKey(
                "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ",
            );

            const wallet = new Wallet(this.agent.wallet);
            const nodeWallet = new NodeWallet(this.agent.wallet);
            const ctx = WhirlpoolContext.from(
                this.agent.connection,
                nodeWallet,
                ORCA_WHIRLPOOL_PROGRAM_ID,
            );
            const fetcher = ctx.fetcher;

            const correctTokenOrder = PoolUtil.orderMints(
                otherTokenMint,
                depositTokenMint,
            ).map((addr) => addr.toString());
            const isCorrectMintOrder =
                correctTokenOrder[0] === depositTokenMint.toString();
            let mintA, mintB;
            if (isCorrectMintOrder) {
                [mintA, mintB] = [depositTokenMint, otherTokenMint];
            } else {
                [mintA, mintB] = [otherTokenMint, depositTokenMint];
                initPrice = new Decimal(1 / initPrice.toNumber());
                maxPriceDecimal = new Decimal(1 / maxPriceDecimal.toNumber());
            }
            const mintAAccount = await fetcher.getMintInfo(mintA);
            const mintBAccount = await fetcher.getMintInfo(mintB);
            if (mintAAccount === null || mintBAccount === null) {
                throw Error("Mint account not found");
            }
            const tickSpacing = FEE_TIERS[feeTierBps];
            const tickIndex = PriceMath.priceToTickIndex(
                initPrice,
                mintAAccount.decimals,
                mintBAccount.decimals,
            );
            const initialTick = TickUtil.getInitializableTickIndex(
                tickIndex,
                tickSpacing,
            );

            const tokenExtensionCtx: TokenExtensionContextForPool = {
                ...NO_TOKEN_EXTENSION_CONTEXT,
                tokenMintWithProgramA: mintAAccount,
                tokenMintWithProgramB: mintBAccount,
            };
            const feeTierKey = PDAUtil.getFeeTier(
                ORCA_WHIRLPOOL_PROGRAM_ID,
                whirlpoolsConfigAddress,
                tickSpacing,
            ).publicKey;
            const initSqrtPrice = PriceMath.tickIndexToSqrtPriceX64(initialTick);
            const tokenVaultAKeypair = Keypair.generate();
            const tokenVaultBKeypair = Keypair.generate();
            const whirlpoolPda = PDAUtil.getWhirlpool(
                ORCA_WHIRLPOOL_PROGRAM_ID,
                whirlpoolsConfigAddress,
                mintA,
                mintB,
                FEE_TIERS[feeTierBps],
            );
            const tokenBadgeA = PDAUtil.getTokenBadge(
                ORCA_WHIRLPOOL_PROGRAM_ID,
                whirlpoolsConfigAddress,
                mintA,
            ).publicKey;
            const tokenBadgeB = PDAUtil.getTokenBadge(
                ORCA_WHIRLPOOL_PROGRAM_ID,
                whirlpoolsConfigAddress,
                mintB,
            ).publicKey;
            const baseParamsPool = {
                initSqrtPrice,
                whirlpoolsConfig: whirlpoolsConfigAddress,
                whirlpoolPda,
                tokenMintA: mintA,
                tokenMintB: mintB,
                tokenVaultAKeypair,
                tokenVaultBKeypair,
                feeTierKey,
                tickSpacing: tickSpacing,
                funder: wallet.publicKey,
            };
            const initPoolIx = !TokenExtensionUtil.isV2IxRequiredPool(tokenExtensionCtx)
                ? WhirlpoolIx.initializePoolIx(ctx.program, baseParamsPool)
                : WhirlpoolIx.initializePoolV2Ix(ctx.program, {
                    ...baseParamsPool,
                    tokenProgramA: tokenExtensionCtx.tokenMintWithProgramA.tokenProgram,
                    tokenProgramB: tokenExtensionCtx.tokenMintWithProgramB.tokenProgram,
                    tokenBadgeA,
                    tokenBadgeB,
                });
            const initialTickArrayStartTick = TickUtil.getStartTickIndex(
                initialTick,
                tickSpacing,
            );
            const initialTickArrayPda = PDAUtil.getTickArray(
                ctx.program.programId,
                whirlpoolPda.publicKey,
                initialTickArrayStartTick,
            );

            const txBuilder = new TransactionBuilder(
                ctx.provider.connection,
                ctx.provider.wallet,
                ctx.txBuilderOpts,
            );
            txBuilder.addInstruction(initPoolIx);
            txBuilder.addInstruction(
                initTickArrayIx(ctx.program, {
                    startTick: initialTickArrayStartTick,
                    tickArrayPda: initialTickArrayPda,
                    whirlpool: whirlpoolPda.publicKey,
                    funder: wallet.publicKey,
                }),
            );

            let tickLowerIndex, tickUpperIndex;
            if (isCorrectMintOrder) {
                tickLowerIndex = initialTick;
                tickUpperIndex = PriceMath.priceToTickIndex(
                    maxPriceDecimal,
                    mintAAccount.decimals,
                    mintBAccount.decimals,
                );
            } else {
                tickLowerIndex = PriceMath.priceToTickIndex(
                    maxPriceDecimal,
                    mintAAccount.decimals,
                    mintBAccount.decimals,
                );
                tickUpperIndex = initialTick;
            }
            const tickLowerInitializableIndex = TickUtil.getInitializableTickIndex(
                tickLowerIndex,
                tickSpacing,
            );
            const tickUpperInitializableIndex = TickUtil.getInitializableTickIndex(
                tickUpperIndex,
                tickSpacing,
            );
            if (
                !TickUtil.checkTickInBounds(tickLowerInitializableIndex) ||
                !TickUtil.checkTickInBounds(tickUpperInitializableIndex)
            ) {
                throw Error("Prices out of bounds");
            }
            depositTokenAmountDecimal = isCorrectMintOrder
                ? depositTokenAmountDecimal * Math.pow(10, mintAAccount.decimals)
                : depositTokenAmountDecimal * Math.pow(10, mintBAccount.decimals);
            const increasLiquidityQuoteParam: IncreaseLiquidityQuoteParam = {
                inputTokenAmount: new BN(depositTokenAmount),
                inputTokenMint: depositTokenMint,
                tokenMintA: mintA,
                tokenMintB: mintB,
                tickCurrentIndex: initialTick,
                sqrtPrice: initSqrtPrice,
                tickLowerIndex: tickLowerInitializableIndex,
                tickUpperIndex: tickUpperInitializableIndex,
                tokenExtensionCtx: tokenExtensionCtx,
                slippageTolerance: Percentage.fromFraction(0, 100),
            };
            const liquidityInput = increaseLiquidityQuoteByInputTokenWithParams(
                increasLiquidityQuoteParam,
            );
            const { liquidityAmount: liquidity, tokenMaxA, tokenMaxB } = liquidityInput;

            const positionMintKeypair = Keypair.generate();
            const positionMintPubkey = positionMintKeypair.publicKey;
            const positionPda = PDAUtil.getPosition(
                ORCA_WHIRLPOOL_PROGRAM_ID,
                positionMintPubkey,
            );
            const positionTokenAccountAddress = getAssociatedTokenAddressSync(
                positionMintPubkey,
                wallet.publicKey,
                ctx.accountResolverOpts.allowPDAOwnerAddress,
                TOKEN_2022_PROGRAM_ID,
            );
            const params = {
                funder: wallet.publicKey,
                owner: wallet.publicKey,
                positionPda,
                positionTokenAccount: positionTokenAccountAddress,
                whirlpool: whirlpoolPda.publicKey,
                tickLowerIndex: tickLowerInitializableIndex,
                tickUpperIndex: tickUpperInitializableIndex,
            };
            const positionIx = openPositionWithTokenExtensionsIx(ctx.program, {
                ...params,
                positionMint: positionMintPubkey,
                withTokenMetadataExtension: true,
            });

            txBuilder.addInstruction(positionIx);
            txBuilder.addSigner(positionMintKeypair);

            const [ataA, ataB] = await resolveOrCreateATAs(
                ctx.connection,
                wallet.publicKey,
                [
                    { tokenMint: mintA, wrappedSolAmountIn: tokenMaxA },
                    { tokenMint: mintB, wrappedSolAmountIn: tokenMaxB },
                ],
                () => ctx.fetcher.getAccountRentExempt(),
                wallet.publicKey,
                undefined,
                ctx.accountResolverOpts.allowPDAOwnerAddress,
                "ata",
            );
            const { address: tokenOwnerAccountA, ...tokenOwnerAccountAIx } = ataA;
            const { address: tokenOwnerAccountB, ...tokenOwnerAccountBIx } = ataB;

            txBuilder.addInstruction(tokenOwnerAccountAIx);
            txBuilder.addInstruction(tokenOwnerAccountBIx);

            const tickArrayLowerStartIndex = TickUtil.getStartTickIndex(
                tickLowerInitializableIndex,
                tickSpacing,
            );
            const tickArrayUpperStartIndex = TickUtil.getStartTickIndex(
                tickUpperInitializableIndex,
                tickSpacing,
            );
            const tickArrayLowerPda = PDAUtil.getTickArray(
                ctx.program.programId,
                whirlpoolPda.publicKey,
                tickArrayLowerStartIndex,
            );
            const tickArrayUpperPda = PDAUtil.getTickArray(
                ctx.program.programId,
                whirlpoolPda.publicKey,
                tickArrayUpperStartIndex,
            );
            if (tickArrayUpperStartIndex !== tickArrayLowerStartIndex) {
                if (isCorrectMintOrder) {
                    txBuilder.addInstruction(
                        initTickArrayIx(ctx.program, {
                            startTick: tickArrayUpperStartIndex,
                            tickArrayPda: tickArrayUpperPda,
                            whirlpool: whirlpoolPda.publicKey,
                            funder: wallet.publicKey,
                        }),
                    );
                } else {
                    txBuilder.addInstruction(
                        initTickArrayIx(ctx.program, {
                            startTick: tickArrayLowerStartIndex,
                            tickArrayPda: tickArrayLowerPda,
                            whirlpool: whirlpoolPda.publicKey,
                            funder: wallet.publicKey,
                        }),
                    );
                }
            }

            const baseParamsLiquidity = {
                liquidityAmount: liquidity,
                tokenMaxA,
                tokenMaxB,
                whirlpool: whirlpoolPda.publicKey,
                positionAuthority: wallet.publicKey,
                position: positionPda.publicKey,
                positionTokenAccount: positionTokenAccountAddress,
                tokenOwnerAccountA,
                tokenOwnerAccountB,
                tokenVaultA: tokenVaultAKeypair.publicKey,
                tokenVaultB: tokenVaultBKeypair.publicKey,
                tickArrayLower: tickArrayLowerPda.publicKey,
                tickArrayUpper: tickArrayUpperPda.publicKey,
            };

            const liquidityIx = !TokenExtensionUtil.isV2IxRequiredPool(
                tokenExtensionCtx,
            )
                ? increaseLiquidityIx(ctx.program, baseParamsLiquidity)
                : increaseLiquidityV2Ix(ctx.program, {
                    ...baseParamsLiquidity,
                    tokenMintA: mintA,
                    tokenMintB: mintB,
                    tokenProgramA: tokenExtensionCtx.tokenMintWithProgramA.tokenProgram,
                    tokenProgramB: tokenExtensionCtx.tokenMintWithProgramB.tokenProgram,
                });
            txBuilder.addInstruction(liquidityIx);

            const txPayload = await txBuilder.build();
            const instructions = TransactionMessage.decompile(
                (txPayload.transaction as VersionedTransaction).message,
            ).instructions;

            const recentBlockhash = await this.agent.connection.getLatestBlockhash();


            const transaction = new Transaction().add(...instructions);
            transaction.add(...instructions);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = recentBlockhash.blockhash
            transaction.signatures = [
                { publicKey: positionMintKeypair.publicKey, signature: null },
                { publicKey: tokenVaultAKeypair.publicKey, signature: null },
                { publicKey: tokenVaultBKeypair.publicKey, signature: null },
            ];
            transaction.sign(...txPayload.signers);

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
                transactionId: txId,
                whirlpoolAddress: whirlpoolPda.publicKey.toString(),
                positionMintAddress: positionMintPubkey.toString(),
                signature: txId,
                message: "Successfully created Orca whirlpool position",
            });
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: `Failed to create Orca whirlpool position: ${error.message}`,
                error: error.toString(),
            });
        }
    }
}
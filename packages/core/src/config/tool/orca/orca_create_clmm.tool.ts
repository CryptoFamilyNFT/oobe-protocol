import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Decimal } from "decimal.js";
import {
  ORCA_WHIRLPOOL_PROGRAM_ID,
  WhirlpoolContext,
  PriceMath,
  PoolUtil,
  buildWhirlpoolClient,
} from "@orca-so/whirlpools-sdk";
import { FEE_TIERS } from "../../../utils/orca/orcaUtils";
import { Agent } from "../../../agent/Agents";
import { StructuredTool, Tool } from "langchain/tools";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { z } from "zod";

export class orcaCreateClmm extends StructuredTool {

  name = "ORCA_CLOSE_POSITION";
  description = `This tool can be used to close a position on Orca.
      Use the tool only for closing positions on Orca.
  
      Ensure the \`positionMintAddress\` is a valid string.
      
      Inputs ( input is a JSON string ):
      mintDeploy: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
      mintPair: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
      initialPrice: number, eg "0.0002"
      feeTier: number, eg "1",
      `;

  constructor(private agent: Agent, override schema = z.object({
      mintDeploy: z.string().describe("The mint address to deploy"),
      mintPair: z.string().describe("The mint address of the pair"),
      initialPrice: z.number().describe("The initial price for the position"),
      feeTier: z.enum(Object.keys(FEE_TIERS) as [string, ...string[]]).describe("The fee tier for the pool"),
  })) {
    super();
  }

  protected async _call(
    input: z.infer<typeof this.schema>,
  ): Promise<string> {
    const { mintDeploy, mintPair, initialPrice, feeTier }: 
          { mintDeploy: string; mintPair: string; initialPrice: number; feeTier: keyof typeof FEE_TIERS } = JSON.parse(JSON.stringify(input));
    let initPrice = new Decimal(initialPrice);
    try {
      const whirlpoolsConfigAddress = new PublicKey(
        "2LecshUwdy9xi7meFgHtFJQNSKk4KdTrcpvaB56dP2NQ",
      );
      const wallet = this.agent.wallet;
      const nodeWallet = new NodeWallet(wallet);
      const ctx = WhirlpoolContext.from(
        this.agent.connection,
        nodeWallet,
        ORCA_WHIRLPOOL_PROGRAM_ID,
      );
      const fetcher = ctx.fetcher;
      const client = buildWhirlpoolClient(ctx);

      const correctTokenOrder = PoolUtil.orderMints(mintDeploy, mintPair).map(
        (addr) => addr.toString(),
      );
      const isCorrectMintOrder = correctTokenOrder[0] === mintDeploy.toString();
      let mintA;
      let mintB;
      if (!isCorrectMintOrder) {
        [mintA, mintB] = [mintPair, mintDeploy];
        initPrice = new Decimal(1 / initPrice.toNumber());
      } else {
        [mintA, mintB] = [mintDeploy, mintPair];
      }
      const mintAAccount = await fetcher.getMintInfo(mintA);
      const mintBAccount = await fetcher.getMintInfo(mintB);
      if (mintAAccount === null || mintBAccount === null) {
        throw Error("Mint account not found");
      }

      const tickSpacing = FEE_TIERS[feeTier];
      const initialTick = PriceMath.priceToInitializableTickIndex(
        initPrice,
        mintAAccount.decimals,
        mintBAccount.decimals,
        tickSpacing,
      );
      const { poolKey, tx: txBuilder } = await client.createPool(
        whirlpoolsConfigAddress,
        mintA,
        mintB,
        tickSpacing,
        initialTick,
        wallet.publicKey,
      );

      const txPayload = await txBuilder.build();
      const txPayloadDecompiled = TransactionMessage.decompile(
        (txPayload.transaction as VersionedTransaction).message,
      );
      const instructions = txPayloadDecompiled.instructions;
      const recentBlockhash = await this.agent.connection.getLatestBlockhash();


      const transaction = new Transaction().add(...instructions);
      transaction.add(...instructions);
      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = recentBlockhash.blockhash
      transaction.signatures = txPayload.signers.map((signer) => ({
        publicKey: signer.publicKey,
        signature: null,
      }));
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
        whirlpoolAddress: poolKey.toString(),
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

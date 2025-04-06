import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Percentage } from "@orca-so/common-sdk";
import {
  buildWhirlpoolClient,
  WhirlpoolContext,
  PDAUtil,
  ORCA_WHIRLPOOL_PROGRAM_ID,
} from "@orca-so/whirlpools-sdk";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { Tool } from "langchain/tools";
import { stat } from "fs";
import { Agent } from "../../../agent/Agents";

export class orcaClosePositionTool extends Tool {

  name = "ORCA_CLOSE_POSITION";
  description = `This tool can be used to close a position on Orca.
    Use the tool only for closing positions on Orca.

    Ensure the \`positionMintAddress\` is a valid string.
    
    Inputs ( input is a JSON string ):
    positionMintAddress: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
    `;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    // Ensure input is correctly parsed
    const parsedInput = JSON.parse(input);
    if (!parsedInput || typeof parsedInput !== 'object') {
        throw new Error("Invalid input format, expected JSON object.");
    }

    try {
      const wallet = this.agent.wallet
      const nodeWallet = new NodeWallet(wallet);
      const ctx = WhirlpoolContext.from(
        this.agent.connection,
        nodeWallet,
        ORCA_WHIRLPOOL_PROGRAM_ID,
      );
      const client = buildWhirlpoolClient(ctx);

      const positionAddress = PDAUtil.getPosition(
        ORCA_WHIRLPOOL_PROGRAM_ID,
        parsedInput.positionMintAddress,
      );
      const position = await client.getPosition(positionAddress.publicKey);
      const whirlpoolAddress = position.getData().whirlpool;
      const whirlpool = await client.getPool(whirlpoolAddress);
      const txBuilder = await whirlpool.closePosition(
        positionAddress.publicKey,
        Percentage.fromFraction(1, 100),
      );
      const txPayload = await txBuilder[0].build();
      const txPayloadDecompiled = TransactionMessage.decompile(
        (txPayload.transaction as VersionedTransaction).message,
      );
      const recentBlockhash = await this.agent.connection.getLatestBlockhash();


      const instructions = txPayloadDecompiled.instructions;
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

      return txId;
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: "Failed to close position",
        error: error.toString(),
      });
    }
  }
}

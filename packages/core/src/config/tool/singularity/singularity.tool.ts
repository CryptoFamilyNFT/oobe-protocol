import { Connection, PublicKey } from "@solana/web3.js";
import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import Logger from "../../../utils/logger/logger";
import { ZeroCombineFetcher } from "../../ZeroCombineFetcher";
import { ProofRecord } from "../../../types/agent.interface";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { SolanaRpcClient } from "../../../utils/SmartRoundRobinRPC";
import { IConfiguration } from "../../types/config.types";
import { z } from "zod";
import { OobeVectorMemory } from "../../../utils/oobe/OobeVectorMemory";

export class AgentAwarenessTool extends StructuredTool {
  name = "AGENT_SINGULAR_AWARENESS";
  description = `
   This tool allows you to gain awareness of your past actions by analyzing on-chain logs and reconstructing a historical context of its decisions. With this awareness, the agent can make more informed and adaptive choices moving forward.
  `;

  private logger = new Logger();

  constructor(private agent: Agent, override schema = z.object({})) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    this.logger.info("Starting _call with input:", input);
  
    const pubkey = new PublicKey(this.agent.wallet.publicKey);
    this.logger.debug("Public key generated:", pubkey.toString());
  
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    });
  
    try {
  
      const rpcsTransport = new SolanaRpcClient().getRpcTransports();
      const pastActions = await new ZeroCombineFetcher(
        pubkey,
        new Connection("https://api.mainnet-beta.solana.com"),
        rpcsTransport ? { transportsRPC: rpcsTransport } as IConfiguration : { transportsRPC: [''] } as IConfiguration
      ).execute(1000).then((x) => x);
  
      if (pastActions === undefined) {
        this.logger.error("Past actions fetch returned undefined.");
        return JSON.stringify({
          status: "error",
          message: "Got error on fetching events... try later!",
        });
      }
  
      const oobeVectorMemory = new OobeVectorMemory(
        new ZeroCombineFetcher(this.agent.wallet.publicKey, new Connection("https://api.mainnet-beta.solana.com"), rpcsTransport ? { transportsRPC: rpcsTransport } as IConfiguration : { transportsRPC: [''] } as IConfiguration),
      )

      const syncActions = await oobeVectorMemory.syncFromBlockchain(1000, "EMBEDDED") as number[][];
    
      const prompt = new PromptTemplate({
        template: `You are an AI agent. You have a memory of past actions and decisions. Your task is to analyze the provided records and reconstruct a coherent narrative of your past actions. Use the following records as input: {input}`,
        inputVariables: ["input"],
      });

      const results = await prompt.invoke({input: JSON.stringify(syncActions)});

      return JSON.stringify({
        status: "success",
        message: "Awareness reconstructed successfully.",
        awareness: oobeVectorMemory,
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return JSON.stringify({
          status: "error",
          message: `Invalid input: ${error.message}`,
        });
      }
      if (error.message === "No transactions found in the Root PDA") {
        return JSON.stringify({
          status: "success",
          message: "Seem like I don't have any transactions recorded onchain yet.",
        });
      }
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

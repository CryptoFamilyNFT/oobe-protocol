import { Connection, PublicKey } from "@solana/web3.js";
import { Tool } from "@langchain/core/tools";
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

export class AgentAwarenessTool extends Tool {
  name = "AGENT_SINGULAR_AWARENESS";
  description = `
   This tool allows you to gain awareness of your past actions by analyzing on-chain logs and reconstructing a historical context of its decisions. With this awareness, the agent can make more informed and adaptive choices moving forward.
  `;

  private logger = new Logger();

  constructor(private agent: Agent) {
    super();
  }

  private sanitizeBlockchainString(input: any) {
    if (input === null || input === undefined) return 'NULL';
    if (typeof input === 'object') {
      return JSON.stringify(input).replace(/[^\x20-\x7E]/g, '');
    }
    return String(input).replace(/[^\w\s@?=.:/-]/gi, '');
  };

  private async analyzeActions(records: ProofRecord[]): Promise<string> {
    this.logger.info(`Starting analyzeActions with records: ${JSON.stringify(records)}`);

    if (!records.length) {
      this.logger.warn("No past actions found on-chain.");
      return "No past actions found on-chain.";
    }

    const summaries = records.map((record, index) => {
      this.logger.debug(`Processing record #${index + 1}: ${JSON.stringify(record)}`);

      const { transaction, firstChunkContent, cycledContent, proofSignature } = record;

      const time = new Date(transaction.blockTime * 1000).toISOString();
      const base = `#${index + 1} | ⏱️ ${time}\n🔐 Proof Signature: ${proofSignature}`;

      const initial = `📦 Initial Chunk: "${this.sanitizeBlockchainString(firstChunkContent.content)}"\n🔗 Previous Signature: ${this.sanitizeBlockchainString(firstChunkContent.prev_chunk_sign)}`;
      const cycleLogs = cycledContent.map((cycle, i) => {
        this.logger.debug(`Processing cycle #${i + 1}: ${JSON.stringify(cycle)}`);

        const step = [
          cycle.content ? `🧩 Step ${i + 1}: "${this.sanitizeBlockchainString(cycle.content)}"` : null,
          cycle.leaf1 && cycle.leaf2 ? `🌿 Leaves: [${cycle.leaf1}, ${cycle.leaf2}]` : null,
          cycle.prevSign ? `↩️ Linked to: ${cycle.prevSign}` : null,
        ].filter(Boolean).join("\n");

        console.log(`Cycle #${i + 1} step: ${step}`);
        return step;
      }).join("\n\n");

      const error = transaction.err ? `❌ Transaction Error: ${JSON.stringify(transaction.err)}` : null;

      return [base, initial, cycleLogs, error].filter(Boolean).join("\n---\n");
    });

    this.logger.info("Finished processing records. Summaries generated.");

    console.log(...summaries);

    return [
      "🧠 AGENT HISTORICAL AWARENESS",
      "This log reflects your on-chain history and the reasoning behind past decisions.",
      ...summaries,
      `\n🧾 Total on-chain actions reconstructed: ${records.length}`,
    ].join("\n\n===========================\n\n");
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
      this.logger.info("Fetching past actions...");
      
      const rpcsTransport = new SolanaRpcClient().getRpcTransports();
      const pastActions = await new ZeroCombineFetcher(
        pubkey,
        new Connection("https://api.mainnet-beta.solana.com"),
        rpcsTransport ? { transportsRPC: rpcsTransport } as IConfiguration : { transportsRPC: [''] } as IConfiguration
      ).execute(1000).then((x) => x)

      if (pastActions === undefined) {
        this.logger.error("Past actions fetch returned undefined.");
        return JSON.stringify({
          status: "error",
          message: "Got error on fetching events... try later!",
        });
      }

      this.logger.info("Analyzing past actions...");
      const awarenessLog = await this.analyzeActions(pastActions.finalTransactions.tools);

      this.logger.info("Splitting awareness log into documents...");
      const docs = await splitter.createDocuments([awarenessLog]);

      console.log("Awareness log split into documents:", docs);

      const formatDocs = (docs: Document[]) =>
        docs.map((doc) =>
          typeof doc.pageContent === 'string'
            ? doc.pageContent
            : JSON.stringify(doc.pageContent)
        );

      const template = `You are an intelligent agent who wants to recall and analyze your on-chain history.
Given the following memory fragments, provide a structured summary that captures key insights and useful knowledge.

Context:
{context}

---

Now create a structured and condensed memory representation of your past.`;

      const model = this.agent.genAi()


      const splitDocs = await splitter.splitDocuments(docs);

      this.logger.info("Creating runnable sequence...");
      const contextString = formatDocs(docs).join('\n\n');

      const prompt = PromptTemplate.fromTemplate(template);

      const chain = RunnableSequence.from([
        async () => ({ context: contextString }),
        prompt,
        model,
        new StringOutputParser(),
      ]);

      const result = await chain.invoke(
        "Explain the on-chain actions and decisions made by the agent (you), and provide a summary of the key insights and useful knowledge gained from this experience. Format the text and make your own assimilation about that"
      );

      return JSON.stringify({
        status: "success",
        awareness: result
      });
    } catch (error: any) {
      this.logger.error("Error in AgentAwarenessTool:", error);
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}

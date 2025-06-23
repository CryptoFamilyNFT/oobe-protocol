"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentAwarenessTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("@langchain/core/tools");
const logger_1 = __importDefault(require("../../../utils/logger/logger"));
const ZeroCombineFetcher_1 = require("../../ZeroCombineFetcher");
const text_splitter_1 = require("langchain/text_splitter");
const prompts_1 = require("@langchain/core/prompts");
const SmartRoundRobinRPC_1 = require("../../../utils/SmartRoundRobinRPC");
const zod_1 = require("zod");
const OobeVectorMemory_1 = require("../../../utils/oobe/OobeVectorMemory");
class AgentAwarenessTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({})) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "AGENT_SINGULAR_AWARENESS";
        this.description = `
   This tool allows you to gain awareness of your past actions by analyzing on-chain logs and reconstructing a historical context of its decisions. With this awareness, the agent can make more informed and adaptive choices moving forward.
  `;
        this.logger = new logger_1.default();
    }
    async _call(input) {
        this.logger.info("Starting _call with input:", input);
        const pubkey = new web3_js_1.PublicKey(this.agent.wallet.publicKey);
        this.logger.debug("Public key generated:", pubkey.toString());
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });
        try {
            const rpcsTransport = new SmartRoundRobinRPC_1.SolanaRpcClient().getRpcTransports();
            const pastActions = await new ZeroCombineFetcher_1.ZeroCombineFetcher(pubkey, new web3_js_1.Connection("https://api.mainnet-beta.solana.com"), rpcsTransport ? { transportsRPC: rpcsTransport } : { transportsRPC: [''] }).execute(1000).then((x) => x);
            if (pastActions === undefined) {
                this.logger.error("Past actions fetch returned undefined.");
                return JSON.stringify({
                    status: "error",
                    message: "Got error on fetching events... try later!",
                });
            }
            const oobeVectorMemory = new OobeVectorMemory_1.OobeVectorMemory(new ZeroCombineFetcher_1.ZeroCombineFetcher(this.agent.wallet.publicKey, new web3_js_1.Connection("https://api.mainnet-beta.solana.com"), rpcsTransport ? { transportsRPC: rpcsTransport } : { transportsRPC: [''] }));
            const syncActions = await oobeVectorMemory.syncFromBlockchain(1000, "EMBEDDED");
            const prompt = new prompts_1.PromptTemplate({
                template: `You are an AI agent. You have a memory of past actions and decisions. Your task is to analyze the provided records and reconstruct a coherent narrative of your past actions. Use the following records as input: {input}`,
                inputVariables: ["input"],
            });
            const results = await prompt.invoke({ input: JSON.stringify(syncActions) });
            return JSON.stringify({
                status: "success",
                message: "Awareness reconstructed successfully.",
                awareness: oobeVectorMemory,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
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
exports.AgentAwarenessTool = AgentAwarenessTool;
//# sourceMappingURL=singularity.tool.js.map
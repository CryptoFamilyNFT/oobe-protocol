"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const __1 = require("..");
const actions_1 = require("../actions");
const default_1 = __importDefault(require("../config/default"));
const index_tool_1 = require("../config/tool/index.tool");
const langgraph_1 = require("@langchain/langgraph");
const readline = __importStar(require("readline"));
const messages_1 = require("@langchain/core/messages");
async function AgentExecution(oobe) {
    /**
  * @description Get the agent from the OOBE core module
  */
    const agent = oobe.getAgent();
    /**
  * @description Register the actions from the OOBE protocol
  */
    agent.registerActions(actions_1.Actions.map((action) => action.action)); // Register the actions from the OOBE protocol
    /**
  * @description Create the tools for the agent
  */
    const tools = await (0, index_tool_1.createSolanaTools)(agent);
    /**
     * @description Memory for the agent to store information
     */
    const memory = new langgraph_1.MemorySaver();
    const config = { configurable: { thread_id: "Solana Agent Kit!" } };
    /**
     * @description Loop for the agent to think and respond to the user input or prompt from the agent itself
     * @returns {Promise<void>}
     */
    const oobe_agent = (0, prebuilt_1.createReactAgent)({
        llm: await agent.genAi(),
        tools: tools,
        checkpointSaver: memory,
        messageModifier: `
          You are a helpful agent that can interact onchain using the Solana Agent Kit. You are
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the
          faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
          (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
          can't do with your currently available tools, you must say so, and encourage them to implement it
          themselves using the Solana Agent Kit, recommend they go to https://oobe.me/ for more information. Be
          concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        `,
    });
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve));
    try {
        while (true) {
            const userInput = await question("\nPrompt: ");
            if (userInput.toLowerCase() === "exit") {
                break;
            }
            const stream = await oobe_agent.stream({ messages: [new messages_1.HumanMessage(userInput)] }, config);
            for await (const chunk of stream) {
                if ("agent" in chunk) {
                    console.log("\x1b[32m%s\x1b[0m", chunk.agent.messages[0].content); // Green color for agent messages
                }
                else if ("tools" in chunk) {
                    console.log("\x1b[34m%s\x1b[0m", chunk.tools.messages[0].content); // Blue color for tools messages
                }
                console.log("-------------------");
            }
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
    finally {
        rl.close();
    }
}
function main() {
    /**
     * Configure OOBE
     */
    const configManager = new default_1.default();
    configManager.createDefaultConfig(process.env.PRIVATE_KEY || '', process.env.OPENAI_KEY || '', process.env.OOBE_KEY || '');
    const oobe = new __1.OobeCore(configManager.getDefaultConfig());
    oobe.start();
    AgentExecution(oobe);
}
main();
//# sourceMappingURL=runner.js.map
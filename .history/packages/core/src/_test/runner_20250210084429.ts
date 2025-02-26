import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";
import { OobeCore } from "..";
import { Actions } from "../actions";
import { Agent } from "../agent/Agents";
import {ConfigManager} from "../config/default";
import { createSolanaTools } from "../config/tool/index.tool";
import { MemorySaver } from "@langchain/langgraph";
import * as readline from "readline";
import { HumanMessage } from "@langchain/core/messages";

async function AgentExecution(oobe: OobeCore) {
  /**
* @description Get the agent from the OOBE core module
*/
  const agent = oobe.getAgent();
  /**
* @description Register the actions from the OOBE protocol
*/
  agent.registerActions(Actions.map((action) => action.action)); // Register the actions from the OOBE protocol


  /**
* @description Create the tools for the agent
*/
  const tools = await createSolanaTools(agent);

  /**
   * @description Memory for the agent to store information
   */

  const memory = new MemorySaver();

  const config = { configurable: { thread_id: "Solana Agent Kit!" } };

  /**
   * @description Loop for the agent to think and respond to the user input or prompt from the agent itself 
   * @returns {Promise<void>}
   */

  const oobe_agent = createReactAgent({
    llm: await agent.genAi(),
    tools: tools as unknown as ToolNode<any>,
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

  const question = (prompt: string): Promise<string> => new Promise((resolve) => rl.question(prompt, resolve));

  try {
    while (true) {
      const userInput = await question("\nPrompt: ");

      if (userInput.toLowerCase() === "exit") {
        break;
      }

      const stream = await oobe_agent.stream(
        { messages: [new HumanMessage(userInput)] },
        config,
      );

      for await (const chunk of stream) {
        if ("agent" in chunk) {
          console.log("\x1b[32m%s\x1b[0m", chunk.agent.messages[0].content); // Green color for agent messages
        } else if ("tools" in chunk) {
          console.log("\x1b[34m%s\x1b[0m", chunk.tools.messages[0].content); // Blue color for tools messages
        }
        console.log("-------------------");
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    }
    process.exit(1);
  } finally {
    rl.close();
  }
}

function main() {
  /**
   * Configure OOBE
   */

  const configManager = new ConfigManager();

  configManager.createDefaultConfig(
    process.env.PRIVATE_KEY || '',
    process.env.OPENAI_KEY || '',
    process.env.OOBE_KEY || '',
  )

  const oobe = new OobeCore(configManager.getDefaultConfig())
  oobe.start();

  AgentExecution(oobe);
}

main();
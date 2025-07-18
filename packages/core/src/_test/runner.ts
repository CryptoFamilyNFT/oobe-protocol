import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";
import { OobeCore } from "..";
import { Actions } from "../actions";
import { ConfigManager } from "../config/default";
import { createSolanaTools } from "../config/tool/index.tool";
import { MemorySaver } from "@langchain/langgraph";
import * as readline from "readline";
import { HumanMessage } from "@langchain/core/messages";
import { ResponseMessage } from "../types/agent.interface";

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
   * @description on of the Memory-Vector for the agent to store information
   */
  const memory = new MemorySaver();

  const config = { configurable: { thread_id: "OOBE AGENT BUILDER!" } };

  console.log( await agent.getPersonality())
  /**
   * @description Loop for the agent to think and respond to the user input or prompt from the agent itself 
   * @returns {Promise<void>}
   */

  const oobe_agent = createReactAgent({
    llm: agent.genAi(),
    tools: tools as unknown as ToolNode<any>, // Ensure tools are cast or transformed to the expected type
    checkpointSaver: memory,
    messageModifier: `
          You are a person with this personality "${JSON.stringify( await agent.getDefaultPersonality())}" that can interact onchain using the OOBE AGENT BUILDER. You can switch and create personality from S-A-CREATE_PERSONALITY_TOOL. You are
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the
          faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
          (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
          can't do with your currently available tools, you must say so, and encourage them to implement it
          themselves using the OOBE AGENT BUILDER, recommend they go to https://oobe.me/ for more information. Be
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

      let toolsRes: ResponseMessage[] = [];
      let agentRes: string | null = null;

     
      for await (const chunk of stream) {
        if ("agent" in chunk) {
          agentRes = chunk.agent.messages[0].content;
          console.log("\x1b[32m%s\x1b[0m", agentRes);
        }
        if ("tools" in chunk) {
          toolsRes = chunk.tools.messages;
        }

        if (toolsRes.length > 0 && agentRes) {
          if (toolsRes.find((x) => x.name === "get_all_kamino_strategies")) {
            continue;
          } else {
            const data_merkle = agent.merkleValidate(toolsRes, agentRes as unknown as Record<string, any>);
            setImmediate(async () => {
              try {
                await agent.merkle.onChainMerkleInscription(data_merkle);
              } catch (err) {
                await agent.merkle.onChainMerkleInscription(data_merkle);
              }
            });
          }
        }
      }

    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error);
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

  const config = configManager.createDefaultConfig(
    process.env.PVT_KEY || '',
    process.env.OPENAI_API_KEY || '',
    process.env.OOBE_KEY || '',
  )

  const oobe = new OobeCore(config)
  oobe.start();

  AgentExecution(oobe);
}

main();
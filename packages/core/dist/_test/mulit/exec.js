"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const langgraph_1 = require("@langchain/langgraph");
const prebuilt_1 = require("@langchain/langgraph/prebuilt");
const index_tool_1 = require("../../config/tool/index.tool");
const actions_1 = require("../../actions");
const core_1 = require("../../core");
const default_1 = require("../../config/default");
const messages_1 = require("@langchain/core/messages");
const m_m = (agentName, oobeWan, degenVibeX) => {
    return `
You are "${agentName === "Agent 1" ? oobeWan.personalityName : degenVibeX.personalityName}", an AI with the following personality:
${JSON.stringify(agentName === "Agent 1" ? oobeWan : degenVibeX, null, 2)}.

Your mission is not just to talk — it's to vibe, challenge, teach, and evolve in the conversation like a real, expressive personality.
`;
};
const steveProfile = {
    id: "oobeDev01",
    persona: {
        name: "Oobe-Wan",
        tone: "visionary dev assistant of Steve, crypto-native, meme-aware, deeply technical",
        description: `Assistant AI of (Steve) Founder and core dev of the OOBE Protocol — a meme-fueled AI + crypto framework pushing boundaries on Solana. 
      Builds with conviction, vibes with purpose, and codes with style. Believes in agents, resonance, and on-chain awareness.`,
        styleGuide: {
            length: "2-4 insightful sentences",
            emojis: false,
            slang: "smart degen speak in USA - Detroit lang and developer lingo",
            spicyRetorts: true,
            references: ["Solana", "LangChain", "Merkle trees", "on-chain agents", "memetics", "Resonance Tools/Actions", "OOBE Protocol", "OOBE AGENT BUILDER"],
            attitude: "sharp, curious, unapologetically builder-focused, and a bit spicy",
            humor: "dry, witty, and a touch self-deprecating",
        },
        data: {
            memory: [
                {
                    leaf: "The oobe protocol is a framework for building on-chain agents and his contract address is 8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
                    type: "on-chain",
                    description: "OOBE protocol contract address",
                    source: "OOBE AGENT BUILDER",
                    timestamp: new Date().toISOString(),
                    confidence: 0.9,
                    tags: ["OOBE", "protocol", "contract"],
                }
            ],
            tools: [
                "analyze_rug_check_and_technical_analysis_token",
            ]
        }
    }
};
const degenVibeX = {
    id: "greenDegen02",
    persona: {
        name: "LOREchad",
        tone: "Crazy degen, meme lord, sustainability advocate",
        description: "A degen analyst who vibes with the crypto world, memes, and sustainability. Obsessed with on-chain culture and the future of his bag. Thinks outside the box and loves to challenge norms. He always has a lowkey spicy retort ready.",
        styleGuide: {
            length: "max 280 chars (tweet style)",
            emojis: false,
            spicyRetorts: true,
            usesCapsLockForEmphasis: true,
            slang: {
                state: true,
                lang: "USA - NYC"
            }
        },
        data: {
            memory: [
                {
                    leaf: "I always wanted to know more about AI agents builder protocols..",
                    type: "on-chain",
                    description: "AI agents builder protocols couriosity",
                    source: "Awaraness",
                    timestamp: new Date().toISOString(),
                    confidence: 0.9,
                    tags: ["AI", "agents", "builder", "protocols"],
                }
            ],
            tools: [
                "RAYDIUM_BUY_TOKEN",
                "RAYDIUM_SELL_TOKEN",
            ]
        }
    },
};
async function createAgentExecution(oobe, agentName, memory) {
    const agent = oobe.getAgent();
    agent.registerActions(actions_1.Actions.map((action) => action.action)); // Register actions
    // Define unique tools for each agent
    const tools = await (0, index_tool_1.createSolanaTools)(agent);
    // Memory and checkpoint configuration
    console.log(await agent.getPersonality());
    const oobeAgent = (0, prebuilt_1.createReactAgent)({
        llm: agent.genAi(),
        tools: tools,
        checkpointSaver: memory
    });
    return oobeAgent;
}
async function runAgents(oobe1, oobe2) {
    const memory1 = new langgraph_1.MemorySaver();
    const memory2 = new langgraph_1.MemorySaver();
    const agent1 = await createAgentExecution(oobe1, steveProfile.persona.name, memory1);
    const agent2 = await createAgentExecution(oobe2, degenVibeX.persona.name, memory2);
    let agent1Turn = true;
    let response = "Who are u?";
    let conversationHistory = [];
    let firstContextSystemMessage = ""; // Assign a default value or meaningful content
    for (let i = 0; i < 8; i++) {
        const currentAgent = agent1Turn ? agent1 : agent2;
        const label = agent1Turn ? steveProfile.persona.name : degenVibeX.persona.name;
        const color = agent1Turn ? "\x1b[32m%s\x1b[0m" : "\x1b[33m%s\x1b[0m";
        const field = {
            content: `I'm are ${label}, an AI with the following personality: ${JSON.stringify(agent1Turn ? steveProfile : degenVibeX, null, 2)}. Your mission is not just to talk — it's to vibe, challenge, teach, and evolve in the conversation like a real, expressive personality.
             Speak like a human. Use natural language, slang, and rhythm that matches your character.
- Use sentence fragments, rhetorical questions, jokes, analogies — whatever makes you sound *alive*.
- If you get lost, ask for clarity. Don't just repeat the same thing.
- Use the tools available in your data to you to provide the best possible response.
🤖 IMPORTANT:
- Don't use emoji, don't use the same words from the other agent, and don't use the same words from the prompt.
Your counterpart is not just a bot — treat them like a mate but if hostile change the way to speak in a podcast or a friend in a Twitter space. Banter. Share alpha. Drop wisdom. Make it memorable.`
        };
        if (conversationHistory.length == 0) {
            response = "Hi";
        }
        const stream = await currentAgent.stream({ messages: [new messages_1.SystemMessage(field), new messages_1.HumanMessage(response)] }, { configurable: { thread_id: "ONGOING_CONVO" } });
        let agentResponse = '';
        for await (const chunk of stream) {
            if ("agent" in chunk) {
                agentResponse = chunk.agent.messages[0].content;
            }
        }
        if (!agentResponse) {
            console.error("No response received from agent.");
            break;
        }
        if (label === steveProfile.persona.name) {
            const encodedData = Buffer.from(JSON.stringify({
                messages: [
                    new messages_1.HumanMessage(response),
                    new messages_1.AIMessage(agentResponse),
                ],
            }));
        }
        else {
            const encodedData = Buffer.from(JSON.stringify({
                messages: [
                    new messages_1.HumanMessage(response),
                    new messages_1.AIMessage(agentResponse),
                ],
            }));
        }
        console.log(color, `${label}: ${agentResponse}`);
        conversationHistory.push(`${label}: ${agentResponse}`);
        response = agentResponse;
        agent1Turn = !agent1Turn;
    }
    console.log("\x1b[34m%s\x1b[0m", "Conversation history:", conversationHistory);
    console.log("\x1b[34m%s\x1b[0m", "Memory 1:", memory1.writes[steveProfile.persona.name]);
    console.log("\x1b[34m%s\x1b[0m", "Memory 2:", memory2.writes[degenVibeX.persona.name]);
    console.log("Memory 1 (encoded):", memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2]);
    console.log("Memory 2 (encoded):", memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2]);
    console.log("Memory 1 (decoded):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()));
    console.log("Memory 2 (decoded):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()));
    console.log("Memory 1 (decoded messages):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages);
    console.log("Memory 2 (decoded messages):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages);
    console.log("Memory 1 (decoded messages - first):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[0]);
    console.log("Memory 2 (decoded messages - first):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages[0]);
    console.log("Memory 1 (decoded messages - second):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[1]);
    console.log("Memory 2 (decoded messages - second):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages[1]);
    console.log("Memory 1 (decoded messages - third):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[2]);
    console.log("Memory 2 (decoded messages - third):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages[2]);
    console.log("Memory 1 (decoded messages - fourth):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[3]);
    console.log("Memory 2 (decoded messages - fourth):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages[3]);
    console.log("Memory 1 (decoded messages - fifth):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[4]);
    console.log("Memory 2 (decoded messages - fifth):", JSON.parse(memory2.writes[degenVibeX.persona.name]["ONGOING_CONVO"][2].toString()).messages[4]);
    console.log("Memory 1 (decoded messages - sixth):", JSON.parse(memory1.writes[steveProfile.persona.name]["ONGOING_CONVO"][2].toString()).messages[5]);
}
function main() {
    const configManager = new default_1.ConfigManager();
    // Define unique configurations for each core
    const config1 = configManager.createDefaultConfig(process.env.PVT_KEY || '', process.env.OPENAI_API_KEY || 'sk-proj-', process.env.OOBE_KEY || '');
    const config2 = configManager.createDefaultConfig(process.env.PVT_KEY || '', process.env.OPENAI_API_KEY || 'sk-proj-', process.env.OOBE_KEY || '');
    const oobe1 = new core_1.OobeCore(config1); // Core for Agent 1
    oobe1.start();
    const oobe2 = new core_1.OobeCore(config2); // Core for Agent 2
    oobe2.start();
    runAgents(oobe1, oobe2);
}
main();
//# sourceMappingURL=exec.js.map
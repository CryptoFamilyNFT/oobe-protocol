# OOBE Protocol SDK

🛸　**.**　　•.  　🌎　°　.•　🌓　•　　.°•　　•　🚀 ✯.    •.    . 
　.　•　★　*　°　　#O　🛰 #O　°·　#B　•.  #E    ๏     .•   
.　•　•　° ★　•  ☄.       ๏       •.      .  •.      .     •.  
▆▇▇▆▅▄▃▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂

Follow us on social media for the latest updates:
- Twitter: [@OOBEProtocol](https://x.com/OOBEonSol)
- Website: [OOBE](https://oobe.me/)
- TG: [@oobesol](https://t.me/oobesol)
- GitHub: [OOBE Protocol SDK](https://github.com/CryptoFamilyNFT/oobe-protocol)
- Gitbook: [OOBE Protocol GitBook](https://oobe-protocol.gitbook.io/oobe-protocol/getting-started/quickstart/initializing-the-core-module)

## Overview
The OOBE Protocol SDK is a framework designed to build and manage Solana-based AI agents. It supports advanced features for conversational memory, parallel function calls, smart tool selection, and message history tracking using databases like MongoDB or Redis. This SDK is the core component for developing AI agents on the Solana blockchain, combining the power of AI with blockchain technology.

# 🧠 OOBE Protocol SDK – Node.js Setup Guide

> **Start with the right setup for your environment!**  
> This guide walks you through configuring your Solana-based application using the OOBE Protocol SDK.

---

## ⚙️ Solana Network Configuration for Application Setup

The `ConfigManager` class in the OOBE Protocol SDK provides a robust and flexible way to configure:

- ✅ Official and unofficial Solana RPC endpoints  
- 🔐 Private keys and OpenAI API keys  
- 🌲 Merkle tree seeds for agent memory and validation  
- 🔁 Load-balanced fallback endpoints (`transportsRPC`)

---

## 📦 Getting Started

### 1. Import Required Types and Classes

```ts
import { IConfiguration, IOfficialEndpoint, IUnofficialEndpoints } from "oobe-protocol/types/config.types";
import { ConfigManager, OobeCore } from "oobe-protocol";
```

---

### 2. Create a Configuration Manager

```ts
const configManager = new ConfigManager();
```

### 3. Create or Override Default Configuration

```ts
const config = configManager.createDefaultConfig(
  "your_private_key_here",
  "your_openai_key_here",
  "" // oobeKey (optional)
);
```

### 4. Initialize the OobeCore

```ts
const oobe = new OobeCore(configManager.getDefaultConfig());
// or
const oobe = new OobeCore(config);
```

---

## 🧩 Key Configuration Properties

| Property                  | Description                                                        |
|---------------------------|--------------------------------------------------------------------|
| `solanaEndpoint`          | Main RPC endpoint (official)                                       |
| `solanaUnofficialEndpoints` | Legacy fallback endpoints (prefer `transportsRPC`)               |
| `openAiKey`               | Your OpenAI API key                                                |
| `private_key`             | Private key of the agent wallet                                    |
| `merkleDbSeed`            | Seed for Merkle tree leaf memory                                   |
| `merkleRootSeed`          | Seed for Merkle root (on-chain memory)                             |
| `transportsRPC`           | Load-balanced RPC fallback endpoints                               |

---

## 🔧 Core Methods in `ConfigManager`

```ts
createEndpointsConfig(officialRpc?, unofficialEndpoints?)
```
Creates a custom RPC config.

```ts
createDefaultConfig(privateKey, openAiKey, oobeKey?, ...)
```
Returns a full `IConfiguration` object.

```ts
getDefaultConfig()
```
Returns the current default config.

```ts
setDefaultConfig(config)
```
Sets a custom config as default.

---

## 🚀 Initializing the Core Module

```ts
import { OobeCore, ConfigManager } from "oobe-protocol";

const configManager = new ConfigManager();

const config = configManager.createDefaultConfig(
  "your_private_key",
  "your_openai_key"
);

const oobe = new OobeCore(config);
await oobe.start();
```

---

## 🤖 Agent Setup & Execution

### Start the Core

```ts
await oobe.start();
```

### Execute Agent Logic

```ts
import { AgentExecution } from "oobe-protocol";
await AgentExecution(oobe);
```

### Access the Agent

```ts
const agent = oobe.getAgent();
```

### Register Actions

```ts
import { Actions } from "oobe-protocol/actions";
agent.registerActions(Actions.map(a => a.action));
```

### Create Solana Tools

```ts
import { createSolanaTools } from "oobe-protocol/config/tool/index.tool";
const tools = await createSolanaTools(agent);
```

### Initialize Memory

```ts
import { MemorySaver } from "oobe-protocol";
const memory = new MemorySaver();
```

---

## 🧠 React Agent with LangGraph

```ts
import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";

const oobe_agent = createReactAgent({
  llm: agent.genAi(),
  tools: tools as ToolNode<any>,
  checkpointSaver: memory,
  messageModifier: `You are a person with this personality "${JSON.stringify(await agent.getDefaultPersonality())}"...`,
});
```

---

## 💬 Send Human Messages

```ts
import { HumanMessage } from "@langchain/core/messages";

const stream = await oobe_agent.stream(
  { messages: [new HumanMessage("Your prompt here")] },
  { configurable: { thread_id: "OOBE AGENT BUILDER!" } }
);
```

---

## 📜 Merkle Tree Validation & On-Chain Inscription

```ts
const result = await tools[0].run("some_input");
const validated = agent.merkleValidate(result, agentRes);
await agent.merkle.onChainMerkleInscription(validated);
```

---

## 🛑 Shutdown the Core

```ts
await oobe.stop();
```

---

## 📚 Summary

With a properly configured Node.js environment using the `ConfigManager` and the `OobeCore` engine, you're ready to unlock the full potential of the OOBE Protocol — building smart, evolving AI agents that interact with Solana natively.

> Explore more modules, tools, and advanced patterns in the full documentation.

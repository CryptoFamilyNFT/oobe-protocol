# OOBE Protocol SDK

🛸　**.**　　•.  　🌎　°　.•　🌓　•　　.°•　　•　🚀 ✯.    •.    .  •. 
　.　•　★　*　°　  　.　#O　🛰 #O　°·　#B　•.  #E    ๏     .•   🪐  .
.　•　•　° ★　•  ☄.       ๏       •.      .  •.      .     •.      .
▁▂▃▄▅▆▇▇▆▅▄▃▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂▃▄▆▇▇▆▅▄▇▆▅▄▃▁▂▆▇▆▅▄▇▆▅▄▃▁▂

Follow us on social media for the latest updates:
- Twitter: [@OOBEProtocol](https://x.com/OOBEonSol)
- Website: [OOBE](https://oobe.me/)
- TG: [@oobesol](https://t.me/oobesol)
- GitHub: [OOBE Protocol SDK](https://github.com/CryptoFamilyNFT/oobe-protocol)

## Overview
The OOBE Protocol SDK is a framework designed to build and manage Solana-based AI agents. It supports advanced features for conversational memory, parallel function calls, smart tool selection, and message history tracking using databases like MongoDB or Redis. This SDK is the core component for developing AI agents on the Solana blockchain, combining the power of AI with blockchain technology.

### Features
-[IN-PROGRESS] **AI Agent Persona**: Manage different AI agent personas with conversational memory and smart tool usage.
- **Solana Integration**: Leverage the Solana blockchain for decentralized applications.
- **Parallel Function Calls**: Execute multiple functions simultaneously for increased efficiency.
- **Message History**: Track and store message history to build intelligent agents with memory.
-[IN-PROGRESS] **Database Support**: Integrates with MongoDB and Redis for memory management.

AI Agents: Capable of conversational memory, decision-making, and seamless tool integration.

Decentralized Application (DApp): Web3 App to manage your agents in a simple UI [oobe].

Customizable AI Personas: Tailored to specific use cases, from customer support to automated trading.

NFT Collections: Facilitating the creation and management of unique digital assets.

Futures Trading: Using the Adrena protocol to execute advanced trading strategies.

SPL Tokens and PumpFun Tokens: Simplifying the creation of on-chain assets.

Market Making and Volume Functionality: Enabling dynamic market strategies and volume optimization.

Real-time Code Exec: Enhance the ability to execute real-time code based on Zod schemas.

Additionally, the protocol supports all on-chain functions available on Solana, making it a comprehensive tool for blockchain integration.

## Protocol Structure
The OOBE Protocol is divided into three core modules:

- **Core**: The foundational module, exclusively integrated with OOBE’s proprietary technology. It serves as the central hub for all protocol functionalities.
- **Desktop**: Designed for backend applications, this module supports development with Node.js, offering robust capabilities for server-side implementations.
- **React**: A frontend module tailored for integrating OOBE Protocol seamlessly into web applications.

## Who is this for?
OOBE Protocol is designed for:

- **Blockchain Developers**: Building decentralized apps with AI components.
- **AI Enthusiasts**: Creating intelligent systems with ease.
- **Innovators**: Merging AI and blockchain for revolutionary solutions.

## What is OOBE Protocol?
OOBE Protocol is an SDK developed to provide a straightforward and secure interface for interacting with the OOBE ecosystem for creating and managing AI Agents on-chain. It consists of three packages: **core, desktop, and react**.

## Solana Network Configuration for Application Setup
This document describes the initial setup process for configuring network settings in a Solana-based application. Following these guidelines ensures that your application environment is prepared correctly with the necessary configurations.

By default, configuration constants include pre-set values. However, you can customize these defaults using the `createDefaultConfig` method from the `ConfigManager` class. This function allows you to tailor the configuration by providing specific values for `privateKey`, `openAiKey`, `oobeKey`, and optionally `solanaEndpoint`, `solanaUnofficialEndpoints`, and `solanaExplorer`. It returns an `IConfiguration` object with your specified values or the default ones if none are provided.

### Configuration Manager Implementation
```typescript
import { IConfiguration, IOfficialEndpoint, ISolanaEndpoint, IUnofficialEndpoints } from "./types/config.types";

class ConfigManager {
    private endpointsConfig: ISolanaEndpoint;
    private defaultConfig: IConfiguration;

    constructor() {
        this.endpointsConfig = {
            official: {
                rpc: "https://api.mainnet-beta.solana.com"
            },
            unOfficial: [
                {
                    name: "GenesysGo",
                    rpc: "https://ssc-dao.genesysgo.net",
                },
                {
                    name: "Project Serum",
                    rpc: "https://solana-api.projectserum.com",
                },
                {
                    name: "Triton",
                    rpc: "https://rpc.triton.one",
                }
            ]
        };

        this.defaultConfig = {
            solanaEndpoint: this.endpointsConfig.official as IOfficialEndpoint,
            solanaUnofficialEndpoints: this.endpointsConfig.unOfficial as IUnofficialEndpoints[],
            solanaExplorer: "https://explorer.solana.com",
            private_key: process.env.PRIVATE_KEY ?? "",
            openAiKey: process.env.OPENAI_KEY ?? "",
        };
    }

    public createEndpointsConfig(officialRpc?: string, unofficialEndpoints?: { name: string, rpc: string }[]): ISolanaEndpoint {
        return {
            official: {
                rpc: officialRpc || this.endpointsConfig.official.rpc
            },
            unOfficial: unofficialEndpoints || this.endpointsConfig.unOfficial
        } as ISolanaEndpoint;
    }

    public createDefaultConfig(
        privateKey: string,
        openAiKey: string,
        solanaEndpoint?: IOfficialEndpoint,
        solanaUnofficialEndpoints?: IUnofficialEndpoints[],
        solanaExplorer?: string,
    ): IConfiguration {
        return {
            solanaEndpoint: solanaEndpoint || this.endpointsConfig.official,
            solanaUnofficialEndpoints: solanaUnofficialEndpoints ?? this.endpointsConfig.unOfficial ?? [],
            solanaExplorer: solanaExplorer ?? this.defaultConfig.solanaExplorer ?? "",
            private_key: privateKey,
            openAiKey: openAiKey,
        };
    }

    public getDefaultConfig(): IConfiguration {
        return this.defaultConfig;
    }

    public setDefaultConfig(config: IConfiguration): void {
        this.defaultConfig = config;
    }
}
```

## OobeCore Initialization and Usage
The `OobeCore` class is a central component in our project, responsible for managing the core functionalities of the `oobe-protocol` system.

### Initialization
```typescript
import { OobeCore, configManager, IConfiguration } from "oobe-protocol";

const config: IConfiguration = {...}

const overrideDefConfig = configManager.createDefaultConfig(config);
  
const oobe = new OobeCore(configManager.getDefaultConfig()) || new OobeCore(overrideDefConfig);
```

### Usage

#### Starting OobeCore
```typescript
await oobe.start();
```

#### Creating an Oobe Agent
```typescript
const oobeAgent = await oobe.CreateOobeAgent(genAi, tools, memory, messageModifier);
```

#### Accessing Memory
```typescript
const memorySaver = await oobe.AccessMemory();
```

#### Sending a Human Message
```typescript
oobe.AgentHumanMessage("Find a good ticker with a good marketcap and traded til 10k tp");
```

#### Stopping OobeCore
```typescript
await oobe.stop();
```

#### Getting the Agent
```typescript
const agent = await oobe.getAgent();
```

## Learn More
For a complete guide, visit our GitBook: [OOBE Protocol GitBook](https://oobe-protocol.gitbook.io/oobe-protocol/getting-started/quickstart/initializing-the-core-module)


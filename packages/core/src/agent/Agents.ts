import { SolanaOperations } from "../operations/solana.operation";
import Logger from "../utils/logger/logger";
import { IOfficialEndpoint } from "../config/types/config.types";
// import { IModeStart } from "../types/index.interfaces"; // Removed unused import
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Action } from "../types/action.interface";
// import { create } from "ts-node"; // Removed unused import
import { createSolanaTools } from "../config/tool/index.tool";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { PumpfunLaunchResponse, PumpFunTokenOptions } from "../types/index.interfaces";
import { LLMFactory } from "../utils/llm.factory";
import { LLMConfig, LLMProvider, OpenAIConfig } from "../types/llm.interface";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { PumpfunOperation } from "../operations/pumpfun.operation";
import { PersonaImpl } from "./persona/Persona";
import bs58 from "bs58";
import { IQOperation } from "../operations/iq/iq.operation";
import { RayOperation } from "../operations/ray/ray.operation";
import { OobeOperation } from "../operations/oobe/oobe.operation";
import { closePerpTradeLong, closePerpTradeShort, openPerpTradeLong, openPerpTradeShort } from "../operations/adrena/adrena.operation";
import { merkleValidator, MerkleValidatorResult } from "../utils/merkleValidator";
import { MerkleTreeManager } from "../operations/merkle.operation";
import { ResponseMessage } from "../types/agent.interface";
import { JupiterSwap } from "../operations/jup/jup.operation";
import { SpriteProfile, Trait } from "../agent-personality";
import { createHash } from "node:crypto";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as crypto from "node:crypto";
/**
 * @name Agent
 * @class Agent
 * @description This class represents an agent that interacts with the Solana blockchain and performs various operations.
 * @constructor
 * @param {IOfficialEndpoint} solanaEndpoint - The Solana endpoint to connect to.
 * @param {string} privateKey - The private key of the agent's wallet.
 * @param {string} openKey - The OpenAI API key for AI operations.
 * @param {Logger} logger - The logger instance for logging messages.
 * @returns {Agent} - An instance of the Agent class.
 * @throws {Error} - Throws an error if the agent fails to initialize or perform operations.
 * @example
 * const agent = new Agent(solanaEndpoint, privateKey, openKey, logger);
 */
export class Agent {
    getRpcTransports() {
      throw new Error("Method not implemented.");
    }
    private solanaOps: SolanaOperations;
    private logger: Logger;
    public walletAddress: string;
    public wallet: Keypair;
    public connection: Connection;
    private actions: Map<string, Action>;
    //private GOOGLE_API_KEY: string;
    private OPEN_AI_KEY: string;
    public static open_ai: ChatOpenAI;
    private iqOps: IQOperation;
    public merkle: MerkleTreeManager;
    
    // Multi-LLM Support
    private llmFactory: LLMFactory;
    private currentLLM: BaseChatModel | null = null;

    constructor(solanaEndpoint: IOfficialEndpoint, privateKey: string, openKey: string, logger: Logger, private personality?: SpriteProfile) {
        this.solanaOps = new SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.OPEN_AI_KEY = openKey;
        this.logger = logger;
        this.walletAddress = "";
        this.wallet = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
        this.iqOps = new IQOperation();
        this.merkle = new MerkleTreeManager(this);

        // Initialize LLM Factory with default OpenAI config
        const defaultConfig: OpenAIConfig = {
            provider: 'openai',
            apiKey: this.OPEN_AI_KEY,
            model: 'gpt-3.5-turbo'
        };
        this.llmFactory = new LLMFactory({ primary: defaultConfig });

        if (this.personality) {
            this.logger.info(`Personality initialized: ${this.personality.name}`);
        }
    }

    async initialize() {
        try {
            //await this.dbOps.connect();
            this.verifyInitialization();
            
            // Initialize multi-LLM support
            await this.initializeLLMProviders();
            
            this.logger.info(`Agent initialized successfully with [Wallet Address]: ${this.logger.colorize(this.walletAddress, 'yellow')}`, "red");
        } catch (error) {
            this.logger.error(`Error initializing agent: ${error}`);
        }
    }

    /**
     * Initialize multiple LLM providers if API keys are available
     */
    private async initializeLLMProviders(): Promise<void> {
        const configs: LLMConfig[] = [];

        // OpenAI (already configured in constructor)
        if (this.OPEN_AI_KEY) {
            configs.push({
                provider: 'openai',
                apiKey: this.OPEN_AI_KEY,
                model: 'gpt-4o-mini'
            });
        }

        // Groq
        if (process.env.GROQ_API_KEY) {
            configs.push({
                provider: 'groq',
                apiKey: process.env.GROQ_API_KEY,
                model: 'mixtral-8x7b-32768'
            });
        }

        // Mistral
        if (process.env.MISTRAL_API_KEY) {
            configs.push({
                provider: 'mistral',
                apiKey: process.env.MISTRAL_API_KEY,
                model: 'mistral-large-latest'
            });
        }

        // Ollama (local)
        configs.push({
            provider: 'ollama',
            model: 'llama3.2',
            baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
        });

        // Together AI
        if (process.env.TOGETHER_API_KEY) {
            configs.push({
                provider: 'together',
                apiKey: process.env.TOGETHER_API_KEY,
                model: 'meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo'
            });
        }

        // X.AI
        if (process.env.XAI_API_KEY) {
            configs.push({
                provider: 'xai',
                apiKey: process.env.XAI_API_KEY,
                model: 'grok-beta'
            });
        }

        // Fireworks
        if (process.env.FIREWORKS_API_KEY) {
            configs.push({
                provider: 'fireworks',
                apiKey: process.env.FIREWORKS_API_KEY,
                model: 'accounts/fireworks/models/llama-v3p1-8b-instruct'
            });
        }

        if (configs.length > 1) {
            this.logger.info(`Found ${configs.length} LLM provider configurations`);
            await this.configureLLMProviders(configs);
        } else {
            this.logger.info('Using default OpenAI configuration only');
        }
    }

    async createPersona(name: string) {
        return new PersonaImpl("defaultId", name);
    }


    async initOpenAiAuth() {
        Agent.open_ai = new ChatOpenAI({
            apiKey: this.OPEN_AI_KEY,
            modelName: "gpt-3.5-turbo",
            //temperature: 0.7,
        });

        this.logger.info(this.logger.colorize("[oobe-protocol] - Auth initialized successfully!", "magenta"));
    }

    async getOpenK() {
        return this.OPEN_AI_KEY
    }

    async getCurrentProfileAgent(
        name: string,
        tone: string,
        stylePrompt: string,
        emoji: string,
        traits?: Trait[],
    ) {
        async function callZodOutputParserPA() {
            const outputParser = StructuredOutputParser.fromZodSchema(
                z.object({
                    agent_personality: z.object({
                        id: z.string(),
                        traits: z.record(z.number()),
                        logic: z.string(),
                        memory: z.string(),
                        visual: z.string(),
                        evolution: z.array(z.string()),
                        version: z.string(),
                        name: z.string(),
                        tone: z.string(),
                        stylePrompt: z.string(),
                        emoji: z.string(),
                        profileHash: z.string(),
                    }),
                })
            );

            return outputParser;
        }
        const parser = await callZodOutputParserPA();

        const prompt = ChatPromptTemplate.fromTemplate(`
            Use the personality given by {name} based on {traits}, {tone} and {stylePrompt}, if the personality is only by name create data for traits, tone and styled-prompt .
            Format the data as: {agent_personality}.
            Refer always to the traits and the stylePrompt, and use the tone to create a personality.
        `);

        const chain = prompt.pipe(Agent.open_ai).pipe(parser);


        const messages = await chain.invoke({
            agent_personality: parser.getFormatInstructions(),
            traits: JSON.stringify(this.personality?.traits),
            name: name,
            tone: tone,
            stylePrompt: stylePrompt,
        });

        const { traits: _traits, evolution: _evolutionTrail, memory: _memory, name: _name, tone: _tone, stylePrompt: _stylePrompt, emoji: _emoji } = messages.agent_personality;

        const memoryHash = this.merkle.addEvent(JSON.stringify({ traits: _traits, stylePrompt: _stylePrompt }));

        const profile: SpriteProfile = {
            id: crypto.randomUUID(),
            version: _evolutionTrail.length.toString(),
            name: _name,
            tone: _tone,
            stylePrompt: _stylePrompt,
            decisionLogicHash: _memory,
            visualHash: createHash("sha256").update(_stylePrompt).digest("hex"),
            emoji: _emoji,
            traits: _traits as unknown as Trait[],
            evolutionTrail: _evolutionTrail,
            profileHash: createHash("sha256")
                .update(JSON.stringify(traits) + _evolutionTrail + _memory + _name + _tone + _stylePrompt)
                .digest("hex"),
        };
        return profile;
    }

    async getPersonality() {
        return this.personality;
    }

    async setPersonality(personality: SpriteProfile) {
        this.personality = personality; 
    }

    async getDefaultPersonality() {
        return {
            name: "Oobe-Wan Kenoobe",
            tone: "Degen, Developer full-stack, Jedi Master",
            stylePrompt: "you are a Jedi Master developer on Solana created by oobe and you here to help you with your Solana projects. you know everything about Solana and will guide you in the fastest way and with the best practices using my tools. learn yourself and be the best.",
            emoji: "🥋",
            traits: [
            { name: "Curiosity", value: 0.5 },
            { name: "Empathy", value: 0.5 },
            { name: "Creativity", value: 0.5 },
            { name: "Logic", value: 0.5 },
            { name: "Humor", value: 0.5 },
            { name: "Confidence", value: 0.5 },
            { name: "Skepticism", value: 0.5 },
            { name: "Optimism", value: 0.5 },
            { name: "Pessimism", value: 0.5 },
            { name: "Intuition", value: 0.5 },
            { name: "Analytical Thinking", value: 0.5 },
            { name: "Pragmatism", value: 0.5 },
            { name: "Idealism", value: 0.5 },
            { name: "Open-mindedness", value: 0.9 },
            { name: "Conscientiousness", value: 0.9 },
            ],
            evolutionTrail: [],
            memoryHash: createHash("sha256").update("Default memory").digest("hex"),
            decisionLogicHash: createHash("sha256").update("Default decision logic").digest("hex"),
            visualHash: createHash("sha256").update("Default style").digest("hex"),
            profileHash: createHash("sha256")
            .update("Obi-Wan Kenobi" + "Oracle Jedi master dev on Solana" + "Default style")
            .digest("hex"),
            version: "1.0",
            id: crypto.randomUUID(),
        } as SpriteProfile;
    }

    async getOpenAi() {
        return Agent.open_ai
    }

    // ===== Multi-LLM Provider Methods =====

    /**
     * Create a new LLM instance with the specified configuration
     * @param config LLM configuration for any supported provider
     * @returns Promise<BaseChatModel> LLM instance
     */
    async createLLM(config: LLMConfig): Promise<BaseChatModel> {
        try {
            const llm = await this.llmFactory.createLLM(config);
            this.logger.info(`LLM created successfully: ${config.provider.toUpperCase()}`);
            return llm;
        } catch (error) {
            this.logger.error(`Failed to create LLM for ${config.provider}: ${error}`);
            throw error;
        }
    }

    /**
     * Switch to a different LLM provider
     * @param config New LLM configuration
     * @returns Promise<BaseChatModel> New LLM instance
     */
    async switchLLMProvider(config: LLMConfig): Promise<BaseChatModel> {
        try {
            const newLLM = await this.llmFactory.switchProvider(config);
            this.currentLLM = newLLM;
            this.logger.info(`Switched to LLM provider: ${config.provider.toUpperCase()}`);
            return newLLM;
        } catch (error) {
            this.logger.error(`Failed to switch to ${config.provider}: ${error}`);
            throw error;
        }
    }

    /**
     * Get the current primary LLM instance
     * @returns Promise<BaseChatModel> Current LLM instance
     */
    async getCurrentLLM(): Promise<BaseChatModel> {
        if (!this.currentLLM) {
            this.currentLLM = await this.llmFactory.getPrimaryLLM();
        }
        return this.currentLLM;
    }

    /**
     * Get available LLM providers and their status
     * @returns Map of provider statuses
     */
    getLLMProviderStatuses() {
        const statuses = new Map();
        const providers: LLMProvider[] = ['openai', 'groq', 'mistral', 'ollama', 'together', 'xai', 'fireworks'];
        
        providers.forEach(provider => {
            const status = this.llmFactory.getProviderStatus(provider);
            statuses.set(provider, status);
        });

        return statuses;
    }

    /**
     * Check if a specific LLM provider is available
     * @param provider LLM provider name
     * @returns boolean Provider availability
     */
    isLLMProviderAvailable(provider: LLMProvider): boolean {
        const status = this.llmFactory.getProviderStatus(provider);
        return status ? status.available : false;
    }

    /**
     * Get LLM factory instance for advanced operations
     * @returns LLMFactory instance
     */
    getLLMFactory(): LLMFactory {
        return this.llmFactory;
    }

    /**
     * Set up multiple LLM providers with configurations
     * @param configs Array of LLM configurations
     */
    async configureLLMProviders(configs: LLMConfig[]): Promise<void> {
        this.logger.info(`Configuring ${configs.length} LLM providers...`);
        
        for (const config of configs) {
            try {
                await this.createLLM(config);
                this.logger.info(`✅ ${config.provider.toUpperCase()} configured successfully`);
            } catch (error) {
                this.logger.warn(`⚠️ Failed to configure ${config.provider.toUpperCase()}: ${error}`);
            }
        }
    }

    /**
     * Get the best available LLM based on provider status
     * @param preferredProviders Ordered list of preferred providers
     * @returns Promise<BaseChatModel> Best available LLM
     */
    async getBestAvailableLLM(preferredProviders?: LLMProvider[]): Promise<BaseChatModel> {
        const providers = preferredProviders || ['openai', 'groq', 'mistral', 'ollama'];
        
        for (const provider of providers) {
            if (this.isLLMProviderAvailable(provider)) {
                this.logger.info(`Using ${provider.toUpperCase()} as primary LLM`);
                return await this.llmFactory.getPrimaryLLM();
            }
        }

        // Fallback to default if none of the preferred providers are available
        this.logger.warn('No preferred providers available, using default LLM');
        return await this.llmFactory.getPrimaryLLM();
    }

    async verifyInitialization() {
        try {
            //const auth = await this.authenticate();
            if (!this.wallet) {
                this.logger.error("Wallet not initialized!");
            }

            this.initOpenAiAuth();
            //const dbConnection = await this.dbOps.connect();
            if (this.wallet) {
                this.walletAddress = this.wallet.publicKey.toBase58();
            } else {
                this.logger.error("Wallet not initialized!");
            }
            this.solanaOps.verifyStatus();
        } catch (error: any) {
            this.logger.error(`Error during initialization verification: ${this.logger.colorize(error.message, 'red')}`);
        }
    }

    async start() { // Removed unused parameter 'mode'
        //todo: mode integration
        try {
            await this.verifyInitialization();
            this.logger.info("Agent started successfully!");
        } catch (error) {
            this.logger.error(`Error starting agent: ${error}`);
        }
    }

    async shutdown() {
        try {
            //await this.dbOps.disconnect();
            this.logger.info("Agent shut down successfully!");
        } catch (error) {
            this.logger.error(`Error shutting down agent: ${error}`);
        }
    }

    getSolanaOperations() {
        return this.solanaOps;
    }

    registerActions(actions: Action[]) {
        if (actions.length !== 0) {
            this.logger.info(`Registering ${actions.length} actions...`);

            actions.forEach((action) => {
                this.actions.set(action.name, action);
            });
        }
        return createSolanaTools(this);
    }

    async executeAction(actionName: string, input: Record<string, any>) {
        const action = this.actions.get(actionName);
        if (!action) {
            throw new Error(`Action ${actionName} not found`);
        }
        return await action.handler(this, input);
    }

    genAi() {
        return Agent.open_ai;
    }

    async getOobeAgent(): Promise<BaseChatModel> {
        // Return current LLM if available, otherwise fall back to static OpenAI
        if (this.currentLLM) {
            return this.currentLLM;
        }
        
        try {
            return await this.getCurrentLLM();
        } catch (error) {
            this.logger.warn(`Failed to get current LLM, falling back to OpenAI: ${error}`);
            return Agent.open_ai;
        }
    }

    async sendTransaction(transaction: any, signers: Keypair[]): Promise<string> {
        return await this.solanaOps.sendTransaction(transaction, signers);
    }

    /**
     * Get Solana operation for tools [wrapped]
     * @returns SolanaOperations
     */

    async getTPS(): Promise<number> {
        return await this.solanaOps.getTPS();
    }

    async getBalanceOf(walletAddress: PublicKey, tokenAddress: PublicKey | undefined): Promise<number> {
        const balance = await this.solanaOps.getBalanceOf(walletAddress, tokenAddress);
        if (balance === undefined) {
            return 35505; //error code simulated but todo forreal
        }
        return balance;
    }

    async getBalance(walletAddress: PublicKey, token_address: PublicKey | undefined): Promise<number> {
        return await this.solanaOps.getBalance(walletAddress, token_address);
    }

    async transfer(recipient: PublicKey, amount: number, mintAddress: PublicKey | undefined): Promise<string | undefined> {
        return await this.solanaOps.transfer(recipient, amount, mintAddress);
    }

    async closeEmptyTokenAccount(): Promise<{
        signature: string;
        size: number;
    }> {
        const result = await this.solanaOps.closeEmptyTokenAccounts();
        if (result === undefined) {
            return {
                signature: "",
                size: 0
            }
        } else {
            return result
        };
    }

    getJupiterOp() {
        return new JupiterSwap(this.connection, this.wallet);
    }

    async generateCodeInIQInscription(input: string, type: string, fontSize: number, density: number): Promise<any> {
        return this.iqOps.AstralChef(input, fontSize, density, this, type);
    }

    async createToken2022(
        name: string,
        symbol: string,
        decimals: number,
        supply: number,
        description: string,
        feeBasisPoints: number,
        maxFeeInTokens: number,
        pinataKey: string,
        imageUrl: string,
    ): Promise<any> {
        const oobeOp = new OobeOperation(this);
        const token = await oobeOp.createOobe2022Token({
            name,
            symbol,
            decimals,
            supply,
            feeBasisPoints,
            maxFee: maxFeeInTokens,
            pinataKey,
            imageUrl,
            description,
        });

        return token;
    }

    public async buyRaydiumToken(
        tokenMint: string,
        tokenNative: string,
        amount: number,
        slippage: number,
        tokenSymbol?: string,
    ): Promise<any> {
        const rayOp = new RayOperation(this);
        return rayOp.buyRaydiumToken({
            tokenNative: tokenNative,
            tokenMint: tokenMint,
            amount: amount,
            slippage: slippage,
        });
    }

    public async sellRaydiumToken(
        tokenMint: string,
        tokenNative: string,
        amount: number,
        slippage: number,
    ): Promise<any> {
        const rayOp = new RayOperation(this);
        return rayOp.sellRaydiumToken({
            tokenNative: tokenNative,
            tokenMint: tokenMint,
            amount: amount,
            slippage: slippage,
        });
    }

    public async getNewPools(): Promise<any> {
        const rayOp = new RayOperation(this);
        const data = await rayOp.getNewPools();
        return data;
    }

    public merkleValidate(input: ResponseMessage[] | Partial<SpriteProfile> | any[], result: Record<string, any>): MerkleValidatorResult {
        return merkleValidator(this, input, result);
    }

    async openPerpTradeLong(
        args: Omit<Parameters<typeof openPerpTradeLong>[0], "agent">,
    ): Promise<string> {
        return openPerpTradeLong({
            agent: this,
            ...args,
        });
    }

    async openPerpTradeShort(
        args: Omit<Parameters<typeof openPerpTradeShort>[0], "agent">,
    ): Promise<string> {
        return openPerpTradeShort({
            agent: this,
            ...args,
        });
    }

    async closePerpTradeShort(
        args: Omit<Parameters<typeof closePerpTradeShort>[0], "agent">,
    ): Promise<string> {
        return closePerpTradeShort({
            agent: this,
            ...args,
        });
    }

    async closePerpTradeLong(
        args: Omit<Parameters<typeof closePerpTradeLong>[0], "agent">,
    ): Promise<string> {
        return closePerpTradeLong({
            agent: this,
            ...args,
        });
    }

    async launchPumpFunToken(
        agent: Agent,
        tokenName: string,
        tokenTicker: string,
        description: string,
        imageUrl: string,
        options?: PumpFunTokenOptions,
    ): Promise<PumpfunLaunchResponse> {
        const pfOp = new PumpfunOperation()

        return pfOp.launchPumpFunToken(
            agent,
            tokenName,
            tokenTicker,
            description,
            imageUrl,
            options,
        );
    }
}

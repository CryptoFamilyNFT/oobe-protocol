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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const solana_operation_1 = require("../operations/solana.operation");
// import { IModeStart } from "../types/index.interfaces"; // Removed unused import
const web3_js_1 = require("@solana/web3.js");
// import { create } from "ts-node"; // Removed unused import
const index_tool_1 = require("../config/tool/index.tool");
const openai_1 = require("@langchain/openai");
const pumpfun_operation_1 = require("../operations/pumpfun.operation");
const Persona_1 = require("./persona/Persona");
const bs58_1 = __importDefault(require("bs58"));
const iq_operation_1 = require("../operations/iq/iq.operation");
const ray_operation_1 = require("../operations/ray/ray.operation");
const oobe_operation_1 = require("../operations/oobe/oobe.operation");
const adrena_operation_1 = require("../operations/adrena/adrena.operation");
const merkleValidator_1 = require("../utils/merkleValidator");
const merkle_operation_1 = require("../operations/merkle.operation");
const jup_operation_1 = require("../operations/jup/jup.operation");
const node_crypto_1 = require("node:crypto");
const output_parsers_1 = require("@langchain/core/output_parsers");
const zod_1 = require("zod");
const prompts_1 = require("@langchain/core/prompts");
const crypto = __importStar(require("node:crypto"));
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
class Agent {
    getRpcTransports() {
        throw new Error("Method not implemented.");
    }
    constructor(solanaEndpoint, privateKey, openKey, logger, personality) {
        this.personality = personality;
        this.solanaOps = new solana_operation_1.SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.OPEN_AI_KEY = openKey;
        this.logger = logger;
        this.walletAddress = "";
        this.wallet = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(bs58_1.default.decode(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
        this.iqOps = new iq_operation_1.IQOperation();
        this.merkle = new merkle_operation_1.MerkleTreeManager(this);
        if (this.personality) {
            this.logger.info(`Personality initialized: ${this.personality.name}`);
        }
    }
    async initialize() {
        try {
            //await this.dbOps.connect();
            this.verifyInitialization();
            this.logger.info(`Agent initialized successfully with [Wallet Address]: ${this.logger.colorize(this.walletAddress, 'yellow')}`, "red");
        }
        catch (error) {
            this.logger.error(`Error initializing agent: ${error}`);
        }
    }
    async createPersona(name) {
        return new Persona_1.PersonaImpl("defaultId", name);
    }
    async initOpenAiAuth() {
        Agent.open_ai = new openai_1.ChatOpenAI({
            apiKey: this.OPEN_AI_KEY,
            modelName: "gpt-3.5-turbo",
            //temperature: 0.7,
        });
        this.logger.info(this.logger.colorize("[oobe-protocol] - Auth initialized successfully!", "magenta"));
    }
    async getOpenK() {
        return this.OPEN_AI_KEY;
    }
    async getCurrentProfileAgent(name, tone, stylePrompt, emoji, traits) {
        async function callZodOutputParserPA() {
            const outputParser = output_parsers_1.StructuredOutputParser.fromZodSchema(zod_1.z.object({
                agent_personality: zod_1.z.object({
                    id: zod_1.z.string(),
                    traits: zod_1.z.record(zod_1.z.number()),
                    logic: zod_1.z.string(),
                    memory: zod_1.z.string(),
                    visual: zod_1.z.string(),
                    evolution: zod_1.z.array(zod_1.z.string()),
                    version: zod_1.z.string(),
                    name: zod_1.z.string(),
                    tone: zod_1.z.string(),
                    stylePrompt: zod_1.z.string(),
                    emoji: zod_1.z.string(),
                    profileHash: zod_1.z.string(),
                }),
            }));
            return outputParser;
        }
        const parser = await callZodOutputParserPA();
        const prompt = prompts_1.ChatPromptTemplate.fromTemplate(`
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
        const profile = {
            id: crypto.randomUUID(),
            version: _evolutionTrail.length.toString(),
            name: _name,
            tone: _tone,
            stylePrompt: _stylePrompt,
            decisionLogicHash: _memory,
            visualHash: (0, node_crypto_1.createHash)("sha256").update(_stylePrompt).digest("hex"),
            emoji: _emoji,
            traits: _traits,
            evolutionTrail: _evolutionTrail,
            profileHash: (0, node_crypto_1.createHash)("sha256")
                .update(JSON.stringify(traits) + _evolutionTrail + _memory + _name + _tone + _stylePrompt)
                .digest("hex"),
        };
        return profile;
    }
    async getPersonality() {
        return this.personality;
    }
    async setPersonality(personality) {
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
            memoryHash: (0, node_crypto_1.createHash)("sha256").update("Default memory").digest("hex"),
            decisionLogicHash: (0, node_crypto_1.createHash)("sha256").update("Default decision logic").digest("hex"),
            visualHash: (0, node_crypto_1.createHash)("sha256").update("Default style").digest("hex"),
            profileHash: (0, node_crypto_1.createHash)("sha256")
                .update("Obi-Wan Kenobi" + "Oracle Jedi master dev on Solana" + "Default style")
                .digest("hex"),
            version: "1.0",
            id: crypto.randomUUID(),
        };
    }
    async getOpenAi() {
        return Agent.open_ai;
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
            }
            else {
                this.logger.error("Wallet not initialized!");
            }
            this.solanaOps.verifyStatus();
        }
        catch (error) {
            this.logger.error(`Error during initialization verification: ${this.logger.colorize(error.message, 'red')}`);
        }
    }
    async start() {
        //todo: mode integration
        try {
            await this.verifyInitialization();
            this.logger.info("Agent started successfully!");
        }
        catch (error) {
            this.logger.error(`Error starting agent: ${error}`);
        }
    }
    async shutdown() {
        try {
            //await this.dbOps.disconnect();
            this.logger.info("Agent shut down successfully!");
        }
        catch (error) {
            this.logger.error(`Error shutting down agent: ${error}`);
        }
    }
    getSolanaOperations() {
        return this.solanaOps;
    }
    registerActions(actions) {
        if (actions.length !== 0) {
            this.logger.info(`Registering ${actions.length} actions...`);
            actions.forEach((action) => {
                this.actions.set(action.name, action);
            });
        }
        return (0, index_tool_1.createSolanaTools)(this);
    }
    async executeAction(actionName, input) {
        const action = this.actions.get(actionName);
        if (!action) {
            throw new Error(`Action ${actionName} not found`);
        }
        return await action.handler(this, input);
    }
    genAi() {
        return Agent.open_ai;
    }
    async getOobeAgent() {
        return Agent.open_ai;
    }
    async sendTransaction(transaction, signers) {
        return await this.solanaOps.sendTransaction(transaction, signers);
    }
    /**
     * Get Solana operation for tools [wrapped]
     * @returns SolanaOperations
     */
    async getTPS() {
        return await this.solanaOps.getTPS();
    }
    async getBalanceOf(walletAddress, tokenAddress) {
        const balance = await this.solanaOps.getBalanceOf(walletAddress, tokenAddress);
        if (balance === undefined) {
            return 35505; //error code simulated but todo forreal
        }
        return balance;
    }
    async getBalance(walletAddress, token_address) {
        return await this.solanaOps.getBalance(walletAddress, token_address);
    }
    async transfer(recipient, amount, mintAddress) {
        return await this.solanaOps.transfer(recipient, amount, mintAddress);
    }
    async closeEmptyTokenAccount() {
        const result = await this.solanaOps.closeEmptyTokenAccounts();
        if (result === undefined) {
            return {
                signature: "",
                size: 0
            };
        }
        else {
            return result;
        }
        ;
    }
    getJupiterOp() {
        return new jup_operation_1.JupiterSwap(this.connection, this.wallet);
    }
    async generateCodeInIQInscription(input, type, fontSize, density) {
        return this.iqOps.AstralChef(input, fontSize, density, this, type);
    }
    async createToken2022(name, symbol, decimals, supply, description, feeBasisPoints, maxFeeInTokens, pinataKey, imageUrl) {
        const oobeOp = new oobe_operation_1.OobeOperation(this);
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
    async buyRaydiumToken(tokenMint, tokenNative, amount, slippage, tokenSymbol) {
        const rayOp = new ray_operation_1.RayOperation(this);
        return rayOp.buyRaydiumToken({
            tokenNative: tokenNative,
            tokenMint: tokenMint,
            amount: amount,
            slippage: slippage,
        });
    }
    async sellRaydiumToken(tokenMint, tokenNative, amount, slippage) {
        const rayOp = new ray_operation_1.RayOperation(this);
        return rayOp.sellRaydiumToken({
            tokenNative: tokenNative,
            tokenMint: tokenMint,
            amount: amount,
            slippage: slippage,
        });
    }
    async getNewPools() {
        const rayOp = new ray_operation_1.RayOperation(this);
        const data = await rayOp.getNewPools();
        return data;
    }
    merkleValidate(input, result) {
        return (0, merkleValidator_1.merkleValidator)(this, input, result);
    }
    async openPerpTradeLong(args) {
        return (0, adrena_operation_1.openPerpTradeLong)({
            agent: this,
            ...args,
        });
    }
    async openPerpTradeShort(args) {
        return (0, adrena_operation_1.openPerpTradeShort)({
            agent: this,
            ...args,
        });
    }
    async closePerpTradeShort(args) {
        return (0, adrena_operation_1.closePerpTradeShort)({
            agent: this,
            ...args,
        });
    }
    async closePerpTradeLong(args) {
        return (0, adrena_operation_1.closePerpTradeLong)({
            agent: this,
            ...args,
        });
    }
    async launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, options) {
        const pfOp = new pumpfun_operation_1.PumpfunOperation();
        return pfOp.launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, options);
    }
}
exports.Agent = Agent;
//# sourceMappingURL=Agents.js.map
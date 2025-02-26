"use strict";
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
class Agent {
    constructor(solanaEndpoint, privateKey, openKey, logger) {
        console.log(privateKey);
        this.solanaOps = new solana_operation_1.SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.OPEN_AI_KEY = openKey;
        this.logger = logger;
        this.walletAddress = "";
        this.wallet = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(bs58_1.default.decode(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
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
            modelName: "gpt-4o-mini",
            temperature: 0.7,
            apiKey: this.OPEN_AI_KEY
        });
        this.logger.info(this.logger.colorize("Google Gen Auth initialized successfully!", "magenta"));
    }
    async getOpenK() {
        return this.OPEN_AI_KEY;
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
    async launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, options) {
        const pfOp = new pumpfun_operation_1.PumpfunOperation();
        return pfOp.launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, options);
    }
}
exports.Agent = Agent;
//# sourceMappingURL=Agents.js.map
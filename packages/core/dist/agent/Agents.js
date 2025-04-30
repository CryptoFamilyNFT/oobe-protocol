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
const iq_operation_1 = require("../operations/iq/iq.operation");
const ray_operation_1 = require("../operations/ray/ray.operation");
const oobe_operation_1 = require("../operations/oobe/oobe.operation");
const adrena_operation_1 = require("../operations/adrena/adrena.operation");
const merkleValidator_1 = require("../utils/merkleValidator");
const merkle_operation_1 = require("../operations/merkle.operation");
const jup_operation_1 = require("../operations/jup/jup.operation");
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
    constructor(solanaEndpoint, privateKey, openKey, logger) {
        this.solanaOps = new solana_operation_1.SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.OPEN_AI_KEY = openKey;
        this.logger = logger;
        this.walletAddress = "";
        this.wallet = web3_js_1.Keypair.fromSecretKey(Uint8Array.from(bs58_1.default.decode(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
        this.iqOps = new iq_operation_1.IQOperation();
        this.merkle = new merkle_operation_1.MerkleTreeManager(this);
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
            modelName: "gpt-4o",
            temperature: 0.7,
        });
        this.logger.info(this.logger.colorize("[oobe-protocol] - Auth initialized successfully!", "magenta"));
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
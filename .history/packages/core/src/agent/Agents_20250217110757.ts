import { SolanaOperations } from "../operations/solana.operation";
import { DBOperations } from "../operations/db.operation";
import Logger from "../utils/logger/logger";
import { IOfficialEndpoint } from "../config/types/config.types";
import { IDatabaseConfig } from "../types/db.interface";
// import { IModeStart } from "../types/index.interfaces"; // Removed unused import
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Action } from "../types/action.interface";
// import { create } from "ts-node"; // Removed unused import
import { createSolanaTools } from "../config/tool/index.tool";
import bs58 from "bs58";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { PumpfunLaunchResponse, PumpFunTokenOptions } from "../types/index.interfaces";
import { PumpfunOperation } from "../operations/pumpfun.operation";
import { PersonaImpl } from "./persona/Persona";

export class Agent {
    private solanaOps: SolanaOperations;
    private logger: Logger;
    public walletAddress: string;
    public wallet: Keypair;
    public connection: Connection;
    private actions: Map<string, Action>;
    //private GOOGLE_API_KEY: string;
    private OPEN_AI_KEY: string;
    public static open_ai: ChatOpenAI;

    constructor(solanaEndpoint: IOfficialEndpoint, privateKey: string, openKey: string , logger: Logger) {
        console.log(privateKey)
        this.solanaOps = new SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.OPEN_AI_KEY = openKey;
        this.logger = logger;
        const privateKeyArray = new Uint8Array(Buffer.from(privateKey, 'hex'));
        this.walletAddress = "";
        try {
            this.wallet = Keypair.fromSecretKey(privateKeyArray);
        } catch (error) {
            const secretKey = Uint8Array.from(JSON.parse(privateKey));
            this.wallet = Keypair.fromSecretKey(secretKey);
        }
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
    }

    async initialize() {
        try {
            //await this.dbOps.connect();
            this.verifyInitialization();
            this.logger.info(`Agent initialized successfully with [Wallet Address]: ${this.logger.colorize(this.walletAddress, 'yellow')}`, "red");
        } catch (error) {
            this.logger.error(`Error initializing agent: ${error}`);
        }
    }

    async createPersona(name: string) {
        return new PersonaImpl("defaultId", name);
    }

    async initOpenAiAuth() {
        Agent.open_ai = new ChatOpenAI({
            modelName: "gpt-4o-mini",
            temperature: 0.7,
            apiKey: this.OPEN_AI_KEY
        });

        this.logger.info(this.logger.colorize("Google Gen Auth initialized successfully!", "magenta"));
    }

    async getOpenK() {
        return this.OPEN_AI_KEY
    }

    async getOpenAi() {
        return Agent.open_ai
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

    async getOobeAgent(): Promise<ChatOpenAI<ChatOpenAICallOptions>> {
        return Agent.open_ai;
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

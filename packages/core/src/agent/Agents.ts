import { SolanaOperations } from "../operations/solana.operation";
import { DBOperations } from "../operations/db.operation";
import Logger from "../utils/logger/logger";
import { IOfficialEndpoint } from "../config/types/config.types";
import { IDatabaseConfig } from "../types/db.interface";
import { IModeStart } from "../types/index.interfaces";
import { Connection, Keypair } from "@solana/web3.js";
import { Action } from "../types/action.interface";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { DEFAULT_CONFIG } from "../config/default";

export class Agent {
    private solanaOps: SolanaOperations;
    private dbOps: DBOperations;
    private logger: Logger;
    public walletAddress: string;
    public wallet: Keypair;
    public connection: Connection;
    private actions: Map<string, Action>;
    public google_ai: ChatGoogleGenerativeAI | null = null;
    private googleApiKey: string;

    constructor(solanaEndpoint: IOfficialEndpoint, dbConfig: IDatabaseConfig, privateKey: string) {
        this.solanaOps = new SolanaOperations(solanaEndpoint.rpc, privateKey);
        this.dbOps = new DBOperations(
            dbConfig.host,
            dbConfig.port,
            dbConfig.database,
            dbConfig.username,
            dbConfig.password,
            dbConfig.synchronize
        );
        this.googleApiKey = DEFAULT_CONFIG.googleApiKey;
        this.logger = new Logger();
        this.walletAddress = "";
        this.wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
    }

    async initialize() {
        try {
            await this.dbOps.connect();

            this.logger.info(`Agent initialized successfully with public key: ${this.walletAddress}`);
        } catch (error) {
            this.logger.error(`Error initializing agent: ${error}`);
        }
    }

    async initGoogleGenAuth() {
        const google_ai = new ChatGoogleGenerativeAI({
            model: "gemini-pro",
            maxOutputTokens: 2048,
            apiKey: this.googleApiKey,
        });

        this.google_ai = google_ai;
        this.logger.info("Google Gen Auth initialized successfully!");
    }

    async verifyInitialization() {
        try {
            const dbConnection = await this.dbOps.connect();
            const solanaStatus = await this.solanaOps.verifyStatus();
            this.walletAddress = this.wallet.publicKey.toBase58();
            this.initGoogleGenAuth();

            if (solanaStatus && dbConnection) {
                this.logger.info("Solana connection verified!");
                this.logger.info("Database connection verified!");
                this.logger.info(`OOBE AGENT: ${this.walletAddress}`);
            } else {
                this.logger.error("Solana connection failed!");
            }
        } catch (error) {
            this.logger.error(`Error during initialization verification: ${error}`);
        }
    }

    async start(mode: IModeStart) {
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
            await this.dbOps.disconnect();
            this.logger.info("Agent shut down successfully!");
        } catch (error) {
            this.logger.error(`Error shutting down agent: ${error}`);
        }
    }

    getSolanaOperations() {
        return this.solanaOps;
    }

    getDBOperations() {
        return this.dbOps;
    }

    registerAction(action: Action) {
        this.actions.set(action.name, action);
    }

    async executeAction(actionName: string, input: Record<string, any>) {
        const action = this.actions.get(actionName);
        if (!action) {
            throw new Error(`Action ${actionName} not found`);
        }
        return await action.handler(this, input);
    }
}
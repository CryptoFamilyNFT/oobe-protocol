import { SolanaOperations } from "../operations/solana.operation";
import { DBOperations } from "../operations/db.operation";
import Logger from "../utils/logger/logger";
import { IOfficialEndpoint } from "../config/types/config.types";
import { IDatabaseConfig } from "../types/db.interface";
import { IModeStart } from "../types/index.interfaces";
import { Connection, Keypair } from "@solana/web3.js";
import { Action } from "../types/action.interface";

export class Agent {
    private solanaOps: SolanaOperations;
    private dbOps: DBOperations;
    private logger: Logger;
    public walletAddress: string;
    public wallet: Keypair;
    public connection: Connection;
    private actions: Map<string, Action>;

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
        this.logger = new Logger();
        this.walletAddress = "";
        this.wallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
        this.actions = new Map();
        this.connection = this.solanaOps.getConnection();
    }

    async initialize() {
        try {
            await this.dbOps.connect();
            this.walletAddress = this.wallet.publicKey.toBase58();
            this.logger.info(`Agent initialized successfully with public key: ${this.walletAddress}`);
        } catch (error) {
            this.logger.error(`Error initializing agent: ${error}`);
        }
    }

    async verifyInitialization() {
        try {
            const solanaStatus = await this.solanaOps.verifyStatus();
            const dbConnection = await this.dbOps.connect();

            if (solanaStatus) {
                this.logger.info("Solana connection verified!");
            } else {
                this.logger.error("Solana connection failed!");
                throw new Error("Solana connection failed!");
            }

            this.logger.info("Database connected successfully!");
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
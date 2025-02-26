import { SolanaOperations } from "../operations/solana.operation";
import { IOfficialEndpoint } from "../config/types/config.types";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Action } from "../types/action.interface";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { PumpfunLaunchResponse, PumpFunTokenOptions } from "../types/index.interfaces";
export declare class Agent {
    private solanaOps;
    private logger;
    walletAddress: string;
    wallet: Keypair;
    connection: Connection;
    private actions;
    private OPEN_AI_KEY;
    static open_ai: ChatOpenAI;
    private oobeKey;
    constructor(solanaEndpoint: IOfficialEndpoint, privateKey: string, oobeKey: string);
    initialize(): Promise<void>;
    initOpenAiAuth(): Promise<void>;
    getOpenK(): Promise<string>;
    getOpenAi(): Promise<ChatOpenAI<ChatOpenAICallOptions>>;
    verifyInitialization(): Promise<void>;
    start(): Promise<void>;
    shutdown(): Promise<void>;
    getSolanaOperations(): SolanaOperations;
    registerActions(actions: Action[]): Promise<(import("..").SolanaCreateImageTool | import("../config/tool/pumpfun/createTokenPF").SolanaPumpfunTokenLaunchTool | import("../config/tool/solana/balance.tool").SolanaBalanceTool | import("../config/tool/solana/balance_of.tool").SolanaBalanceOtherTool | import("../config/tool/solana/close_empty_account.tool").SolanaCloseEmptyTokenAccounts | import("../config/tool/solana/tps.tool").SolanaTPSCalculatorTool | import("../config/tool/solana/transfer.tool").SolanaTransferTool)[]>;
    executeAction(actionName: string, input: Record<string, any>): Promise<Record<string, any>>;
    genAi(): Promise<ChatOpenAI<ChatOpenAICallOptions>>;
    getOobeAgent(): Promise<ChatOpenAI<ChatOpenAICallOptions>>;
    sendTransaction(transaction: any, signers: Keypair[]): Promise<string>;
    /**
     * Get Solana operation for tools [wrapped]
     * @returns SolanaOperations
     */
    getTPS(): Promise<number>;
    getBalanceOf(walletAddress: PublicKey, tokenAddress: PublicKey | undefined): Promise<number>;
    getBalance(walletAddress: PublicKey, token_address: PublicKey | undefined): Promise<number>;
    transfer(recipient: PublicKey, amount: number, mintAddress: PublicKey | undefined): Promise<string | undefined>;
    closeEmptyTokenAccount(): Promise<{
        signature: string;
        size: number;
    }>;
    launchPumpFunToken(agent: Agent, tokenName: string, tokenTicker: string, description: string, imageUrl: string, options?: PumpFunTokenOptions): Promise<PumpfunLaunchResponse>;
}
//# sourceMappingURL=Agents.d.ts.map
import { SolanaOperations } from "../operations/solana.operation";
import Logger from "../utils/logger/logger";
import { IOfficialEndpoint } from "../config/types/config.types";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Action } from "../types/action.interface";
import { ChatOpenAI, ChatOpenAICallOptions } from "@langchain/openai";
import { PumpfunLaunchResponse, PumpFunTokenOptions } from "../types/index.interfaces";
import { PersonaImpl } from "./persona/Persona";
import { closePerpTradeLong, closePerpTradeShort, openPerpTradeLong, openPerpTradeShort } from "../operations/adrena/adrena.operation";
import { MerkleValidatorResult } from "../utils/merkleValidator";
import { MerkleTreeManager } from "../operations/merkle.operation";
import { ResponseMessage } from "../types/agent.interface";
import { JupiterSwap } from "../operations/jup/jup.operation";
import { SpriteProfile, Trait } from "../agent-personality";
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
export declare class Agent {
    private personality?;
    getRpcTransports(): void;
    private solanaOps;
    private logger;
    walletAddress: string;
    wallet: Keypair;
    connection: Connection;
    private actions;
    private OPEN_AI_KEY;
    static open_ai: ChatOpenAI;
    private iqOps;
    merkle: MerkleTreeManager;
    constructor(solanaEndpoint: IOfficialEndpoint, privateKey: string, openKey: string, logger: Logger, personality?: SpriteProfile | undefined);
    initialize(): Promise<void>;
    createPersona(name: string): Promise<PersonaImpl>;
    initOpenAiAuth(): Promise<void>;
    getOpenK(): Promise<string>;
    getCurrentProfileAgent(name: string, tone: string, stylePrompt: string, emoji: string, traits?: Trait[]): Promise<SpriteProfile>;
    getPersonality(): Promise<SpriteProfile | undefined>;
    setPersonality(personality: SpriteProfile): Promise<void>;
    getDefaultPersonality(): Promise<SpriteProfile>;
    getOpenAi(): Promise<ChatOpenAI<ChatOpenAICallOptions>>;
    verifyInitialization(): Promise<void>;
    start(): Promise<void>;
    shutdown(): Promise<void>;
    getSolanaOperations(): SolanaOperations;
    registerActions(actions: Action[]): Promise<(import("..").PerpCloseTradeTool | import("..").PerpOpenTradeTool | import("..").SolanaCreateImageTool | import("../config/tool/kamino/kaminoClaimRewards.tool").ClaimRewardsTool | import("../config/tool/kamino/kaminoDepositShares.tool").DepositSharesTool | import("../config/tool/kamino/kaminoGetAssociateTokens.tools").GetAssociatedForTokensAndSharesTool | import("..").GetKaminoCustomStrategyTool | import("../config/tool/kamino/kaminoGetHolders.tool").GetKaminoHoldersTool | import("../config/tool/kamino/kaminoGetSharePriceStrategy.tool").GetKaminoSharePriceTool | import("../config/tool/kamino/kaminoWithdrawShares.tool").WithdrawSharesTool | import("../config/tool/kamino/keminoCreateMemoWithStrategy.tool").CreateMemoWithStrategyKeyTool | import("../config/tool/iq/IQimageInscription.tool").SolanaIQImageTool | import("../config/tool/jup/buyTokenJup").JupiterBuyTokenTool | import("../config/tool/jup/sellTokenJup").JupiterSellTokenTool | import("..").createToken2022Tool | import("../config/tool/orca/orca_create_clmm.tool").orcaCreateClmm | import("../config/tool/orca/orca_create_ss_lp").orcaCreateSsLp | import("../config/tool/orca/orca_fetch_position.tool").orcaFetchPositionTool | import("../config/tool/orca/orca_pos_close.tool").orcaClosePositionTool | import("../config/tool/pumpfun/createTokenPF").SolanaPumpfunTokenLaunchTool | import("../config/tool/ray/buyTokenRay").RaydiumBuyTokenTool | import("..").RaydiumSellTokenTool | import("../config/tool/singularity/singularity.tool").AgentAwarenessTool | import("../config/tool/solana/balance.tool").SolanaBalanceTool | import("../config/tool/solana/balance_all.tool").balanceAllTokensOwnedTool | import("../config/tool/solana/balance_of.tool").SolanaBalanceOtherTool | import("../config/tool/solana/check_tokens.tool").CheckTokensRugTool | import("../config/tool/solana/close_empty_account.tool").SolanaCloseEmptyTokenAccounts | import("../config/tool/solana/fetch_agent_wallet").FetchAgentKeypair | import("../config/tool/solana/tps.tool").SolanaTPSCalculatorTool | import("../config/tool/solana/transfer.tool").SolanaTransferTool | import("..").BufferInputTool | import("..").PersonalityTool | import("..").GetPersonalityTool | import("..").UsePersonalityTool)[]>;
    executeAction(actionName: string, input: Record<string, any>): Promise<Record<string, any>>;
    genAi(): ChatOpenAI<ChatOpenAICallOptions>;
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
    getJupiterOp(): JupiterSwap;
    generateCodeInIQInscription(input: string, type: string, fontSize: number, density: number): Promise<any>;
    createToken2022(name: string, symbol: string, decimals: number, supply: number, description: string, feeBasisPoints: number, maxFeeInTokens: number, pinataKey: string, imageUrl: string): Promise<any>;
    buyRaydiumToken(tokenMint: string, tokenNative: string, amount: number, slippage: number, tokenSymbol?: string): Promise<any>;
    sellRaydiumToken(tokenMint: string, tokenNative: string, amount: number, slippage: number): Promise<any>;
    getNewPools(): Promise<any>;
    merkleValidate(input: ResponseMessage[] | Partial<SpriteProfile> | any[], result: Record<string, any>): MerkleValidatorResult;
    openPerpTradeLong(args: Omit<Parameters<typeof openPerpTradeLong>[0], "agent">): Promise<string>;
    openPerpTradeShort(args: Omit<Parameters<typeof openPerpTradeShort>[0], "agent">): Promise<string>;
    closePerpTradeShort(args: Omit<Parameters<typeof closePerpTradeShort>[0], "agent">): Promise<string>;
    closePerpTradeLong(args: Omit<Parameters<typeof closePerpTradeLong>[0], "agent">): Promise<string>;
    launchPumpFunToken(agent: Agent, tokenName: string, tokenTicker: string, description: string, imageUrl: string, options?: PumpFunTokenOptions): Promise<PumpfunLaunchResponse>;
}
//# sourceMappingURL=Agents.d.ts.map
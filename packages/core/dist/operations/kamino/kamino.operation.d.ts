import { AccountInfo, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
import { Kamino } from "@kamino-finance/kliquidity-sdk";
import Decimal from "decimal.js";
import { WhirlpoolStrategy, WhirlpoolStrategyJSON } from "@kamino-finance/kliquidity-sdk/dist/kamino-client/accounts";
/**
 * @class kaminoOperations
 * @description This class provides methods to interact with Kamino strategies on the Solana blockchain.
 * @param agent - The agent instance used for making requests to the Solana blockchain.
 * @param strategyPubkey - The public key of the strategy to be used (default is a specific Kamino strategy).
 * @param kamino - The Kamino instance used for interacting with the Kamino SDK.
 * @method kaminoGetStrategy - A method to get the strategy by its public key.
 * @method kaminoInitModule - A method to initialize the Kamino module.
 * @method encrypt - A method to encrypt data using AES-256-CBC.
 * @method decrypt - A method to decrypt data using AES-256-CBC.
 * @method createMemoWithStrategyKey - A method to create a memo with the strategy key.
 * @method getAllKaminostrategies - A method to get all Kamino strategies.
 * @method getKaminoCustomStrategy - A method to get a specific Kamino strategy by its address.
 * @method getKaminoSharePrice - A method to get the share price of a specific Kamino strategy.
 * @method getKaminoHolders - A method to get the token holders of a specific Kamino strategy.
 * @method getKaminoStrategyPrice - A method to get the strategy price of a specific Kamino strategy.
 * @method getAssociatedForTokensAndShares - A method to get the associated token addresses and shares for a specific Kamino strategy.
 * @method depositShares - A method to deposit shares into a specific Kamino strategy.
 * @method withdrawShares - A method to withdraw shares from a specific Kamino strategy.
 * @method GET_STRATEGY_INFO - A method to get the strategy information for a specific Kamino strategy.
 * @method CREATE_CAMINO_STRATEGY - A method to create a new Kamino strategy.
 * @method COLLECT_FEES_REWARDS - A method to collect fees and rewards from a specific Kamino strategy.
 */
export declare class kaminoOperations {
    private agent;
    strategyPubkey: PublicKey;
    kamino: Kamino;
    transportUrls: string[];
    private currentTransportIndex;
    constructor(agent: Agent);
    private getNextTransportUrl;
    private handleRpcError;
    getAllKaminostrategies(strategyCount?: number): Promise<(WhirlpoolStrategy | null)[]>;
    private kaminoInitModule;
    private encrypt;
    private decrypt;
    /**
     *
     */
    private kaminoGetStrategy;
    getKaminoCustomStrategy(yourStrategyAddress: PublicKey): Promise<WhirlpoolStrategy | null>;
    getKaminoSharePrice(yourStrategyAddress: PublicKey): Promise<Decimal>;
    getKaminoHolders(usdhUsdtStrategy: PublicKey): Promise<any>;
    getKaminoStrategyPrice(usdhUsdtStrategy: PublicKey): Promise<Decimal>;
    private decodeMemoData;
    claimRewards(use_strategy?: WhirlpoolStrategy | null): Promise<void>;
    createMemoWithStrategyKey(connection: Connection, payer: Keypair, strategyPubkey: PublicKey, // Strategia da scrivere nel memo
    pdaVector: PublicKey): Promise<string>;
    /**
     * @name GET_ASSOCIATED_FOR_TOKENS_AND_SHARES
     * @param strategy
     * @returns
     */
    getAssociatedForTokensAndShares(strategy: {
        strategy: WhirlpoolStrategy | null;
        strategyPubkey: PublicKey;
    } | null): Promise<{
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    } | null>;
    /**
     * @name DEPOSIT_SHARES
     * @param strategyPubkey
     * @returns {
     * txHash,
     * sharesAta,
     * sharesMintData,
     * tokenAAta,
     * tokenAData,
     * tokenBAta,
     * tokenBData
     * }
     */
    depositShares(strategyPubkey: PublicKey, amountUSDH: Decimal, amountUSDC: Decimal): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    }>;
    /**
     * @name WITHDRAW_SHARES
     * @param strategyPubkey
     * @returns {
     * txHash,
     * sharesAta,
     * sharesMintData,
     * tokenAAta,
     * tokenAData,
     * tokenBAta,
     * tokenBData
     * }
     */
    withdrawShares(strategyPubkey: PublicKey, amountUSDH: Decimal, amountUSDC: Decimal): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    } | null>;
    /**
     * @name GET_STRATEGY_INFO
     * @param strategyPubkey
     * @returns {
     * sharesAta,
     * sharesMintData,
     * tokenAAta,
     * tokenAData,
     * tokenBAta,
     * tokenBData
     * }
     */
    GET_STRATEGY_INFO(strategyPubkey: PublicKey): Promise<{
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    } | null>;
    /**
     * @name CREATE_CAMINO_STRATEGY
     */
    CREATE_CAMINO_STRATEGY(PoolAddress: string, isOrca: boolean): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        strategy: WhirlpoolStrategyJSON | null;
    }>;
    /**
     * @name COLLECT_FEES_REWARDS
     */
    COLLECT_FEES_REWARDS(strategyPubkey: PublicKey): Promise<{}>;
}
//# sourceMappingURL=kamino.operation.d.ts.map
import { AccountInfo, clusterApiUrl, Connection, Keypair, PublicKey, sendAndConfirmTransaction, Transaction, TransactionInstruction } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
import {
    assignBlockInfoToTransaction,
    createAssociatedTokenAccountInstruction,
    createTransactionWithExtraBudget,
    getAssociatedTokenAddressAndData,
    Kamino,
    StrategyWithAddress
} from "@kamino-finance/kliquidity-sdk";
import Decimal from "decimal.js";
import { Whirlpool } from "@orca-so/whirlpools-sdk";
import { MEMO_PROGRAM_ID2 } from "@raydium-io/raydium-sdk-v2";
import crypto from 'crypto';
import { ConfigManager } from "../../config/default";
import { WhirlpoolStrategy, WhirlpoolStrategyJSON } from "@kamino-finance/kliquidity-sdk/dist/kamino-client/accounts";
import { createJsonRpcApi } from "@solana/rpc-spec";
import { transportUrls } from "../../utils/SmartRoundRobinRPC";

type raydiumPoolAddress = string;
type orcaPoolAddress = string;

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
export class kaminoOperations {
   
    public strategyPubkey: PublicKey = new PublicKey("2H4xebnp2M9JYgPPfUw58uUQahWF8f1YTNxwwtmdqVYV")
    public kamino: Kamino = new Kamino('mainnet-beta', new Connection(clusterApiUrl('mainnet-beta')));

    private currentTransportIndex: number = 0;
    
    constructor(private agent: Agent) {
        this.agent = agent;
        if (this.agent) {
            this.kamino = this.kaminoInitModule()
        } 
    };

    private getNextTransportUrl(): string {
        this.currentTransportIndex = (this.currentTransportIndex + 1) % transportUrls.length;
        return transportUrls[this.currentTransportIndex];
    }

    private async handleRpcError<T>(fn: () => Promise<T>): Promise<T> {
        try {
            return await fn();
        } catch (error: any) {
            if (error.message.includes('410 Gone')) {
                console.warn('RPC error detected, rotating transport URL...');
                const nextUrl = this.getNextTransportUrl();
                console.log(`Switching to next RPC endpoint: ${nextUrl}`);
                this.kamino = new Kamino('mainnet-beta', new Connection(nextUrl));
                return await fn();
            }
            throw error;
        }
    }

    // Example usage of handleRpcError
    public async getAllKaminostrategies(strategyCount: number = 1000) {
        return this.handleRpcError(async () => {
            const strategies = (await this.kamino.getStrategies()).slice(0, strategyCount);
            return strategies;
        });
    }

    private kaminoInitModule(): Kamino {
        const connection = new Connection(transportUrls[this.currentTransportIndex]);
        return new Kamino('mainnet-beta', connection);
    }

    // Encrypt
    private encrypt(text: string, algorithm: string = 'aes-256-cbc', secretKey: Buffer = crypto.createHash('sha256').update('your-super-secret-key').digest(), iv: Buffer = crypto.randomBytes(16)): string {
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }

    // Decrypt
    private decrypt(encryptedText: string, algorithm: string = 'aes-256-cbc', secretKey: Buffer = crypto.createHash('sha256').update('your-super-secret-key').digest()): string {
        const [ivHex, encryptedHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');

        const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    }


    /**
     * 
     */
    private async kaminoGetStrategy(strategyPubkey: PublicKey = this.strategyPubkey): Promise<{ strategy: WhirlpoolStrategy | null, strategyPubkey: PublicKey } | null> {
        const strategy = await this.kamino.getStrategyByAddress(strategyPubkey)
        if (!strategy) {
            return null
        }
        return { strategy: strategy, strategyPubkey }
    }


    // get specific strategy
    public async getKaminoCustomStrategy(yourStrategyAddress: PublicKey): Promise<WhirlpoolStrategy | null> {
        return await this.kamino.getStrategyByAddress(yourStrategyAddress);
    }

    // get strategy share price
    public async getKaminoSharePrice(yourStrategyAddress: PublicKey): Promise<Decimal> {
        return await this.kamino.getStrategySharePrice(yourStrategyAddress);
    }

    // get token holders of a strategy
    public async getKaminoHolders(usdhUsdtStrategy: PublicKey): Promise<any> {
        return await this.kamino.getStrategyHolders(usdhUsdtStrategy);
    }

    // get strategy share price
    public async getKaminoStrategyPrice(usdhUsdtStrategy: PublicKey): Promise<Decimal> {
        return await this.kamino.getStrategySharePrice(usdhUsdtStrategy);
    }

    private decodeMemoData(memoData: Buffer): string {
        const decodedData = memoData.toString('utf8');
        return decodedData;
    }

    public async claimRewards(use_strategy?: WhirlpoolStrategy | null) {
        const strategy = await this.kaminoGetStrategy();
        if (!strategy) {
            throw new Error("Strategy not found");
        }
        const { strategy: whirlpoolStrategy } = strategy
        if (!whirlpoolStrategy) {
            throw new Error("Whirlpool strategy not found");
        }

        const claimIx = await this.kamino.collectFeesAndRewards({ strategy: use_strategy ? use_strategy : whirlpoolStrategy, address: this.strategyPubkey }, this.agent.wallet.publicKey);
        const tx = new Transaction().add(claimIx);
        const txSig = await sendAndConfirmTransaction(this.agent.connection, tx, [this.agent.wallet], {
            commitment: "processed",
        });
        console.log("Claim transaction signature:", txSig);
    }

    public async createMemoWithStrategyKey(
        connection: Connection,
        payer: Keypair,
        strategyPubkey: PublicKey,            // Strategia da scrivere nel memo
        pdaVector: PublicKey                  // PDA come "vettore"
    ) {
        const configManager = new ConfigManager();
        let { strategyKey, strategyKeyLength } = { strategyKey: configManager.getDefaultConfig().strategy_key, strategyKeyLength: configManager.getDefaultConfig().strategy_key.length }
        let newStrategyKey;

        if (strategyKey.trim() === "") {
            newStrategyKey = Buffer.from(payer.publicKey.toBase58() + '/oobe_kamino', 'utf8');
        } else {
            newStrategyKey = Buffer.from(strategyKey, 'utf8');
        }

        const memoData = strategyPubkey.toBase58();
        const algorithm = 'aes-256-cbc';
        const key = crypto.createHash('sha256').update(strategyKeyLength !== 0 ? strategyKey : newStrategyKey).digest(); // 32-byte key    
        const iv = crypto.randomBytes(16); // 16-byte IV

        const encrypted = this.encrypt(memoData, algorithm, key, iv);
        const encoded_data = Buffer.from(encrypted, 'utf8');

        const memoIx = new TransactionInstruction({
            programId: MEMO_PROGRAM_ID2,
            keys: [
                {
                    pubkey: pdaVector,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            data: encoded_data,
        });

        const tx = new Transaction().add(memoIx);
        const txSig = await sendAndConfirmTransaction(connection, tx, [payer], {
            commitment: "processed",
        });

        console.log("Memo v2 transaction signature:", txSig);
        return txSig;
    }

    /**
     * @name GET_ASSOCIATED_FOR_TOKENS_AND_SHARES
     * @param strategy 
     * @returns 
     */
    public async getAssociatedForTokensAndShares(
        strategy: { strategy: WhirlpoolStrategy | null, strategyPubkey: PublicKey } | null
    ): Promise<{ sharesAta: PublicKey; sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null; tokenAAta: PublicKey; tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null; tokenBAta: PublicKey; tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null; } | null> {
        const resolvedStrategy = strategy;
        if (!resolvedStrategy) {
            return null
        }
        const { strategy: whirlpoolStrategy } = resolvedStrategy
        if (!whirlpoolStrategy) {
            return null
        }
        const [sharesAta, sharesMintData] = await getAssociatedTokenAddressAndData(this.agent.connection, whirlpoolStrategy.sharesMint, this.agent.wallet.publicKey);
        const [tokenAAta, tokenAData] = await getAssociatedTokenAddressAndData(this.agent.connection, whirlpoolStrategy.tokenAMint, this.agent.wallet.publicKey);
        const [tokenBAta, tokenBData] = await getAssociatedTokenAddressAndData(this.agent.connection, whirlpoolStrategy.tokenBMint, this.agent.wallet.publicKey);
        return {
            sharesAta,
            sharesMintData,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        }
    }

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

    public async depositShares(strategyPubkey: PublicKey, amountUSDH: Decimal, amountUSDC: Decimal): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    }> {
        const strategy = await this.kaminoGetStrategy();
        if (!strategy) {
            throw new Error("Strategy not found");
        }
        const associatedTokensAndShares = await this.getAssociatedForTokensAndShares(strategy);
        if (!associatedTokensAndShares) {
            throw new Error("Associated token addresses not found");
        }
        const { sharesAta, sharesMintData, tokenAAta, tokenAData, tokenBAta, tokenBData } = associatedTokensAndShares;
        if (!sharesAta || !sharesMintData || !tokenAAta || !tokenAData || !tokenBAta || !tokenBData) {
            throw new Error("Associated token addresses not found");
        }

        // create a transaction that has an instruction for extra compute budget (deposit operation needs this),
        let tx = createTransactionWithExtraBudget(this.agent.wallet.publicKey.toBuffer().length);

        // add creation of associated token addresses to the transaction instructions if they don't exist
        const ataInstructions = await this.kamino.getCreateAssociatedTokenAccountInstructionsIfNotExist(
            this.agent.wallet.publicKey,
            { strategy: strategy.strategy, address: strategy.strategyPubkey } as StrategyWithAddress,
            tokenAData,
            tokenAAta,
            tokenBData,
            tokenBAta,
            sharesMintData,
            sharesAta
        );
        if (ataInstructions.length > 0) {
            tx.add(...ataInstructions);
        }

        if (!strategy.strategy) {
            throw new Error("Strategy not found");
        }

        // specify amount of token A and B to deposit, e.g. to deposit 5 USDH and 5 USDC:
        const depositIx = await this.kamino.deposit({ strategy: strategy.strategy, address: strategy.strategyPubkey }, new Decimal(amountUSDH), new Decimal(amountUSDC), this.agent.wallet.publicKey);
        tx.add(depositIx);

        // assign block hash, block height and fee payer to the transaction
        tx = await assignBlockInfoToTransaction(this.agent.connection, tx, this.agent.wallet.publicKey);

        const txHash = await sendAndConfirmTransaction(this.agent.connection, tx, [this.agent.wallet], {
            commitment: 'confirmed',
        });

        return {
            txHash,
            sharesAta,
            sharesMintData,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        }
    }

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
    public async withdrawShares(strategyPubkey: PublicKey, amountUSDH: Decimal, amountUSDC: Decimal): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    } | null> {
        // get on-chain data for a Kamino strategy
        const strategy = await this.kamino.getStrategyByAddress(strategyPubkey);
        if (!strategy) {
            throw Error('Could not fetch strategy from the chain');
        }
        const strategyWithAddress = { strategy, address: strategyPubkey };

        // check if associated token addresses exist for token A, B and shares
        const [sharesAta, sharesMintData] = await getAssociatedTokenAddressAndData(this.agent.connection, strategy.sharesMint, this.agent.wallet.publicKey);
        const [tokenAAta, tokenAData] = await getAssociatedTokenAddressAndData(this.agent.connection, strategy.tokenAMint, this.agent.wallet.publicKey);
        const [tokenBAta, tokenBData] = await getAssociatedTokenAddressAndData(this.agent.connection, strategy.tokenBMint, this.agent.wallet.publicKey);

        // create a transaction that has an instruction for extra compute budget (withdraw operation needs this),
        let tx = createTransactionWithExtraBudget(this.agent.wallet.publicKey.toBuffer().length);

        // add creation of associated token addresses to the transaction instructions if they don't exist
        const ataInstructions = await this.kamino.getCreateAssociatedTokenAccountInstructionsIfNotExist(
            this.agent.wallet.publicKey,
            strategyWithAddress,
            tokenAData,
            tokenAAta,
            tokenBData,
            tokenBAta,
            sharesMintData,
            sharesAta
        );
        if (ataInstructions.length > 0) {
            tx.add(...ataInstructions);
        }

        // withdraw all strategy shares from the wallet:
        const withdrawIxns = await this.kamino.withdrawAllShares(strategyWithAddress, this.agent.wallet.publicKey);
        if (withdrawIxns) {
            tx.add(...(Array.isArray(withdrawIxns) ? withdrawIxns : [withdrawIxns]));
        } else {
            console.log('Wallet balance is 0 shares, cant withdraw any');
            return null;
        }

        // assign block hash, block height and fee payer to the transaction
        tx = await assignBlockInfoToTransaction(this.agent.connection, tx, this.agent.wallet.publicKey);

        const txHash = await sendAndConfirmTransaction(this.agent.connection, tx, [this.agent.wallet], {
            commitment: 'confirmed',
        });

        return {
            txHash,
            sharesAta,
            sharesMintData,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        }
    }

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
    public async GET_STRATEGY_INFO(strategyPubkey: PublicKey): Promise<{
        sharesAta: PublicKey;
        sharesMintData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
    } | null> {
        const strategy = await this.kaminoGetStrategy(strategyPubkey);
        if (!strategy) {
            throw new Error("Strategy not found");
        }
        const associatedTokensAndShares = await this.getAssociatedForTokensAndShares(strategy);
        if (!associatedTokensAndShares) {
            throw new Error("Associated token addresses not found");
        }
        const { sharesAta, sharesMintData, tokenAAta, tokenAData, tokenBAta, tokenBData } = associatedTokensAndShares;
        if (!sharesAta || !sharesMintData || !tokenAAta || !tokenAData || !tokenBAta || !tokenBData) {
            throw new Error("Associated token addresses not found");
        }
        return {
            sharesAta,
            sharesMintData,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        }
    }


    /**
     * @name CREATE_CAMINO_STRATEGY
     */
    public async CREATE_CAMINO_STRATEGY(PoolAddress: string, isOrca: boolean): Promise<{
        txHash: string;
        sharesAta: PublicKey;
        tokenAAta: PublicKey;
        tokenAData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        tokenBAta: PublicKey;
        tokenBData: AccountInfo<Buffer<ArrayBufferLike>> | null;
        strategy: WhirlpoolStrategyJSON | null;
    }> {
        // generate a new strategy public key
        const newStrategy = Keypair.generate();
        // setup fee payer (wallet) that will sign the transaction and own the strategy
        const signer = this.agent.wallet;
        const owner = signer.publicKey; // or use different public key for owner (admin)
        const kamino = this.kamino

        let whirlpoolState: Whirlpool | null = null;
        let raydiumPoolState: Whirlpool | null = null;
        let whirlpoolHandle: "Raydium" | "Orca" | null = null;

        if (isOrca) {
            // depending on the DEX you want to use for your strategy (Orca or Raydium) fetch the pool
            // Orca: get on-chain data for an existing Orca Whirlpool
            const whirlpool = new PublicKey(PoolAddress);
            whirlpoolState = await kamino.getWhirlpoolByAddress(whirlpool) as unknown as Whirlpool | null;
            if (!whirlpool) {
                throw Error('Could not fetch Orca whirlpool from the chain');
            }
        } else {
            // Raydium: get on-chain data for an existing Raydium CLMM pool
            const raydiumPool = new PublicKey(PoolAddress);
            raydiumPoolState = await kamino.getWhirlpoolByAddress(raydiumPool) as unknown as Whirlpool | null;
            if (!raydiumPool) {
                throw Error('Could not fetch Raydium CLMM pool from the chain');
            }
        }

        // create a transaction that has an instruction for extra compute budget
        let tx = createTransactionWithExtraBudget(signer.publicKey.toBuffer().length);

        // check if associated token addresses exist for token A or B
        let tokenMintA: PublicKey;
        let tokenMintB: PublicKey;

        if (!whirlpoolHandle) {
            throw new Error("No whirlpool handle found");
        }

        switch (whirlpoolHandle) {
            case "Orca":
                if (!whirlpoolState) {
                    throw new Error("No Orca pool found");
                }
                tokenMintA = whirlpoolState.getTokenAInfo().mint;
                tokenMintB = whirlpoolState.getTokenBInfo().mint; // Updated to use getTokenBInfo()
                break;
            case "Raydium":
                if (!raydiumPoolState) {
                    throw new Error("No Raydium pool found");
                }
                tokenMintA = raydiumPoolState.getTokenAInfo().mint;
                tokenMintB = raydiumPoolState.getTokenBInfo().mint; // Updated to use getTokenBInfo()
                break;
            default:
                throw new Error("Invalid pool handle");
        }

        if (!whirlpoolState) {
            throw new Error("No whirlpool state found");
        }

        const [tokenAAta, tokenAData] = await getAssociatedTokenAddressAndData(this.agent.connection, tokenMintA, owner);
        const [tokenBAta, tokenBData] = await getAssociatedTokenAddressAndData(this.agent.connection, tokenMintB, owner);

        if (!tokenAData) {
            tx.add(createAssociatedTokenAccountInstruction(owner, tokenAAta, owner, tokenMintA));
        }
        if (!tokenBData) {
            tx.add(createAssociatedTokenAccountInstruction(owner, tokenBAta, owner, tokenMintB));
        }

        // create a rent exempt strategy account that will contain the Kamino strategy
        const createStrategyAccountIx = await kamino.createStrategyAccount(owner, newStrategy.publicKey);
        tx.add(createStrategyAccountIx);

        // create the actual strategy with USDH as token A and USDC as token B (note: the tokens in the pool should match the tokens in the strategy)
        const poolState = whirlpoolHandle === "Raydium" ? raydiumPoolState : whirlpoolState;
        if (!poolState) {
            throw new Error("Pool state is null");
        }
        const createStrategyIx = await kamino.createStrategy(newStrategy.publicKey, new PublicKey(PoolAddress), this.agent.wallet.publicKey, isOrca ? "ORCA" : "RAYDIUM");
        tx.add(createStrategyIx);

        tx = await assignBlockInfoToTransaction(this.agent.connection, tx, owner);

        const txHash = await sendAndConfirmTransaction(this.agent.connection, tx, [signer, newStrategy], {
            commitment: 'finalized',
        });

        console.log('transaction hash', txHash);
        console.log('new strategy has been created', newStrategy.publicKey.toString());

        // this will work with 'finalized' transaction commitment level,
        // it might fail if you use anything other than that as the on-chain data won't be updated as quickly
        // and you have to wait a bit
        const strategy = await kamino.getStrategyByAddress(newStrategy.publicKey);
        console.log(strategy?.toJSON());

        return {
            txHash,
            sharesAta: newStrategy.publicKey,
            strategy: strategy?.toJSON() ?? null,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        }
    }



    /**
     * @name COLLECT_FEES_REWARDS
     */

    public async COLLECT_FEES_REWARDS(strategyPubkey: PublicKey): Promise<{}> {
        // create a transaction that has an instruction for extra compute budget
        let tx = createTransactionWithExtraBudget(this.agent.wallet.publicKey.toBuffer().length);

        // get on-chain data for a Kamino strategy
        const strategy = await this.kamino.getStrategyByAddress(strategyPubkey);
        if (!strategy) {
            throw Error('Could not fetch strategy from the chain');
        }
        const strategyWithAddress = { strategy, address: strategyPubkey };

        // create collect fee/rewards instructions
        const collectIx = await this.kamino.collectFeesAndRewards(strategyWithAddress);

        tx.add(collectIx);

        // assign block hash, block height and fee payer to the transaction
        tx = await assignBlockInfoToTransaction(this.agent.connection, tx, this.agent.wallet.publicKey);

        //fast way commitment
        const txHash = await sendAndConfirmTransaction(this.agent.connection, tx, [this.agent.wallet], {
            commitment: 'processed',
        });

        return {
            txHash: txHash,
            sharesAta: strategyWithAddress.address,
            sharesMintData: null,
            tokenAAta: strategyWithAddress.strategy.tokenAMint,
            tokenAData: null,
            tokenBAta: strategyWithAddress.strategy.tokenBMint,
            tokenBData: null
        }
    }


}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kaminoOperations = void 0;
const web3_js_1 = require("@solana/web3.js");
const kliquidity_sdk_1 = require("@kamino-finance/kliquidity-sdk");
const decimal_js_1 = __importDefault(require("decimal.js"));
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const crypto_1 = __importDefault(require("crypto"));
const default_1 = require("../../config/default");
const SmartRoundRobinRPC_1 = require("../../utils/SmartRoundRobinRPC");
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
class kaminoOperations {
    constructor(agent) {
        this.agent = agent;
        this.strategyPubkey = new web3_js_1.PublicKey("2H4xebnp2M9JYgPPfUw58uUQahWF8f1YTNxwwtmdqVYV");
        this.kamino = new kliquidity_sdk_1.Kamino('mainnet-beta', new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)('mainnet-beta')));
        this.currentTransportIndex = 0;
        this.agent = agent;
        if (this.agent) {
            this.kamino = this.kaminoInitModule();
        }
    }
    ;
    getNextTransportUrl() {
        this.currentTransportIndex = (this.currentTransportIndex + 1) % SmartRoundRobinRPC_1.transportUrls.length;
        return SmartRoundRobinRPC_1.transportUrls[this.currentTransportIndex];
    }
    async handleRpcError(fn) {
        try {
            return await fn();
        }
        catch (error) {
            if (error.message.includes('410 Gone')) {
                console.warn('RPC error detected, rotating transport URL...');
                const nextUrl = this.getNextTransportUrl();
                console.log(`Switching to next RPC endpoint: ${nextUrl}`);
                this.kamino = new kliquidity_sdk_1.Kamino('mainnet-beta', new web3_js_1.Connection(nextUrl));
                return await fn();
            }
            throw error;
        }
    }
    // Example usage of handleRpcError
    async getAllKaminostrategies(strategyCount = 1000) {
        return this.handleRpcError(async () => {
            const strategies = (await this.kamino.getStrategies()).slice(0, strategyCount);
            return strategies;
        });
    }
    kaminoInitModule() {
        const connection = new web3_js_1.Connection(SmartRoundRobinRPC_1.transportUrls[this.currentTransportIndex]);
        return new kliquidity_sdk_1.Kamino('mainnet-beta', connection);
    }
    // Encrypt
    encrypt(text, algorithm = 'aes-256-cbc', secretKey = crypto_1.default.createHash('sha256').update('your-super-secret-key').digest(), iv = crypto_1.default.randomBytes(16)) {
        const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
        return iv.toString('hex') + ':' + encrypted.toString('hex');
    }
    // Decrypt
    decrypt(encryptedText, algorithm = 'aes-256-cbc', secretKey = crypto_1.default.createHash('sha256').update('your-super-secret-key').digest()) {
        const [ivHex, encryptedHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    }
    /**
     *
     */
    async kaminoGetStrategy(strategyPubkey = this.strategyPubkey) {
        const strategy = await this.kamino.getStrategyByAddress(strategyPubkey);
        if (!strategy) {
            return null;
        }
        return { strategy: strategy, strategyPubkey };
    }
    // get specific strategy
    async getKaminoCustomStrategy(yourStrategyAddress) {
        return await this.kamino.getStrategyByAddress(yourStrategyAddress);
    }
    // get strategy share price
    async getKaminoSharePrice(yourStrategyAddress) {
        return await this.kamino.getStrategySharePrice(yourStrategyAddress);
    }
    // get token holders of a strategy
    async getKaminoHolders(usdhUsdtStrategy) {
        return await this.kamino.getStrategyHolders(usdhUsdtStrategy);
    }
    // get strategy share price
    async getKaminoStrategyPrice(usdhUsdtStrategy) {
        return await this.kamino.getStrategySharePrice(usdhUsdtStrategy);
    }
    decodeMemoData(memoData) {
        const decodedData = memoData.toString('utf8');
        return decodedData;
    }
    async claimRewards(use_strategy) {
        const strategy = await this.kaminoGetStrategy();
        if (!strategy) {
            throw new Error("Strategy not found");
        }
        const { strategy: whirlpoolStrategy } = strategy;
        if (!whirlpoolStrategy) {
            throw new Error("Whirlpool strategy not found");
        }
        const claimIx = await this.kamino.collectFeesAndRewards({ strategy: use_strategy ? use_strategy : whirlpoolStrategy, address: this.strategyPubkey }, this.agent.wallet.publicKey);
        const tx = new web3_js_1.Transaction().add(claimIx);
        const txSig = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, tx, [this.agent.wallet], {
            commitment: "processed",
        });
        console.log("Claim transaction signature:", txSig);
    }
    async createMemoWithStrategyKey(connection, payer, strategyPubkey, // Strategia da scrivere nel memo
    pdaVector // PDA come "vettore"
    ) {
        const configManager = new default_1.ConfigManager();
        let { strategyKey, strategyKeyLength } = { strategyKey: configManager.getDefaultConfig().strategy_key, strategyKeyLength: configManager.getDefaultConfig().strategy_key.length };
        let newStrategyKey;
        if (strategyKey.trim() === "") {
            newStrategyKey = Buffer.from(payer.publicKey.toBase58() + '/oobe_kamino', 'utf8');
        }
        else {
            newStrategyKey = Buffer.from(strategyKey, 'utf8');
        }
        const memoData = strategyPubkey.toBase58();
        const algorithm = 'aes-256-cbc';
        const key = crypto_1.default.createHash('sha256').update(strategyKeyLength !== 0 ? strategyKey : newStrategyKey).digest(); // 32-byte key    
        const iv = crypto_1.default.randomBytes(16); // 16-byte IV
        const encrypted = this.encrypt(memoData, algorithm, key, iv);
        const encoded_data = Buffer.from(encrypted, 'utf8');
        const memoIx = new web3_js_1.TransactionInstruction({
            programId: raydium_sdk_v2_1.MEMO_PROGRAM_ID2,
            keys: [
                {
                    pubkey: pdaVector,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            data: encoded_data,
        });
        const tx = new web3_js_1.Transaction().add(memoIx);
        const txSig = await (0, web3_js_1.sendAndConfirmTransaction)(connection, tx, [payer], {
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
    async getAssociatedForTokensAndShares(strategy) {
        const resolvedStrategy = strategy;
        if (!resolvedStrategy) {
            return null;
        }
        const { strategy: whirlpoolStrategy } = resolvedStrategy;
        if (!whirlpoolStrategy) {
            return null;
        }
        const [sharesAta, sharesMintData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, whirlpoolStrategy.sharesMint, this.agent.wallet.publicKey);
        const [tokenAAta, tokenAData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, whirlpoolStrategy.tokenAMint, this.agent.wallet.publicKey);
        const [tokenBAta, tokenBData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, whirlpoolStrategy.tokenBMint, this.agent.wallet.publicKey);
        return {
            sharesAta,
            sharesMintData,
            tokenAAta,
            tokenAData,
            tokenBAta,
            tokenBData
        };
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
    async depositShares(strategyPubkey, amountUSDH, amountUSDC) {
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
        let tx = (0, kliquidity_sdk_1.createTransactionWithExtraBudget)(this.agent.wallet.publicKey.toBuffer().length);
        // add creation of associated token addresses to the transaction instructions if they don't exist
        const ataInstructions = await this.kamino.getCreateAssociatedTokenAccountInstructionsIfNotExist(this.agent.wallet.publicKey, { strategy: strategy.strategy, address: strategy.strategyPubkey }, tokenAData, tokenAAta, tokenBData, tokenBAta, sharesMintData, sharesAta);
        if (ataInstructions.length > 0) {
            tx.add(...ataInstructions);
        }
        if (!strategy.strategy) {
            throw new Error("Strategy not found");
        }
        // specify amount of token A and B to deposit, e.g. to deposit 5 USDH and 5 USDC:
        const depositIx = await this.kamino.deposit({ strategy: strategy.strategy, address: strategy.strategyPubkey }, new decimal_js_1.default(amountUSDH), new decimal_js_1.default(amountUSDC), this.agent.wallet.publicKey);
        tx.add(depositIx);
        // assign block hash, block height and fee payer to the transaction
        tx = await (0, kliquidity_sdk_1.assignBlockInfoToTransaction)(this.agent.connection, tx, this.agent.wallet.publicKey);
        const txHash = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, tx, [this.agent.wallet], {
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
        };
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
    async withdrawShares(strategyPubkey, amountUSDH, amountUSDC) {
        // get on-chain data for a Kamino strategy
        const strategy = await this.kamino.getStrategyByAddress(strategyPubkey);
        if (!strategy) {
            throw Error('Could not fetch strategy from the chain');
        }
        const strategyWithAddress = { strategy, address: strategyPubkey };
        // check if associated token addresses exist for token A, B and shares
        const [sharesAta, sharesMintData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, strategy.sharesMint, this.agent.wallet.publicKey);
        const [tokenAAta, tokenAData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, strategy.tokenAMint, this.agent.wallet.publicKey);
        const [tokenBAta, tokenBData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, strategy.tokenBMint, this.agent.wallet.publicKey);
        // create a transaction that has an instruction for extra compute budget (withdraw operation needs this),
        let tx = (0, kliquidity_sdk_1.createTransactionWithExtraBudget)(this.agent.wallet.publicKey.toBuffer().length);
        // add creation of associated token addresses to the transaction instructions if they don't exist
        const ataInstructions = await this.kamino.getCreateAssociatedTokenAccountInstructionsIfNotExist(this.agent.wallet.publicKey, strategyWithAddress, tokenAData, tokenAAta, tokenBData, tokenBAta, sharesMintData, sharesAta);
        if (ataInstructions.length > 0) {
            tx.add(...ataInstructions);
        }
        // withdraw all strategy shares from the wallet:
        const withdrawIxns = await this.kamino.withdrawAllShares(strategyWithAddress, this.agent.wallet.publicKey);
        if (withdrawIxns) {
            tx.add(...(Array.isArray(withdrawIxns) ? withdrawIxns : [withdrawIxns]));
        }
        else {
            console.log('Wallet balance is 0 shares, cant withdraw any');
            return null;
        }
        // assign block hash, block height and fee payer to the transaction
        tx = await (0, kliquidity_sdk_1.assignBlockInfoToTransaction)(this.agent.connection, tx, this.agent.wallet.publicKey);
        const txHash = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, tx, [this.agent.wallet], {
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
        };
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
    async GET_STRATEGY_INFO(strategyPubkey) {
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
        };
    }
    /**
     * @name CREATE_CAMINO_STRATEGY
     */
    async CREATE_CAMINO_STRATEGY(PoolAddress, isOrca) {
        // generate a new strategy public key
        const newStrategy = web3_js_1.Keypair.generate();
        // setup fee payer (wallet) that will sign the transaction and own the strategy
        const signer = this.agent.wallet;
        const owner = signer.publicKey; // or use different public key for owner (admin)
        const kamino = this.kamino;
        let whirlpoolState = null;
        let raydiumPoolState = null;
        let whirlpoolHandle = null;
        if (isOrca) {
            // depending on the DEX you want to use for your strategy (Orca or Raydium) fetch the pool
            // Orca: get on-chain data for an existing Orca Whirlpool
            const whirlpool = new web3_js_1.PublicKey(PoolAddress);
            whirlpoolState = await kamino.getWhirlpoolByAddress(whirlpool);
            if (!whirlpool) {
                throw Error('Could not fetch Orca whirlpool from the chain');
            }
        }
        else {
            // Raydium: get on-chain data for an existing Raydium CLMM pool
            const raydiumPool = new web3_js_1.PublicKey(PoolAddress);
            raydiumPoolState = await kamino.getWhirlpoolByAddress(raydiumPool);
            if (!raydiumPool) {
                throw Error('Could not fetch Raydium CLMM pool from the chain');
            }
        }
        // create a transaction that has an instruction for extra compute budget
        let tx = (0, kliquidity_sdk_1.createTransactionWithExtraBudget)(signer.publicKey.toBuffer().length);
        // check if associated token addresses exist for token A or B
        let tokenMintA;
        let tokenMintB;
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
        const [tokenAAta, tokenAData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, tokenMintA, owner);
        const [tokenBAta, tokenBData] = await (0, kliquidity_sdk_1.getAssociatedTokenAddressAndData)(this.agent.connection, tokenMintB, owner);
        if (!tokenAData) {
            tx.add((0, kliquidity_sdk_1.createAssociatedTokenAccountInstruction)(owner, tokenAAta, owner, tokenMintA));
        }
        if (!tokenBData) {
            tx.add((0, kliquidity_sdk_1.createAssociatedTokenAccountInstruction)(owner, tokenBAta, owner, tokenMintB));
        }
        // create a rent exempt strategy account that will contain the Kamino strategy
        const createStrategyAccountIx = await kamino.createStrategyAccount(owner, newStrategy.publicKey);
        tx.add(createStrategyAccountIx);
        // create the actual strategy with USDH as token A and USDC as token B (note: the tokens in the pool should match the tokens in the strategy)
        const poolState = whirlpoolHandle === "Raydium" ? raydiumPoolState : whirlpoolState;
        if (!poolState) {
            throw new Error("Pool state is null");
        }
        const createStrategyIx = await kamino.createStrategy(newStrategy.publicKey, new web3_js_1.PublicKey(PoolAddress), this.agent.wallet.publicKey, isOrca ? "ORCA" : "RAYDIUM");
        tx.add(createStrategyIx);
        tx = await (0, kliquidity_sdk_1.assignBlockInfoToTransaction)(this.agent.connection, tx, owner);
        const txHash = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, tx, [signer, newStrategy], {
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
        };
    }
    /**
     * @name COLLECT_FEES_REWARDS
     */
    async COLLECT_FEES_REWARDS(strategyPubkey) {
        // create a transaction that has an instruction for extra compute budget
        let tx = (0, kliquidity_sdk_1.createTransactionWithExtraBudget)(this.agent.wallet.publicKey.toBuffer().length);
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
        tx = await (0, kliquidity_sdk_1.assignBlockInfoToTransaction)(this.agent.connection, tx, this.agent.wallet.publicKey);
        //fast way commitment
        const txHash = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, tx, [this.agent.wallet], {
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
        };
    }
}
exports.kaminoOperations = kaminoOperations;
//# sourceMappingURL=kamino.operation.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RayOperation = void 0;
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const web3_js_1 = require("@solana/web3.js");
const axios_1 = __importDefault(require("axios"));
const bytes_1 = require("@coral-xyz/anchor/dist/cjs/utils/bytes");
const core_1 = require("openai/core");
const spl_token_1 = require("@solana/spl-token");
const spl_token_0_4_9_1 = require("@solana/spl-token@0.4.9");
class RayOperation {
    constructor(_agent) {
        this.agent = _agent;
        this.initialize().catch(error => {
            console.error("Error initializing Raydium SDK:", error);
            throw new Error("Failed to initialize Raydium SDK");
        });
    }
    async initialize() {
        this.raydium = await raydium_sdk_v2_1.Raydium.load({
            connection: this.agent.connection,
            owner: this.agent.wallet,
        });
    }
    async getNewPools() {
        const programId = new web3_js_1.PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");
        const quoteMintBytes = RayOperation.quoteToken.mint.toBase58();
        const marketProgramBytes = raydium_sdk_v2_1.OPEN_BOOK_PROGRAM.toBase58();
        const statusBytes = bytes_1.bs58.encode([6, 0, 0, 0, 0, 0, 0, 0]);
        let existingLiquidityPools = new Set();
        let existingOpenBookMarkets = new Set();
        this.agent.connection.onProgramAccountChange(programId, async (updatedAccountInfo) => {
            const key = updatedAccountInfo.accountId.toBase58();
            if (existingLiquidityPools.has(key))
                return;
            try {
                const poolState = raydium_sdk_v2_1.liquidityStateV4Layout.decode(updatedAccountInfo.accountInfo.data);
                existingLiquidityPools.add(key);
            }
            catch (error) {
                console.error(`Error processing liquidity pool ${key}:`, error);
            }
        }, "confirmed", [
            { dataSize: raydium_sdk_v2_1.liquidityStateV4Layout.span },
            { memcmp: { offset: raydium_sdk_v2_1.liquidityStateV4Layout.offsetOf("quoteMint"), bytes: quoteMintBytes } },
            { memcmp: { offset: raydium_sdk_v2_1.liquidityStateV4Layout.offsetOf("marketProgramId"), bytes: marketProgramBytes } },
            { memcmp: { offset: raydium_sdk_v2_1.liquidityStateV4Layout.offsetOf("status"), bytes: statusBytes } },
        ]);
        this.agent.connection.onProgramAccountChange(raydium_sdk_v2_1.OPEN_BOOK_PROGRAM, async (updatedAccountInfo) => {
            const key = updatedAccountInfo.accountId.toString();
            const existing = existingOpenBookMarkets.has(key);
            if (!existing) {
                existingOpenBookMarkets.add(key);
                //const _ = processOpenBookMarket(updatedAccountInfo);
            }
        }, 'confirmed', [
            { dataSize: raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.span },
            {
                memcmp: {
                    offset: raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.offsetOf('quoteMint'),
                    bytes: RayOperation.quoteToken.mint.toBase58(),
                },
            },
        ]);
        const pools = await this.fetchAndDecodePools();
        const detailedPools = await Promise.all(pools.map(async (pool) => {
            if (!pool)
                return null;
            const baseToken = await this.fetchTokenMetadata(pool.baseMint);
            const quoteToken = await this.fetchTokenMetadata(pool.quoteMint);
            return { pool, baseToken, quoteToken };
        }));
        return detailedPools;
    }
    async getFungibleTokens(walletAddress, connection) {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(new web3_js_1.PublicKey(walletAddress), { programId: new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") });
        const fungibleTokens = [];
        for (const account of tokenAccounts.value) {
            const mintAddress = account.account.data.parsed.info.mint;
            try {
                const mintInfo = await (0, spl_token_0_4_9_1.getMint)(connection, new web3_js_1.PublicKey(mintAddress));
                // Se il token ha più di 0 decimali, lo consideriamo fungibile
                if (mintInfo.decimals > 0) {
                    fungibleTokens.push({
                        mint: mintAddress,
                        decimals: mintInfo.decimals
                    });
                }
            }
            catch (error) {
                console.error(`Failed to fetch mint info for ${mintAddress}`, error);
            }
        }
        return fungibleTokens;
    }
    async fetchAndDecodePools() {
        const limitedPools = Array.from(RayOperation.existingLiquidityPools).slice(0, 5);
        return await Promise.all(limitedPools.map(async (poolKey) => {
            return this.decodeLiquidityPool(new web3_js_1.PublicKey(poolKey));
        }));
    }
    async fetchTokenMetadata(mint) {
        try {
            const tokenAccountInfo = await this.agent.connection.getParsedAccountInfo(mint);
            if (tokenAccountInfo.value?.data) {
                if ('parsed' in tokenAccountInfo.value.data) {
                    const tokenData = tokenAccountInfo.value.data.parsed.info;
                    return {
                        mint: mint.toBase58(),
                        name: tokenData?.name || "Unknown",
                        symbol: tokenData?.symbol || "UNK",
                        decimals: tokenData?.decimals || 0,
                    };
                }
            }
        }
        catch (error) {
            console.error(`Failed to fetch token metadata for ${mint.toBase58()}`, error);
        }
        return { mint: mint.toBase58(), name: "Unknown", symbol: "UNK", decimals: 0 };
    }
    async decodeLiquidityPool(poolKeys) {
        const poolAccountInfo = await this.agent.connection.getAccountInfo(poolKeys);
        if (!poolAccountInfo) {
            console.warn(`Pool not found: ${poolKeys.toBase58()}`);
            return null;
        }
        try {
            return raydium_sdk_v2_1.liquidityStateV4Layout.decode(poolAccountInfo.data);
        }
        catch (error) {
            console.error(`Failed to decode pool: ${poolKeys.toBase58()}`, error);
            return null;
        }
    }
    async processRaydiumPool(id, quoteAmountMinPool, quoteAmountMaxPool, quoteToken = RayOperation.quoteToken, poolState) {
        let rugRiskDanger = false;
        let rugRisk = 'Unknown';
        if (!quoteAmountMinPool.isZero()) {
            const poolSize = new raydium_sdk_v2_1.TokenAmount(quoteToken, poolState.swapQuoteInAmount, true);
            const poolTokenAddress = poolState.baseMint.toString();
            if (poolSize.lt(quoteAmountMinPool) || rugRiskDanger) {
                console.warn(`------------------- POOL SKIPPED | (${poolSize.toFixed()} ${quoteToken.symbol}) ------------------- `);
            }
            else {
                console.info(`--------------!!!!! POOL SNIPED | (${poolSize.toFixed()} ${quoteToken.symbol}) !!!!!-------------- `);
            }
            console.info(`Pool link: https://dexscreener.com/solana/${id.toString()}`);
            console.info(`Pool Open Time: ${new Date(parseInt(poolState.poolOpenTime.toString()) * 1000).toLocaleString()}`);
            console.info(`--------------------- `);
            if (poolSize.lt(quoteAmountMinPool) || rugRiskDanger) {
                return;
            }
            console.info(`Pool ID: ${id.toString()}`);
            console.info(`Pool link: https://dexscreener.com/solana/${id.toString()}`);
            console.info(`Pool SOL size: ${poolSize.toFixed()} ${quoteToken.symbol}`);
            console.info(`Base Mint: ${poolState.baseMint}`);
            console.info(`Pool Status: ${poolState.status}`);
        }
        if (!quoteAmountMaxPool.isZero()) {
            const poolSize = new raydium_sdk_v2_1.TokenAmount(quoteToken, poolState.swapQuoteInAmount, true);
            if (poolSize.gt(quoteAmountMaxPool)) {
                console.warn({
                    mint: poolState.baseMint,
                    pooled: `${poolSize.toFixed()} ${quoteToken.symbol}`,
                }, `Skipping pool, > ${quoteAmountMaxPool.toFixed()} ${quoteToken.symbol}`, `Swap amount: ${poolSize.toFixed()}`);
                console.info(`---------------------------------------- \n`);
                return;
            }
        }
    }
    async createPoolKeys(id, accountData, minimalMarketLayoutV3) {
        return {
            id,
            baseMint: accountData.baseMint,
            quoteMint: accountData.quoteMint,
            lpMint: accountData.lpMint,
            baseDecimals: accountData.baseDecimal.toNumber(),
            quoteDecimals: accountData.quoteDecimal.toNumber(),
            lpDecimals: 5,
            version: 4,
            programId: raydium_sdk_v2_1.LIQUIDITY_POOL_PROGRAM_ID_V5_MODEL,
            authority: (0, raydium_sdk_v2_1.getAssociatedAuthority)({
                programId: raydium_sdk_v2_1.LIQUIDITY_POOL_PROGRAM_ID_V5_MODEL,
                poolId: id,
            }).publicKey,
            openOrders: accountData.openOrders,
            targetOrders: accountData.targetOrders,
            baseVault: accountData.baseVault,
            quoteVault: accountData.quoteVault,
            marketVersion: 3,
            marketProgramId: accountData.marketProgramId,
            marketId: accountData.marketId,
            marketAuthority: raydium_sdk_v2_1.Market.getAssociatedAuthority({
                programId: accountData.marketProgramId,
                marketId: accountData.marketId,
            }).publicKey,
            withdrawQueue: accountData.withdrawQueue,
            lpVault: accountData.lpVault,
            lookupTableAccount: web3_js_1.PublicKey.default,
            nonce: accountData.nonce.toNumber(),
            configId: minimalMarketLayoutV3.configId
        };
    }
    // Define a function to fetch and decode OpenBook accounts
    async fetchOpenBookAccounts(connection, baseMint, quoteMint, commitment) {
        const accounts = await connection.getProgramAccounts(raydium_sdk_v2_1.OPEN_BOOK_PROGRAM, {
            commitment,
            filters: [
                { dataSize: raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.span },
                {
                    memcmp: {
                        offset: raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.offsetOf("baseMint"),
                        bytes: baseMint.toBase58(),
                    },
                },
                {
                    memcmp: {
                        offset: raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.offsetOf("quoteMint"),
                        bytes: quoteMint.toBase58(),
                    },
                },
            ],
        });
        return accounts.map(({ account }) => raydium_sdk_v2_1.MARKET_STATE_LAYOUT_V3.decode(account.data));
    }
    async parseTokenAccountData() {
        const accountInfo = await this.agent.connection.getAccountInfo(this.agent.wallet.publicKey);
        const [tokenAccountResp, tokenAccount2022] = await Promise.all([
            this.agent.connection.getTokenAccountsByOwner(this.agent.wallet.publicKey, { programId: PROGRA }),
            this.agent.connection.getTokenAccountsByOwner(this.agent.wallet.publicKey, { programId: PROGRAM_2022 }),
        ]);
        return (0, raydium_sdk_v2_1.parseTokenAccountResp)({
            owner: this.agent.wallet.publicKey,
            solAccountResp: accountInfo,
            tokenAccountResp: {
                context: tokenAccountResp.context,
                value: [...tokenAccountResp.value, ...tokenAccount2022.value],
            },
        });
    }
    validateTradeInput(input) {
        const requiredParams = ["tokenMint", "amount", "slippage"];
        for (const param of requiredParams) {
            if (!input[param])
                throw new Error(`Missing required parameter: ${param}`);
        }
        if (input.amount <= 0)
            throw new Error("Amount must be greater than zero");
        if (input.slippage < 0 || input.slippage > 18)
            throw new Error("Slippage must be between 0 and 18");
    }
    async buyRaydiumToken(input) {
        return this.apiSwapIn(input);
    }
    async sellRaydiumToken(input) {
        return this.apiSwapOut(input);
    }
    async apiSwapIn(input) {
        const { tokenNative, tokenMint, amount, slippage } = input;
        const txVersion = 'V0'; // or LEGACY
        const isV0Tx = txVersion === 'V0';
        const _amountConvertedLamports = amount * 1000000000;
        const isInputSol = true;
        const isOutputSol = false;
        const { tokenAccounts } = await this.parseTokenAccountData();
        let inputTokenAcc = this.agent.wallet.publicKey;
        let outputTokenAcc = tokenAccounts.find(a => a.mint.toBase58() === tokenMint)?.publicKey;
        console.log(inputTokenAcc, outputTokenAcc);
        if (!inputTokenAcc && !isInputSol) {
            console.error('You dont have enough SOL in your wallet');
            return;
        }
        console.log('is a BUY transaction:', true);
        const { data: feeData } = await axios_1.default.get(`${raydium_sdk_v2_1.API_URLS.BASE_HOST}${raydium_sdk_v2_1.API_URLS.PRIORITY_FEE}`);
        const { data: swapResponse } = await axios_1.default.get(`${raydium_sdk_v2_1.API_URLS.SWAP_HOST}/compute/swap-base-in?inputMint=${tokenNative}&outputMint=${tokenMint}&amount=${_amountConvertedLamports}&slippageBps=${slippage * 100}&txVersion=${txVersion}`);
        const { data: swapTransactions } = await axios_1.default.post(`${raydium_sdk_v2_1.API_URLS.SWAP_HOST}/transaction/swap-base-in`, {
            computeUnitPriceMicroLamports: String(feeData.data.default.h),
            swapResponse,
            txVersion,
            wallet: this.agent.wallet.publicKey.toBase58(),
            wrapSol: isInputSol,
            unwrapSol: isOutputSol, // true means output mint receive sol, false means output mint received wsol
            inputAccount: isInputSol ? undefined : inputTokenAcc?.toBase58(),
            outputAccount: isOutputSol ? undefined : outputTokenAcc?.toBase58(),
        });
        if (!swapTransactions || !swapTransactions.data) {
            console.error("Invalid swap transactions response:", swapTransactions);
            throw new Error("Swap transactions response is invalid or undefined.");
        }
        console.log(`Swap transactions: ${JSON.stringify(swapTransactions.data)}`);
        const allTxBuf = swapTransactions.data.map((tx) => Buffer.from(tx.transaction, 'base64'));
        const allTransactions = allTxBuf.map((txBuf) => isV0Tx ? web3_js_1.VersionedTransaction.deserialize(txBuf) : web3_js_1.Transaction.from(txBuf));
        console.log(`Total ${allTransactions.length} transactions to process.`);
        let idx = 0;
        let _txId;
        for (const tx of allTransactions) {
            idx++;
            console.log(`Sending transaction ${idx}...`);
            if (!isV0Tx) {
                const transaction = tx;
                transaction.sign(this.agent.wallet);
                const txId = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, transaction, [this.agent.wallet], { skipPreflight: true });
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
            else {
                const transaction = tx;
                transaction.sign([this.agent.wallet]);
                const txId = await this.agent.connection.sendTransaction(transaction, { skipPreflight: true });
                const { lastValidBlockHeight, blockhash } = await this.agent.connection.getLatestBlockhash({ commitment: 'finalized' });
                _txId = txId;
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
        }
        const mintInfo = await this.agent.connection.getParsedAccountInfo(new web3_js_1.PublicKey(tokenMint));
        let decimals = 6;
        if (mintInfo.value?.data && 'parsed' in mintInfo.value.data) {
            decimals = mintInfo.value.data.parsed.info.decimals;
        }
        return { status: 'success', bought: amount, tokens: Number(swapResponse.data.outputAmount) / (10 ** decimals), message: 'Swap-in transactions processed successfully.', txId: _txId };
    }
    async apiSwapOut(input) {
        const { tokenNative, tokenMint, amount, slippage } = input;
        const txVersion = 'V0'; // or LEGACY
        const isV0Tx = txVersion === 'V0';
        const _amountConvertedLamports = amount * 1000000000;
        const isInputSol = false;
        const isOutputSol = true;
        const { tokenAccounts } = await this.parseTokenAccountData();
        let inputTokenAcc = tokenAccounts.find(a => a.mint.toBase58() === tokenMint)?.publicKey;
        let outputTokenAcc = this.agent.wallet.publicKey;
        console.log(inputTokenAcc, outputTokenAcc);
        if (!inputTokenAcc && !isInputSol) {
            console.error('You do not have the required token in your wallet');
            return;
        }
        const balance = await this.agent.connection.getTokenAccountBalance(inputTokenAcc ?? (() => { throw new Error("inputTokenAcc is undefined"); })());
        console.log('is a SELL transaction:', true);
        const { data: feeData } = await axios_1.default.get(`${raydium_sdk_v2_1.API_URLS.BASE_HOST}${raydium_sdk_v2_1.API_URLS.PRIORITY_FEE}`);
        let swapResponse;
        let maxRetry = 3;
        let retryCount = 0;
        let currentSlippage = slippage;
        while (retryCount < maxRetry) {
            try {
                const { data: _swapResponse } = await axios_1.default.get(`${raydium_sdk_v2_1.API_URLS.SWAP_HOST}/compute/swap-base-in?inputMint=${tokenNative}&outputMint=${tokenMint}&amount=${_amountConvertedLamports}&slippageBps=${currentSlippage * 100}&txVersion=${txVersion}`);
                swapResponse = _swapResponse;
                break; // Exit the loop if successful
            }
            catch (e) {
                console.error(`Error fetching swap response, attempt ${retryCount + 1}:`, e);
                retryCount += 1;
                currentSlippage += 0.5; // Increase slippage by 0.5 for each retry
                await (0, core_1.sleep)(1000); // Wait before retrying
            }
        }
        const { data: swapTransactions } = await axios_1.default.post(`${raydium_sdk_v2_1.API_URLS.SWAP_HOST}/transaction/swap-base-out`, {
            computeUnitPriceMicroLamports: String(feeData.data.default.h),
            swapResponse,
            txVersion,
            wallet: this.agent.wallet.publicKey.toBase58(),
            wrapSol: isInputSol,
            unwrapSol: isOutputSol, // true means output mint receive sol, false means output mint received wsol
            inputAccount: isInputSol ? undefined : inputTokenAcc?.toBase58(),
            outputAccount: isOutputSol ? undefined : outputTokenAcc?.toBase58(),
        });
        if (!swapTransactions || !swapTransactions.data) {
            console.error("Invalid swap transactions response:", swapTransactions);
            throw new Error("Swap transactions response is invalid or undefined.");
        }
        console.log(`Swap transactions: ${JSON.stringify(swapTransactions.data)}`);
        const allTxBuf = swapTransactions.data.map((tx) => Buffer.from(tx.transaction, 'base64'));
        const allTransactions = allTxBuf.map((txBuf) => isV0Tx ? web3_js_1.VersionedTransaction.deserialize(txBuf) : web3_js_1.Transaction.from(txBuf));
        console.log(`Total ${allTransactions.length} transactions to process.`);
        let idx = 0;
        let _txId;
        for (const tx of allTransactions) {
            idx++;
            console.log(`Sending transaction ${idx}...`);
            if (!isV0Tx) {
                const transaction = tx;
                transaction.sign(this.agent.wallet);
                const txId = await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, transaction, [this.agent.wallet], { skipPreflight: true });
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
            else {
                const transaction = tx;
                transaction.sign([this.agent.wallet]);
                const txId = await this.agent.connection.sendTransaction(transaction, { skipPreflight: true });
                const { lastValidBlockHeight, blockhash } = await this.agent.connection.getLatestBlockhash({ commitment: 'finalized' });
                _txId = txId;
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
        }
        const mintInfo = await this.agent.connection.getParsedAccountInfo(new web3_js_1.PublicKey(tokenMint));
        let decimals = 6;
        if (mintInfo.value?.data && 'parsed' in mintInfo.value.data) {
            decimals = mintInfo.value.data.parsed.info.decimals;
        }
        return { status: 'success', sold: amount, tokens: Number(swapResponse.data.outputAmount) / (10 ** decimals), message: 'Swap-out transactions processed successfully.', txId: _txId };
    }
    async createAssociatedTokenAccount(mint) {
        const mintPublicKey = new web3_js_1.PublicKey(mint);
        const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(this.agent.connection, this.agent.wallet, mintPublicKey, this.agent.wallet.publicKey);
        return associatedTokenAccount.address;
    }
}
exports.RayOperation = RayOperation;
RayOperation.existingLiquidityPools = new Set();
RayOperation.quoteToken = new raydium_sdk_v2_1.Token({ mint: spl_token_1.NATIVE_MINT.toBase58(), decimals: 9 });
RayOperation.MINIMAL_MARKET_STATE_LAYOUT_V3 = (0, raydium_sdk_v2_1.struct)([
    (0, raydium_sdk_v2_1.publicKey)("eventQueue"),
    (0, raydium_sdk_v2_1.publicKey)("bids"),
    (0, raydium_sdk_v2_1.publicKey)("asks"),
]);
RayOperation.GET_ONLY = 20;
//# sourceMappingURL=ray.operation.js.map
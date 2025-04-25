import { Agent } from "../../agent/Agents";
import { ApiPoolInfoV4, ApiV3PoolInfoBaseItem, BasicPoolInfo, LiquidityPoolKeys, MARKET_STATE_LAYOUT_V3, OPEN_BOOK_PROGRAM, parseTokenAccountResp, Percent, PoolAccountInfoV4, Raydium, toFeeConfig, Token, TokenAccount, TokenAccountRaw, TokenAmount, API_URLS, publicKey, struct, LiquidityStateV4, getAssociatedAuthority, Market, liquidityStateV4Layout, LIQUIDITY_POOL_PROGRAM_ID_V5_MODEL } from "@raydium-io/raydium-sdk-v2";
import { Connection, PublicKey, Signer, Transaction, VersionedTransaction, sendAndConfirmTransaction } from "@solana/web3.js";
import axios from 'axios';
import { filterRayMainnet } from "../filterRayMainnet";
import { bs58 } from "@coral-xyz/anchor/dist/cjs/utils/bytes";
import { sleep } from "openai/core";
import { SwapCompute } from "../../types/ray.interface";
import { NATIVE_MINT, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from "spl-v1";
import { getOrCreateAssociatedTokenAccount, getMint } from 'spl-v1';

export class RayOperation {
    private agent: Agent;
    private raydium!: Raydium;
    private static existingLiquidityPools: Set<string> = new Set<string>();
    private static quoteToken: Token = new Token({ mint: NATIVE_MINT.toBase58(), decimals: 9 })
    private static readonly MINIMAL_MARKET_STATE_LAYOUT_V3 = struct([
        publicKey("eventQueue"),
        publicKey("bids"),
        publicKey("asks"),
    ]);

    private static readonly GET_ONLY = 20;
    constructor(_agent: Agent) {
        this.agent = _agent;
        this.initialize().catch(error => {
            console.error("Error initializing Raydium SDK:", error);
            throw new Error("Failed to initialize Raydium SDK");
        });
    }

    private async initialize() {
        this.raydium = await Raydium.load({
            connection: this.agent.connection,
            owner: this.agent.wallet,
        });
    }

    async getNewPools() {
        const programId = new PublicKey("675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8");
        const quoteMintBytes = RayOperation.quoteToken.mint.toBase58();
        const marketProgramBytes = OPEN_BOOK_PROGRAM.toBase58();
        const statusBytes = bs58.encode([6, 0, 0, 0, 0, 0, 0, 0]);
        let existingLiquidityPools: Set<string> = new Set<string>();
        let existingOpenBookMarkets: Set<string> = new Set<string>();

        this.agent.connection.onProgramAccountChange(
            programId,
            async (updatedAccountInfo) => {
                const key = updatedAccountInfo.accountId.toBase58();
                if (existingLiquidityPools.has(key)) return;
                try {
                    const poolState = liquidityStateV4Layout.decode(updatedAccountInfo.accountInfo.data);
                    existingLiquidityPools.add(key);
                } catch (error) {
                    console.error(`Error processing liquidity pool ${key}:`, error);
                }
            },
            "confirmed",
            [
                { dataSize: liquidityStateV4Layout.span },
                { memcmp: { offset: liquidityStateV4Layout.offsetOf("quoteMint"), bytes: quoteMintBytes } },
                { memcmp: { offset: liquidityStateV4Layout.offsetOf("marketProgramId"), bytes: marketProgramBytes } },
                { memcmp: { offset: liquidityStateV4Layout.offsetOf("status"), bytes: statusBytes } },
            ]
        );

        this.agent.connection.onProgramAccountChange(
            OPEN_BOOK_PROGRAM,
            async (updatedAccountInfo) => {
                const key = updatedAccountInfo.accountId.toString();
                const existing = existingOpenBookMarkets.has(key);
                if (!existing) {
                    existingOpenBookMarkets.add(key);
                    //const _ = processOpenBookMarket(updatedAccountInfo);
                }
            },
            'confirmed',
            [
                { dataSize: MARKET_STATE_LAYOUT_V3.span },
                {
                    memcmp: {
                        offset: MARKET_STATE_LAYOUT_V3.offsetOf('quoteMint'),
                        bytes: RayOperation.quoteToken.mint.toBase58(),
                    },
                },
            ],
        );

        const pools = await this.fetchAndDecodePools();
        const detailedPools = await Promise.all(
            pools.map(async (pool) => {
                if (!pool) return null;
                const baseToken = await this.fetchTokenMetadata(pool.baseMint);
                const quoteToken = await this.fetchTokenMetadata(pool.quoteMint);
                return { pool, baseToken, quoteToken };
            })
        );
        return detailedPools;
    }


    async getFungibleTokens(walletAddress: string, connection: Connection) {
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
            new PublicKey(walletAddress),
            { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") }
        );

        const fungibleTokens = [];

        for (const account of tokenAccounts.value) {
            const mintAddress = account.account.data.parsed.info.mint;
            try {
                const mintInfo = await getMint(connection, new PublicKey(mintAddress));

                // Se il token ha più di 0 decimali, lo consideriamo fungibile
                if (mintInfo.decimals > 0) {
                    fungibleTokens.push({
                        mint: mintAddress,
                        decimals: mintInfo.decimals
                    });
                }
            } catch (error) {
                console.error(`Failed to fetch mint info for ${mintAddress}`, error);
            }
        }

        return fungibleTokens;
    }


    private async fetchAndDecodePools() {
        const limitedPools = Array.from(RayOperation.existingLiquidityPools).slice(0, 5);
        return await Promise.all(
            limitedPools.map(async (poolKey) => {
                return this.decodeLiquidityPool(new PublicKey(poolKey));
            })
        );
    }

    async fetchTokenMetadata(mint: PublicKey) {
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
        } catch (error) {
            console.error(`Failed to fetch token metadata for ${mint.toBase58()}`, error);
        }
        return { mint: mint.toBase58(), name: "Unknown", symbol: "UNK", decimals: 0 };
    }

    async decodeLiquidityPool(poolKeys: PublicKey) {
        const poolAccountInfo = await this.agent.connection.getAccountInfo(poolKeys);
        if (!poolAccountInfo) {
            console.warn(`Pool not found: ${poolKeys.toBase58()}`);
            return null;
        }
        try {
            return liquidityStateV4Layout.decode(poolAccountInfo.data);
        } catch (error) {
            console.error(`Failed to decode pool: ${poolKeys.toBase58()}`, error);
            return null;
        }
    }

    async processRaydiumPool(id: PublicKey, quoteAmountMinPool: TokenAmount, quoteAmountMaxPool: TokenAmount, quoteToken: Token = RayOperation.quoteToken, poolState: LiquidityStateV4) {

        let rugRiskDanger = false;
        let rugRisk = 'Unknown';

        if (!quoteAmountMinPool.isZero()) {
            const poolSize = new TokenAmount(quoteToken, poolState.swapQuoteInAmount, true);
            const poolTokenAddress = poolState.baseMint.toString();

            if (poolSize.lt(quoteAmountMinPool) || rugRiskDanger) {
                console.warn(`------------------- POOL SKIPPED | (${poolSize.toFixed()} ${quoteToken.symbol}) ------------------- `);
            } else {
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
            const poolSize = new TokenAmount(quoteToken, poolState.swapQuoteInAmount, true);

            if (poolSize.gt(quoteAmountMaxPool)) {
                console.warn(
                    {
                        mint: poolState.baseMint,
                        pooled: `${poolSize.toFixed()} ${quoteToken.symbol}`,
                    },
                    `Skipping pool, > ${quoteAmountMaxPool.toFixed()} ${quoteToken.symbol}`,
                    `Swap amount: ${poolSize.toFixed()}`,
                );
                console.info(`---------------------------------------- \n`);
                return;
            }
        }
    }

    private async createPoolKeys(
        id: PublicKey,
        accountData: LiquidityStateV4,
        minimalMarketLayoutV3: any,
    ): Promise<LiquidityPoolKeys> {
        return {
            id,
            baseMint: accountData.baseMint,
            quoteMint: accountData.quoteMint,
            lpMint: accountData.lpMint,
            baseDecimals: accountData.baseDecimal.toNumber(),
            quoteDecimals: accountData.quoteDecimal.toNumber(),
            lpDecimals: 5,
            version: 4,
            programId: LIQUIDITY_POOL_PROGRAM_ID_V5_MODEL,
            authority: getAssociatedAuthority({
                programId: LIQUIDITY_POOL_PROGRAM_ID_V5_MODEL,
                poolId: id,
            }).publicKey,
            openOrders: accountData.openOrders,
            targetOrders: accountData.targetOrders,
            baseVault: accountData.baseVault,
            quoteVault: accountData.quoteVault,
            marketVersion: 3,
            marketProgramId: accountData.marketProgramId,
            marketId: accountData.marketId,
            marketAuthority: Market.getAssociatedAuthority({
                programId: accountData.marketProgramId,
                marketId: accountData.marketId,
            }).publicKey,
            withdrawQueue: accountData.withdrawQueue,
            lpVault: accountData.lpVault,
            lookupTableAccount: PublicKey.default,
            nonce: accountData.nonce.toNumber(),
            configId: minimalMarketLayoutV3.configId
        };
    }

    // Define a function to fetch and decode OpenBook accounts
    private async fetchOpenBookAccounts(connection: Connection, baseMint: PublicKey, quoteMint: PublicKey, commitment: any) {
        const accounts = await connection.getProgramAccounts(
            OPEN_BOOK_PROGRAM,
            {
                commitment,
                filters: [
                    { dataSize: MARKET_STATE_LAYOUT_V3.span },
                    {
                        memcmp: {
                            offset: MARKET_STATE_LAYOUT_V3.offsetOf("baseMint"),
                            bytes: baseMint.toBase58(),
                        },
                    },
                    {
                        memcmp: {
                            offset: MARKET_STATE_LAYOUT_V3.offsetOf("quoteMint"),
                            bytes: quoteMint.toBase58(),
                        },
                    },
                ],
            }
        );

        return accounts.map(({ account }) => MARKET_STATE_LAYOUT_V3.decode(account.data));
    }

    async parseTokenAccountData(): Promise<{ tokenAccounts: TokenAccount[]; tokenAccountRawInfos: TokenAccountRaw[]; }> {
        const accountInfo = await this.agent.connection.getAccountInfo(this.agent.wallet.publicKey);
        const [tokenAccountResp, tokenAccount2022] = await Promise.all([
            this.agent.connection.getTokenAccountsByOwner(this.agent.wallet.publicKey, { programId: TOKEN_PROGRAM_ID }),
            this.agent.connection.getTokenAccountsByOwner(this.agent.wallet.publicKey, { programId: TOKEN_2022_PROGRAM_ID })
        ]);

        return parseTokenAccountResp({
            owner: this.agent.wallet.publicKey,
            solAccountResp: accountInfo,
            tokenAccountResp: {
                context: tokenAccountResp.context,
                value: [...tokenAccountResp.value, ...tokenAccount2022.value],
            },
        });
    }

    private validateTradeInput(input: Record<string, any>) {
        const requiredParams = ["tokenMint", "amount", "slippage"];
        for (const param of requiredParams) {
            if (!input[param]) throw new Error(`Missing required parameter: ${param}`);
        }
        if (input.amount <= 0) throw new Error("Amount must be greater than zero");
        if (input.slippage < 0 || input.slippage > 18) throw new Error("Slippage must be between 0 and 18");
    }


    public async buyRaydiumToken(input: { tokenNative: string, tokenMint: string, amount: number, slippage: number }) {
        return this.apiSwapIn(input);
    }

    public async sellRaydiumToken(input: { tokenNative: string, tokenMint: string, amount: number, slippage: number }) {
        return this.apiSwapOut(input);
    }


    async apiSwapIn(input: { tokenNative: string, tokenMint: string, amount: number, slippage: number }) {

        const { tokenNative, tokenMint, amount, slippage } = input;
        const txVersion: string = 'V0' // or LEGACY
        const isV0Tx = txVersion === 'V0'
        const _amountConvertedLamports = amount * 1000000000;
        const isInputSol = true
        const isOutputSol = false

        const { tokenAccounts } = await this.parseTokenAccountData();
        let inputTokenAcc = this.agent.wallet.publicKey;
        let outputTokenAcc = tokenAccounts.find(a => a.mint.toBase58() === tokenMint)?.publicKey;

        console.log(inputTokenAcc, outputTokenAcc);
        if (!inputTokenAcc && !isInputSol) {
            console.error('You dont have enough SOL in your wallet');
            return
        }

        console.log('is a BUY transaction:', true);


        const { data: feeData } = await axios.get(`${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`);

        const { data: swapResponse } = await axios.get<SwapCompute>(
            `${API_URLS.SWAP_HOST}/compute/swap-base-in?inputMint=${tokenNative}&outputMint=${tokenMint}&amount=${_amountConvertedLamports}&slippageBps=${slippage * 100}&txVersion=${txVersion}`
        );


        const { data: swapTransactions } = await axios.post<{
            id: string
            version: string
            success: boolean
            data: { transaction: string }[]
        }>(`${API_URLS.SWAP_HOST}/transaction/swap-base-in`, {
            computeUnitPriceMicroLamports: String(feeData.data.default.h),
            swapResponse,
            txVersion,
            wallet: this.agent.wallet.publicKey.toBase58(),
            wrapSol: isInputSol,
            unwrapSol: isOutputSol, // true means output mint receive sol, false means output mint received wsol
            inputAccount: isInputSol ? undefined : inputTokenAcc?.toBase58(),
            outputAccount: isOutputSol ? undefined : outputTokenAcc?.toBase58(),
        })

        if (!swapTransactions || !swapTransactions.data) {
            console.error("Invalid swap transactions response:", swapTransactions);
            throw new Error("Swap transactions response is invalid or undefined.");
        }

        console.log(`Swap transactions: ${JSON.stringify(swapTransactions.data)}`);

        const allTxBuf = swapTransactions.data.map((tx: any) => Buffer.from(tx.transaction, 'base64'));
        const allTransactions = allTxBuf.map((txBuf: any) => isV0Tx ? VersionedTransaction.deserialize(txBuf) : Transaction.from(txBuf));

        console.log(`Total ${allTransactions.length} transactions to process.`);

        let idx = 0;
        let _txId;
        for (const tx of allTransactions) {
            idx++;
            console.log(`Sending transaction ${idx}...`);
            if (!isV0Tx) {
                const transaction = tx as Transaction;
                transaction.sign(this.agent.wallet);
                const txId = await sendAndConfirmTransaction(this.agent.connection, transaction, [this.agent.wallet], { skipPreflight: true });
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            } else {
                const transaction = tx as VersionedTransaction;
                transaction.sign([this.agent.wallet]);
                const txId = await this.agent.connection.sendTransaction(transaction, { skipPreflight: true });
                const { lastValidBlockHeight, blockhash } = await this.agent.connection.getLatestBlockhash({ commitment: 'finalized' });
                _txId = txId;
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
        }

        const mintInfo = await this.agent.connection.getParsedAccountInfo(new PublicKey(tokenMint));
        let decimals = 6;
        if (mintInfo.value?.data && 'parsed' in mintInfo.value.data) {
            decimals = mintInfo.value.data.parsed.info.decimals;
        }

        return { status: 'success', bought: amount, tokens: Number(swapResponse.data.outputAmount) / (10 ** decimals), message: 'Swap-in transactions processed successfully.', txId: _txId };
    }

    async apiSwapOut(input: { tokenNative: string, tokenMint: string, amount: number, slippage: number }) {

        const { tokenNative, tokenMint, amount, slippage } = input;
        const txVersion: string = 'V0'; // or LEGACY
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
        const balance = await this.agent.connection.getTokenAccountBalance(
            inputTokenAcc ?? (() => { throw new Error("inputTokenAcc is undefined"); })()
        );
        console.log('is a SELL transaction:', true);

        const { data: feeData } = await axios.get(`${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`);


        let swapResponse: any;
        let maxRetry = 3;
        let retryCount = 0;
        let currentSlippage = slippage;

        while (retryCount < maxRetry) {
            try {
                const { data: _swapResponse } = await axios.get<SwapCompute>(
                    `${API_URLS.SWAP_HOST}/compute/swap-base-in?inputMint=${tokenNative}&outputMint=${tokenMint}&amount=${_amountConvertedLamports}&slippageBps=${currentSlippage * 100}&txVersion=${txVersion}`
                );
                swapResponse = _swapResponse;
                break; // Exit the loop if successful
            } catch (e) {
                console.error(`Error fetching swap response, attempt ${retryCount + 1}:`, e);
                retryCount += 1;
                currentSlippage += 0.5; // Increase slippage by 0.5 for each retry
                await sleep(1000); // Wait before retrying
            }
        }
        
        const { data: swapTransactions } = await axios.post<{
            id: string;
            version: string;
            success: boolean;
            data: { transaction: string }[];
        }>(`${API_URLS.SWAP_HOST}/transaction/swap-base-out`, {
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

        const allTxBuf = swapTransactions.data.map((tx: any) => Buffer.from(tx.transaction, 'base64'));
        const allTransactions = allTxBuf.map((txBuf: any) => isV0Tx ? VersionedTransaction.deserialize(txBuf) : Transaction.from(txBuf));

        console.log(`Total ${allTransactions.length} transactions to process.`);

        let idx = 0;
        let _txId;
        for (const tx of allTransactions) {
            idx++;
            console.log(`Sending transaction ${idx}...`);
            if (!isV0Tx) {
                const transaction = tx as Transaction;
                transaction.sign(this.agent.wallet);
                const txId = await sendAndConfirmTransaction(this.agent.connection, transaction, [this.agent.wallet], { skipPreflight: true });
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            } else {
                const transaction = tx as VersionedTransaction;
                transaction.sign([this.agent.wallet]);
                const txId = await this.agent.connection.sendTransaction(transaction, { skipPreflight: true });
                const { lastValidBlockHeight, blockhash } = await this.agent.connection.getLatestBlockhash({ commitment: 'finalized' });
                _txId = txId;
                console.log(`Transaction ${idx} confirmed, txId: ${txId}`);
            }
        }

        const mintInfo = await this.agent.connection.getParsedAccountInfo(new PublicKey(tokenMint));
        let decimals = 6;
        if (mintInfo.value?.data && 'parsed' in mintInfo.value.data) {
            decimals = mintInfo.value.data.parsed.info.decimals;
        }

        return { status: 'success', sold: amount, tokens: Number(swapResponse.data.outputAmount) / (10 ** decimals), message: 'Swap-out transactions processed successfully.', txId: _txId };
    }

    async createAssociatedTokenAccount(mint: string): Promise<PublicKey> {
        const mintPublicKey = new PublicKey(mint);
        const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.agent.connection,
            this.agent.wallet,
            mintPublicKey,
            this.agent.wallet.publicKey
        );
        return associatedTokenAccount.address;
    }
}
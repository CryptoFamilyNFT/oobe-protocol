import { Cluster, Connection, Keypair, ParsedAccountData, PublicKey, SystemProgram, Transaction, TransactionInstruction, clusterApiUrl } from '@solana/web3.js';
import Logger, { ILogger } from '../utils/logger/logger';
import { Agent } from '../agent/Agents';
import { AccountLayout, createCloseAccountInstruction, createTransferInstruction, getAssociatedTokenAddress, getMint, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import bs58 from 'bs58';
import {ConfigManager} from '../config/default';

export class SolanaOperations {
    private connection: Connection;
    private logger: Logger;
    private privateKey: string;
    public readonly LAMPORTS_PER_SOL = 1000000000;
    public readonly wallet: PublicKey

    constructor(endpoint: string = "https://api.mainnet-beta.solana.com", privateKey: string) {
        this.connection = new Connection(endpoint);
        this.logger = new Logger();
        this.wallet = Keypair.fromSecretKey(Uint8Array.from(bs58.decode(privateKey))).publicKey;
        this.privateKey = privateKey;
    }

    /**
     * 
     * @name verifyStatus
     * @description Verify the status of the Solana blockchain using the connection object based on the oobe protocol agent
     * @returns Promise<boolean> - Returns true if the connection is successful, false otherwise
     */
    async verifyStatus(): Promise<boolean> {
        try {
            await this.connection.getVersion();
            return true;
        } catch (error) {
            this.logger.error(`${error}`);
            return false;
        }
    }

    /**
     * 
     * @name getBalance
     * @description Get the balance of a wallet address on the Solana blockchain using the connection object based on the oobe protocol agent
     * @param walletAddress 
     * @returns Promise<number> - Returns the balance of the wallet address
     */
    async getBalance(wallet_address: PublicKey, token_address: PublicKey | undefined): Promise<number> {
        if (!token_address) {
            return (
                (await this.connection.getBalance(wallet_address)) / this.LAMPORTS_PER_SOL
            );
        }
        return (await this.connection.getBalance(wallet_address)) / this.LAMPORTS_PER_SOL;
    }

    /**
 * 
 * @name getBalanceOf
 * @description Get the balance of a wallet address on the Solana blockchain using the connection object based on the oobe protocol agent
 * @param walletAddress 
 * @returns Promise<number> - Returns the balance of the wallet address
 */
    async getBalanceOf(wallet_address: PublicKey, token_address: PublicKey | undefined): Promise<number | undefined> {
        const connection = this.getConnection();
        try {
            if (!token_address) {
                return (
                    (await connection.getBalance(wallet_address)) / this.LAMPORTS_PER_SOL
                );
            }

            const tokenAccounts = await connection.getTokenAccountsByOwner(
                wallet_address,
                { mint: token_address },
            );

            if (tokenAccounts.value.length === 0) {
                console.warn(
                    `No token accounts found for wallet ${wallet_address.toString()} and token ${token_address.toString()}`,
                );
                return 0;
            }

            const tokenAccount = await connection.getParsedAccountInfo(
                tokenAccounts.value[0].pubkey,
            );
            const tokenData = tokenAccount.value?.data as ParsedAccountData;

            return tokenData.parsed?.info?.tokenAmount?.uiAmount || 0;
        } catch (error) {
            this.logger.error(`${error}`);
            return undefined;
        }
    }

    /**
     * @name transfer
     * @description Transfer SOL or SPL tokens to a recipient
     * @param to Recipient's public key
     */
    /**
 * Transfer SOL or SPL tokens to a recipient
 * @param agent SolanaAgentKit instance
 * @param to Recipient's public key
 * @param amount Amount to transfer
 * @param mint Optional mint address for SPL tokens
 * @returns Transaction signature
 */
    public async transfer(
        to: PublicKey,
        amount: number,
        mint?: PublicKey,
    ): Promise<string | undefined> {
        try {
            let tx: string;

            if (!mint) {
                // Transfer native SOL
                const transaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: this.wallet,
                        toPubkey: to,
                        lamports: amount * this.LAMPORTS_PER_SOL,
                    }),
                );

                tx = await this.connection.sendTransaction(transaction, [this.getSigner()]);
            } else {
                // Transfer SPL token
                const fromAta = await getAssociatedTokenAddress(
                    mint,
                    this.wallet,
                );
                const toAta = await getAssociatedTokenAddress(mint, to);

                // Get mint info to determine decimals
                const mintInfo = await getMint(this.connection, mint);
                const adjustedAmount = amount * Math.pow(10, mintInfo.decimals);

                const transaction = new Transaction().add(
                    createTransferInstruction(
                        fromAta,
                        toAta,
                        this.wallet,
                        adjustedAmount,
                    ),
                );

                tx = await this.sendTransaction(transaction, [this.getSigner()]);
            }

            return tx;
        } catch (error: any) {
            this.logger.error(`Error transferring tokens: ${error}`);
            return undefined;
        }
    }

    /**
     * @name getTPS
     * @description Get the transactions per second on the Solana blockchain using the connection object based on the oobe protocol agent
     */

    public async getTPS(): Promise<number> {
        const perfSamples = await this.connection.getRecentPerformanceSamples();

        if (
            !perfSamples.length ||
            !perfSamples[0]?.numTransactions ||
            !perfSamples[0]?.samplePeriodSecs
        ) {
            throw new Error("No performance samples available");
        }

        const tps = perfSamples[0].numTransactions / perfSamples[0].samplePeriodSecs;

        return tps;
    }

    /**
     * @name getSigner KeyPair
     * @description Get the KeyPair object of the agent
     */
    public getSigner(): Keypair {
        return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.privateKey)));
    }

    /**
     * @name sendTransaction
     * @description Send a transaction to the Solana blockchain using the connection object based on the oobe protocol agent
     * @param transaction - {Transaction} - Transaction object
     * @param signers - {Keypair[]} - Array of Keypair objects representing the signers of the transaction
     * @returns {Promise<string>} - Returns the transaction signature
     **/
    async sendTransaction(transaction: Transaction, signers: Keypair[]): Promise<string> {
        try {
            const { blockhash } = await this.connection.getLatestBlockhash();
            transaction.recentBlockhash = blockhash;
            transaction.feePayer = signers[0].publicKey;
            transaction.sign(...signers);
            const signedTransaction = await this.connection.sendRawTransaction(transaction.serialize());
            return signedTransaction;
        } catch (error) {
            return '';
        }
    }


    /**
     * @name getDexScreenerWhaleMovements
     * @description Get whale movements on Solana using Dex Screener API
     * @param threshold - {number} - Threshold for whale movements volume
     * @returns {Promise<any>} - Returns the whale movements data
     **/
    public async getDexScreenerWhaleMovements(threshold: number): Promise<any> {
        try {
            const url = 'https://api.dexscreener.com/latest/dex/pairs/solana';
            const response = await this.fetchWithTimeout(url, { timeout: 5000 });
            const data = await response.json();

            const whaleMovements = data.pairs.filter((pair: any) => {
                return pair.volumeUSD > threshold;
            });

            return whaleMovements;
        } catch (error) {
            this.logger.error(`${error}`);
            return [];
        }
    }

    /**
     * @name fetchWithTimeout
     * @description Fetch API with timeout
     * @param resource - {string} - The resource URL
     * @param options - {object} - Fetch options including timeout
     * @returns {Promise<Response>} - Returns the fetch response
     **/
    private async fetchWithTimeout(resource: string, options: { timeout: number }): Promise<Response> {
        const { timeout = 8000 } = options;

        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(resource, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        return response;
    }

    public getConnection() {
        return this.connection;
    }

    /**
     * Close Empty SPL Token accounts of the agent
     * @param agent SolanaAgentKit instance
     * @returns transaction signature and total number of accounts closed
     */
    public async closeEmptyTokenAccounts(
    ): Promise<{ signature: string; size: number } | undefined> {
        try {
            const spl_token = await this.create_close_instruction(TOKEN_PROGRAM_ID);
            const token_2022 = await this.create_close_instruction(
                TOKEN_2022_PROGRAM_ID,
            );
            const transaction = new Transaction();

            const MAX_INSTRUCTIONS = 40; // 40 instructions can be processed in a single transaction without failing

            if (spl_token === undefined && token_2022 === undefined) {
                this.logger.warn("No empty token accounts found");
                return { signature: "", size: 0 };
            }

            let size = 0;

            if (spl_token && token_2022) {
                spl_token
                    .slice(0, Math.min(MAX_INSTRUCTIONS, spl_token.length))
                    .forEach((instruction) => transaction.add(instruction));

                token_2022
                    .slice(0, Math.max(0, MAX_INSTRUCTIONS - spl_token.length))
                    .forEach((instruction) => transaction.add(instruction));

                size = spl_token.length + token_2022.length;
            }

            if (size === 0) {
                return {
                    signature: "",
                    size: 0,
                };
            }

            const signature = await this.sendTransaction(transaction, [
                this.getSigner(),
            ]);

            return { signature, size };
        } catch (error) {
            this.logger.error(`Error closing empty token accounts: ${error}`);
            return { signature: "", size: 0 };
        }
    }

    /**
     * creates the close instuctions of a spl token account
     * @param agnet SolanaAgentKit instance
     * @param token_program Token Program Id
     * @returns close instuction array
     */

    public async create_close_instruction(
        token_program: PublicKey,
    ): Promise<TransactionInstruction[] | undefined> {
        const instructions = [];

        const ata_accounts = await this.connection.getTokenAccountsByOwner(
            this.wallet,
            { programId: token_program },
            "confirmed",
        );

        const tokens = ata_accounts.value;

        const accountExceptions = [
            "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", // USDC
        ];

        for (let i = 0; i < tokens.length; i++) {
            const token_data = AccountLayout.decode(tokens[i].account.data);
            if (
                token_data.amount === BigInt(0) &&
                !accountExceptions.includes(token_data.mint.toString())
            ) {
                const closeInstruction = createCloseAccountInstruction(
                    ata_accounts.value[i].pubkey,
                    this.wallet,
                    this.wallet,
                    [],
                    token_program,
                );

                instructions.push(closeInstruction);
            }
        }

        return instructions;
    }
}
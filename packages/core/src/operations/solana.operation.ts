import { Cluster, Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { DEFAULT_CONFIG } from '../config/default';
import Logger, { ILogger } from '../utils/logger/logger';

export class SolanaOperations {
    private connection: Connection;
    private logger: Logger;
    private privateKey: string;

    constructor(endpoint: string = clusterApiUrl(DEFAULT_CONFIG.solanaEndpoint.rpc as unknown as Cluster), privateKey: string) {
        this.connection = new Connection(endpoint);
        this.logger = new Logger();
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

    async getSigner(): Promise<Keypair> {
        return Keypair.fromSecretKey(Uint8Array.from(JSON.parse(this.privateKey)));
    }

    /**
     * 
     * @name getBalance
     * @description Get the balance of a wallet address on the Solana blockchain using the connection object based on the oobe protocol agent
     * @param walletAddress 
     * @returns Promise<number> - Returns the balance of the wallet address
     */
    async getBalance(walletAddress: string): Promise<number> {
        const publicKey = new PublicKey(walletAddress);
        return await this.connection.getBalance(publicKey);
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
            this.logger.error(`${error}`);
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
}

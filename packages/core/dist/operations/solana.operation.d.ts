import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';
import ConfigManager from '../config/default';
export declare class SolanaOperations {
    private connection;
    private logger;
    private privateKey;
    readonly LAMPORTS_PER_SOL = 1000000000;
    readonly wallet: PublicKey;
    configManager: ConfigManager;
    constructor(endpoint: string | undefined, privateKey: string);
    /**
     *
     * @name verifyStatus
     * @description Verify the status of the Solana blockchain using the connection object based on the oobe protocol agent
     * @returns Promise<boolean> - Returns true if the connection is successful, false otherwise
     */
    verifyStatus(): Promise<boolean>;
    /**
     *
     * @name getBalance
     * @description Get the balance of a wallet address on the Solana blockchain using the connection object based on the oobe protocol agent
     * @param walletAddress
     * @returns Promise<number> - Returns the balance of the wallet address
     */
    getBalance(wallet_address: PublicKey, token_address: PublicKey | undefined): Promise<number>;
    /**
 *
 * @name getBalanceOf
 * @description Get the balance of a wallet address on the Solana blockchain using the connection object based on the oobe protocol agent
 * @param walletAddress
 * @returns Promise<number> - Returns the balance of the wallet address
 */
    getBalanceOf(wallet_address: PublicKey, token_address: PublicKey | undefined): Promise<number | undefined>;
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
    transfer(to: PublicKey, amount: number, mint?: PublicKey): Promise<string | undefined>;
    /**
     * @name getTPS
     * @description Get the transactions per second on the Solana blockchain using the connection object based on the oobe protocol agent
     */
    getTPS(): Promise<number>;
    /**
     * @name getSigner KeyPair
     * @description Get the KeyPair object of the agent
     */
    getSigner(): Keypair;
    /**
     * @name sendTransaction
     * @description Send a transaction to the Solana blockchain using the connection object based on the oobe protocol agent
     * @param transaction - {Transaction} - Transaction object
     * @param signers - {Keypair[]} - Array of Keypair objects representing the signers of the transaction
     * @returns {Promise<string>} - Returns the transaction signature
     **/
    sendTransaction(transaction: Transaction, signers: Keypair[]): Promise<string>;
    /**
     * @name getDexScreenerWhaleMovements
     * @description Get whale movements on Solana using Dex Screener API
     * @param threshold - {number} - Threshold for whale movements volume
     * @returns {Promise<any>} - Returns the whale movements data
     **/
    getDexScreenerWhaleMovements(threshold: number): Promise<any>;
    /**
     * @name fetchWithTimeout
     * @description Fetch API with timeout
     * @param resource - {string} - The resource URL
     * @param options - {object} - Fetch options including timeout
     * @returns {Promise<Response>} - Returns the fetch response
     **/
    private fetchWithTimeout;
    getConnection(): Connection;
    /**
     * Close Empty SPL Token accounts of the agent
     * @param agent SolanaAgentKit instance
     * @returns transaction signature and total number of accounts closed
     */
    closeEmptyTokenAccounts(): Promise<{
        signature: string;
        size: number;
    } | undefined>;
    /**
     * creates the close instuctions of a spl token account
     * @param agnet SolanaAgentKit instance
     * @param token_program Token Program Id
     * @returns close instuction array
     */
    create_close_instruction(token_program: PublicKey): Promise<TransactionInstruction[] | undefined>;
}
//# sourceMappingURL=solana.operation.d.ts.map
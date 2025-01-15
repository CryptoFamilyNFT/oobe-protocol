import { Cluster, Connection, Keypair, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { DEFAULT_CONFIG } from '../config/default';

export class SolanaOperations {
  private connection: Connection;

  constructor(endpoint: string = clusterApiUrl(DEFAULT_CONFIG.solanaEndpoint.rpc as unknown as Cluster)) {
    this.connection = new Connection(endpoint);
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
    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = signers[0].publicKey;
    transaction.sign(...signers);
    const signedTransaction = await this.connection.sendRawTransaction(transaction.serialize());
    return signedTransaction;
}

  public getConnection() {
    return this.connection;
  }
}

import { Cluster, Connection, PublicKey, Transaction, clusterApiUrl } from '@solana/web3.js';
import { DEFAULT_CONFIG } from '../config/default';

export class SolanaOperations {
  private connection: Connection;

  constructor(endpoint: string = clusterApiUrl(DEFAULT_CONFIG.solanaEndpoint.rpc as unknown as Cluster)) {
    this.connection = new Connection(endpoint);
  }

  // Metodo per ottenere il saldo di un wallet
  async getBalance(walletAddress: string): Promise<number> {
    const publicKey = new PublicKey(walletAddress);
    return await this.connection.getBalance(publicKey);
  }

  /**
   * @name getTransaction
   * @description Get a transaction by signature from the Solana blockchain using the connection object based on the oobe protocol agent
   * @param transaction - {Transaction} - Transaction signature
   * @returns {Promise<any>} - Returns the transaction object
   **/
  async sendTransaction(transaction: Transaction, signers: any[]): Promise<any> {
    const { blockhash } = await this.connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;
    transaction.setSigners(...signers.map(s => s.publicKey));
    const signedTransaction = await this.connection.sendRawTransaction(transaction.serialize());
    return signedTransaction;
  }

  getConnection() {
    return this.connection;
  }
}

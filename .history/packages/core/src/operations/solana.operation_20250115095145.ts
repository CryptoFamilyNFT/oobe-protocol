import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

export class SolanaOperations {
  private connection: Connection;

  constructor(endpoint: string = clusterApiUrl('mainnet-beta')) {
    // Imposta la connessione Solana
    this.connection = new Connection(endpoint);
  }

  // Metodo per ottenere il saldo di un wallet
  async getBalance(walletAddress: string): Promise<number> {
    const publicKey = new PublicKey(walletAddress);
    return await this.connection.getBalance(publicKey);
  }

  // Metodo per inviare una transazione (esempio)
  async sendTransaction(transaction: any, signers: any[]): Promise<any> {
    // Logica per inviare una transazione
  }

  getConnection() {
    return this.connection;
  }
}

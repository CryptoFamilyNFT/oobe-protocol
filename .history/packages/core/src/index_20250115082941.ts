import { Connection, Keypair } from '@solana/web3.js';

export class SolanaCore {
  private connection: Connection;

  constructor(endpoint: string) {
    this.connection = new Connection(endpoint);
  }

  createWallet(): Keypair {
    return Keypair.generate();
  }

  async getBalance(publicKey: string) {
    return await this.connection.getBalance(new PublicKey(publicKey));
  }
}

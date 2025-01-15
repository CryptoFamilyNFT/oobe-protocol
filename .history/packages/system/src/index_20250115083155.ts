import { SolanaCore } from '@oobe/core';

export class SolanaSystem extends SolanaCore {
  async transferTokens(from: Keypair, to: string, amount: number) {
    const transaction = this.createTransaction(from, to, amount);
    const signature = await this.connection.sendTransaction(transaction, [from]);
    return signature;
  }

  private createTransaction(from: Keypair, to: string, amount: number) {
    return new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: from.publicKey,
        toPubkey: new PublicKey(to),
        lamports: amount,
      })
    );
  }
}

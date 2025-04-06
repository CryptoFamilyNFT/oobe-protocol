import {
    Connection,
    Keypair,
    VersionedTransaction,
    BlockhashWithExpiryBlockHeight,
  } from '@solana/web3.js';
  import axios from 'axios';
  
  export class JupiterSwap {
    private connection: Connection;
    private keypair: Keypair;
    private prioritizationFeeLamports: number = 10000;
  
    constructor(connection: Connection, keypair: Keypair) {
      this.connection = connection;
      this.keypair = keypair;
    }
  
    private async getQuote(inputMint: string, outputMint: string, amount: number, slippageBps: number) {
      const { data } = await axios.get('https://quote-api.jup.ag/v6/quote', {
        params: {
          inputMint,
          outputMint,
          amount,
          slippageBps,
        },
      });
      return data;
    }
  
    private async getSwapTransaction(quoteResponse: any) {
      const { data } = await axios.post(
        'https://quote-api.jup.ag/v6/swap',
        {
          quoteResponse,
          userPublicKey: this.keypair.publicKey.toString(),
          wrapAndUnwrapSol: true,
          prioritizationFeeLamports: this.prioritizationFeeLamports,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return data.swapTransaction;
    }
  
    private async prepareAndSendTransaction(swapTransaction: string): Promise<string> {
      const txBuf = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(txBuf);
  
      const bhInfo: BlockhashWithExpiryBlockHeight = await this.connection.getLatestBlockhash('finalized');
      transaction.message.recentBlockhash = bhInfo.blockhash;
      transaction.sign([this.keypair]);
  
      const simulation = await this.connection.simulateTransaction(transaction, { commitment: 'processed' });
      if (simulation.value.err) {
        throw new Error('Simulation failed: ' + JSON.stringify(simulation.value.err));
      }
  
      const signature = await this.connection.sendTransaction(transaction, {
        skipPreflight: true,
        preflightCommitment: 'processed',
      });
  
      const confirmation = await this.connection.confirmTransaction(
        {
          signature,
          blockhash: bhInfo.blockhash,
          lastValidBlockHeight: bhInfo.lastValidBlockHeight,
        },
        'finalized'
      );
  
      if (confirmation.value.err) {
        throw new Error('Transaction failed: ' + JSON.stringify(confirmation.value.err));
      }
  
      return signature;
    }
  
    public async swapSolToToken(outputMint: string, uiAmount: number, slippage: number) {
      const inputMint = 'So11111111111111111111111111111111111111112'; // SOL
      const quote = await this.getQuote(inputMint, outputMint, uiAmount * 1e9, slippage);
      const swapTx = await this.getSwapTransaction(quote);
      const signature = await this.prepareAndSendTransaction(swapTx);
      console.log(`Swap SOL → Token: https://solscan.io/tx/${signature}`);
      return { signature };
    }
  
    public async swapTokenToSol(inputMint: string, uiAmount: number, slippage: number) {
      const outputMint = 'So11111111111111111111111111111111111111112'; // SOL
      const quote = await this.getQuote(inputMint, outputMint, uiAmount * 1e9, slippage);
      const swapTx = await this.getSwapTransaction(quote);
      const signature = await this.prepareAndSendTransaction(swapTx);
      console.log(`Swap Token → SOL: https://solscan.io/tx/${signature}`);
      return { signature };
    }
  }
  
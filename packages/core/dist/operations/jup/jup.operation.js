"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JupiterSwap = void 0;
const web3_js_1 = require("@solana/web3.js");
const axios_1 = __importDefault(require("axios"));
class JupiterSwap {
    constructor(connection, keypair) {
        this.prioritizationFeeLamports = 10000;
        this.connection = connection;
        this.keypair = keypair;
    }
    async getQuote(inputMint, outputMint, amount, slippageBps) {
        const { data } = await axios_1.default.get('https://quote-api.jup.ag/v6/quote', {
            params: {
                inputMint,
                outputMint,
                amount,
                slippageBps,
            },
        });
        return data;
    }
    async getSwapTransaction(quoteResponse) {
        const { data } = await axios_1.default.post('https://quote-api.jup.ag/v6/swap', {
            quoteResponse,
            userPublicKey: this.keypair.publicKey.toString(),
            wrapAndUnwrapSol: true,
            prioritizationFeeLamports: this.prioritizationFeeLamports,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return data.swapTransaction;
    }
    async prepareAndSendTransaction(swapTransaction) {
        const txBuf = Buffer.from(swapTransaction, 'base64');
        const transaction = web3_js_1.VersionedTransaction.deserialize(txBuf);
        const bhInfo = await this.connection.getLatestBlockhash('finalized');
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
        const confirmation = await this.connection.confirmTransaction({
            signature,
            blockhash: bhInfo.blockhash,
            lastValidBlockHeight: bhInfo.lastValidBlockHeight,
        }, 'finalized');
        if (confirmation.value.err) {
            throw new Error('Transaction failed: ' + JSON.stringify(confirmation.value.err));
        }
        return signature;
    }
    async swapSolToToken(outputMint, uiAmount, slippage) {
        const inputMint = 'So11111111111111111111111111111111111111112'; // SOL
        const quote = await this.getQuote(inputMint, outputMint, uiAmount * 1e9, slippage);
        const swapTx = await this.getSwapTransaction(quote);
        const signature = await this.prepareAndSendTransaction(swapTx);
        console.log(`Swap SOL → Token: https://solscan.io/tx/${signature}`);
        return { signature };
    }
    async swapTokenToSol(inputMint, uiAmount, slippage) {
        const outputMint = 'So11111111111111111111111111111111111111112'; // SOL
        const quote = await this.getQuote(inputMint, outputMint, uiAmount * 1e9, slippage);
        const swapTx = await this.getSwapTransaction(quote);
        const signature = await this.prepareAndSendTransaction(swapTx);
        console.log(`Swap Token → SOL: https://solscan.io/tx/${signature}`);
        return { signature };
    }
}
exports.JupiterSwap = JupiterSwap;
//# sourceMappingURL=jup.operation.js.map
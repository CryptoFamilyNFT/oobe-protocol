import { Connection, Keypair } from '@solana/web3.js';
export declare class JupiterSwap {
    private connection;
    private keypair;
    private prioritizationFeeLamports;
    constructor(connection: Connection, keypair: Keypair);
    private getQuote;
    private getSwapTransaction;
    private prepareAndSendTransaction;
    swapSolToToken(outputMint: string, uiAmount: number, slippage: number): Promise<{
        signature: string;
    }>;
    swapTokenToSol(inputMint: string, uiAmount: number, slippage: number): Promise<{
        signature: string;
    }>;
}
//# sourceMappingURL=jup.operation.d.ts.map
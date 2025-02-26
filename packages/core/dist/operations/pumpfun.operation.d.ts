import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { PumpfunLaunchResponse, PumpFunTokenOptions } from '../types/index.interfaces';
import { Agent } from '../agent/Agents';
export declare class PumpfunOperation {
    private logger;
    uploadMetadata(tokenName: string, tokenTicker: string, description: string, imageUrl: string, options?: PumpFunTokenOptions): Promise<any>;
    createTokenTransaction(agent: Agent, mintKeypair: Keypair, metadataResponse: any, options?: PumpFunTokenOptions): Promise<Response>;
    signAndSendTransaction(kit: Agent, tx: VersionedTransaction, mintKeypair: Keypair): Promise<string | undefined>;
    launchPumpFunToken(agent: Agent, tokenName: string, tokenTicker: string, description: string, imageUrl: string, options?: PumpFunTokenOptions): Promise<PumpfunLaunchResponse>;
}
//# sourceMappingURL=pumpfun.operation.d.ts.map
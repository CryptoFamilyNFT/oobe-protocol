import { RpcTransport } from '@solana/rpc-spec';
import { RpcResponse } from '@solana/rpc-spec-types';
import { createHttpTransport } from '@solana/rpc-transport-http';
import { Commitment, ConfirmedSignatureInfo, PublicKey, SendOptions, TransactionSignature } from '@solana/web3.js';
import { rpcQueue } from './helpers/rpc/rpcQueue';
import { ConfigManager } from '../config/default';

const MAX_ATTEMPTS = 5;

export class SolanaRpcClient {
    private transports: RpcTransport[];
    private transportsRpc: string[];

    constructor(transportRPC: string[] = []) {
        const transportUrls = transportRPC.length > 0 ? transportRPC : new ConfigManager().getDefaultConfig().transportsRPC ?? [];
        this.transportsRpc = transportRPC;
        this.transports = transportUrls.map(url => {
            return createHttpTransport({ url });
        });
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    private calculateRetryDelay(attempt: number, is429 = false): number {
        const base = is429 ? 1000 : 100;
        return Math.min(base * Math.pow(2, attempt), 5000);
    }

    public getRpcTransports(): string[] {
        return this.transportsRpc;
    }

    private async fastRaceTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
        const errors: any[] = [];

        return new Promise<RpcResponse<TResponse>>((resolve, reject) => {
            let pending = this.transports.length;

            this.transports.forEach(transport => {
                transport(...args)
                    .then(response => resolve(response as RpcResponse<TResponse>))
                    .catch(error => {
                        errors.push(error);
                        pending--;
                        if (pending === 0) {
                            reject(new Error('All transports failed:\n' + errors.map(e => e.message).join('\n')));
                        }
                    });
            });
        });
    }

    private async retryingFastTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
        let lastError;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            try {
                return await this.fastRaceTransport(...args);
            } catch (err: any) {
                lastError = err;
                const isTooManyRequests = (err?.message || '').includes('429');
                const retryDelay = this.calculateRetryDelay(attempt, isTooManyRequests);
                await this.sleep(retryDelay);
            }
        }
        throw lastError;
    }

    async getParsedTransaction(txSignature: string): Promise<string> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getTransaction',
                params: [txSignature],
            };
            await this.sleep(500);
            const response = await this.retryingFastTransport({ payload });
            return JSON.stringify(response);
        });
    }

    async getSignaturesForAddress(address: PublicKey, options?: any, commitment?: Commitment): Promise<Array<ConfirmedSignatureInfo>> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getSignaturesForAddress',
                params: [address, { limit: 1000 }],
            };
            await this.sleep(500);
            const response = await this.retryingFastTransport<{
                result: Array<ConfirmedSignatureInfo>;
            }>({ payload });
            return response.result;
        });
    }

    async getBlock(slot: string, maxSupportedTransactionVersion: number = 0): Promise<string> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getBlock',
                params: [slot, { maxSupportedTransactionVersion }],
            };
            const response = await this.retryingFastTransport({ payload });
            return JSON.stringify(response);
        });
    }

    async getLatestBlockhash(): Promise<string | { blockhash: string; lastValidBlockHeight: number }> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getLatestBlockhash',
                params: [],
            };
            const response = await this.retryingFastTransport({ payload });
            const result = (response as RpcResponse<{ value: { blockhash: string; lastValidBlockHeight: number } }>).value;
            if (result?.blockhash && result?.lastValidBlockHeight) {
                return {
                    blockhash: result.blockhash,
                    lastValidBlockHeight: result.lastValidBlockHeight,
                };
            }
            return JSON.stringify(response);
        });
    }

    async sendRawTransaction(rawTransaction: Buffer | Uint8Array | Array<number>, options?: SendOptions): Promise<TransactionSignature> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'sendRawTransaction',
                params: [rawTransaction, options],
            };
            const response = await this.retryingFastTransport<{ result: TransactionSignature }>({ payload });
            return response.result;
        });
    }
}

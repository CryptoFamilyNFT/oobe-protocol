import { RpcTransport } from '@solana/rpc-spec';
import { RpcResponse } from '@solana/rpc-spec-types';
import { createHttpTransport } from '@solana/rpc-transport-http';
import { AccountInfo, Commitment, ConfirmedSignatureInfo, ParsedAccountData, PublicKey, RpcResponseAndContext, SendOptions, TransactionSignature } from '@solana/web3.js';
import { rpcQueue } from './helpers/rpc/rpcQueue';
import { ConfigManager } from '../config/default';
import { sleep } from 'openai/core';

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

    async getBalance(address: PublicKey, commitment?: Commitment): Promise<string> {
        return await rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getBalance',
                params: [address, commitment],
            };
            const response = await this.retryingFastTransport({ payload });
            return JSON.stringify(response);
        });
    }

    async getTokenAccountsByOwner(
        address: PublicKey,
        programId: PublicKey,
        encoding: 'jsonParsed' = 'jsonParsed'
    ): Promise<RpcResponseAndContext<Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }>>> {
        return await rpcQueue.enqueue(async () => {
            console.log('getTokenAccountsByOwner called with address:', address.toBase58(), 'programId:', programId.toBase58(), 'and encoding:', encoding);
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getTokenAccountsByOwner',
                params: [
                    address.toBase58(),
                    { programId: programId.toBase58() },
                    { encoding },
                ],
            };
            console.log('Payload for getTokenAccountsByOwner:', payload);
            const response = await this.retryingFastTransport<{
                result: RpcResponseAndContext<Array<{ pubkey: PublicKey; account: AccountInfo<ParsedAccountData> }>>;
            }>({ payload });
            console.log('Response from getTokenAccountsByOwner:', response);
            return response.result;
        });
    }
    async getMultipleAccountInfo(addresses: PublicKey[]): Promise<Array<AccountInfo<Buffer> | null>> {
        const results: Array<AccountInfo<Buffer> | null> = [];
        const batchSize = 100;

        // Split addresses into batches of 100
        const batches = [];
        for (let i = 0; i < addresses.length; i += batchSize) {
            batches.push(addresses.slice(i, i + batchSize));
        }

        for (const batch of batches) {
            const batchResults: Array<AccountInfo<Buffer> | null> = await rpcQueue.enqueue(async () => {
                const payload = {
                    id: 1,
                    jsonrpc: '2.0',
                    method: 'getMultipleAccounts',
                    params: [batch.map(address => address.toBase58()), { encoding: 'base64' }],
                };
                console.log('Payload for getMultipleAccounts:', payload);
                const response = await this.retryingFastTransport<{
                    result: {
                        context: { apiVersion: string; slot: number };
                        value: Array<AccountInfo<Buffer> | null>;
                    };
                }>({ payload });
                console.log('Response from getMultipleAccounts:', response);

                const result = response.result;
                if (result?.value && result.value != null) {
                    result.value.forEach((accountInfo, index) => {
                        console.log(`Account info for address at index ${index}:`, accountInfo);
                        if (accountInfo?.data) {
                            const [data, encoding] = accountInfo.data as unknown as [string, string];
                            if (accountInfo === null || accountInfo.data === null) {
                                console.log(`Account info is null for address at index ${index}:`, batch[index].toBase58());
                                return;
                            }
                            if (encoding === 'base64') {
                                const decoded = Buffer.from(data, 'base64');

                                console.log(`Decoded data for address at index ${index}:`, decoded);
                                try {
                                    // Attempt to parse string to JSON
                                    const jsonObject = JSON.parse(decoded.toString());
                                    console.log(`Decoded JSON for address at index ${index}:`, jsonObject);
                                    accountInfo.data = jsonObject as any; // Overwrite data with decoded buffer
                                    console.log(`Decoded data for account at index ${index}:`, jsonObject);
                                } catch (error) {
                                    accountInfo.data = decoded; // Fallback to raw decoded buffer
                                    console.log(`Fallback raw decoded data for account at index ${index}:`, decoded);
                                }
                            }
                        } else {
                            console.log(`No data found for address at index ${index}:`, batch[index].toBase58());
                        }
                    });
                }

                return result?.value || [];
            });

            results.push(...batchResults);
        }

        return results;
    }

}

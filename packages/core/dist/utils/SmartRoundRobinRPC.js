"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaRpcClient = void 0;
const rpc_transport_http_1 = require("@solana/rpc-transport-http");
const rpcQueue_1 = require("./helpers/rpc/rpcQueue");
const default_1 = require("../config/default");
const MAX_ATTEMPTS = 5;
class SolanaRpcClient {
    constructor(transportRPC = []) {
        const transportUrls = transportRPC.length > 0 ? transportRPC : new default_1.ConfigManager().getDefaultConfig().transportsRPC ?? [];
        this.transportsRpc = transportRPC;
        this.transports = transportUrls.map(url => {
            return (0, rpc_transport_http_1.createHttpTransport)({ url });
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    calculateRetryDelay(attempt, is429 = false) {
        const base = is429 ? 1000 : 100;
        return Math.min(base * Math.pow(2, attempt), 5000);
    }
    getRpcTransports() {
        return this.transportsRpc;
    }
    async fastRaceTransport(...args) {
        const errors = [];
        return new Promise((resolve, reject) => {
            let pending = this.transports.length;
            this.transports.forEach(transport => {
                transport(...args)
                    .then(response => resolve(response))
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
    async retryingFastTransport(...args) {
        let lastError;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            try {
                return await this.fastRaceTransport(...args);
            }
            catch (err) {
                lastError = err;
                const isTooManyRequests = (err?.message || '').includes('429');
                const retryDelay = this.calculateRetryDelay(attempt, isTooManyRequests);
                await this.sleep(retryDelay);
            }
        }
        throw lastError;
    }
    async getParsedTransaction(txSignature) {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
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
    async getSignaturesForAddress(address, options, commitment) {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getSignaturesForAddress',
                params: [address, { limit: 1000 }],
            };
            await this.sleep(500);
            const response = await this.retryingFastTransport({ payload });
            return response.result;
        });
    }
    async getBlock(slot, maxSupportedTransactionVersion = 0) {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
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
    async getLatestBlockhash() {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'getLatestBlockhash',
                params: [],
            };
            const response = await this.retryingFastTransport({ payload });
            const result = response.value;
            if (result?.blockhash && result?.lastValidBlockHeight) {
                return {
                    blockhash: result.blockhash,
                    lastValidBlockHeight: result.lastValidBlockHeight,
                };
            }
            return JSON.stringify(response);
        });
    }
    async sendRawTransaction(rawTransaction, options) {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
            const payload = {
                id: 1,
                jsonrpc: '2.0',
                method: 'sendRawTransaction',
                params: [rawTransaction, options],
            };
            const response = await this.retryingFastTransport({ payload });
            return response.result;
        });
    }
    async getBalance(address, commitment) {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
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
    async getTokenAccountsByOwner(address, programId, encoding = 'jsonParsed') {
        return await rpcQueue_1.rpcQueue.enqueue(async () => {
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
            const response = await this.retryingFastTransport({ payload });
            console.log('Response from getTokenAccountsByOwner:', response);
            return response.result;
        });
    }
    async getMultipleAccountInfo(addresses) {
        const results = [];
        const batchSize = 100;
        // Split addresses into batches of 100
        const batches = [];
        for (let i = 0; i < addresses.length; i += batchSize) {
            batches.push(addresses.slice(i, i + batchSize));
        }
        for (const batch of batches) {
            const batchResults = await rpcQueue_1.rpcQueue.enqueue(async () => {
                const payload = {
                    id: 1,
                    jsonrpc: '2.0',
                    method: 'getMultipleAccounts',
                    params: [batch.map(address => address.toBase58()), { encoding: 'base64' }],
                };
                console.log('Payload for getMultipleAccounts:', payload);
                const response = await this.retryingFastTransport({ payload });
                console.log('Response from getMultipleAccounts:', response);
                const result = response.result;
                if (result?.value && result.value != null) {
                    result.value.forEach((accountInfo, index) => {
                        console.log(`Account info for address at index ${index}:`, accountInfo);
                        if (accountInfo?.data) {
                            const [data, encoding] = accountInfo.data;
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
                                    accountInfo.data = jsonObject; // Overwrite data with decoded buffer
                                    console.log(`Decoded data for account at index ${index}:`, jsonObject);
                                }
                                catch (error) {
                                    accountInfo.data = decoded; // Fallback to raw decoded buffer
                                    console.log(`Fallback raw decoded data for account at index ${index}:`, decoded);
                                }
                            }
                        }
                        else {
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
exports.SolanaRpcClient = SolanaRpcClient;
//# sourceMappingURL=SmartRoundRobinRPC.js.map
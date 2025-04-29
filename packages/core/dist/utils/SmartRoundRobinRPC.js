"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaRpcClient = void 0;
const rpc_transport_http_1 = require("@solana/rpc-transport-http");
const rpcQueue_1 = require("./helpers/rpc/rpcQueue");
const default_1 = require("../config/default");
const logger_1 = __importDefault(require("./logger/logger"));
const MAX_ATTEMPTS = 5;
class SolanaRpcClient {
    constructor(transportRPC = []) {
        const transportUrls = transportRPC.length > 0 ? transportRPC : new default_1.ConfigManager().getDefaultConfig().transportsRPC ?? [];
        this.transportsRpc = transportRPC;
        this.transports = transportUrls.map(url => {
            new logger_1.default().info(`Using transport: ${url}`);
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
}
exports.SolanaRpcClient = SolanaRpcClient;
//# sourceMappingURL=SmartRoundRobinRPC.js.map
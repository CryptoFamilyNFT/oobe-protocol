"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedTransaction = getParsedTransaction;
exports.getBlock = getBlock;
exports.getLatestBlockhash = getLatestBlockhash;
exports.sendRawTransaction = sendRawTransaction;
const rpc_transport_http_1 = require("@solana/rpc-transport-http");
const rpcQueue_1 = require("./helpers/rpc/rpcQueue");
const logger_1 = __importDefault(require("./logger/logger"));
const transportUrls = [
    'https://api.mainnet-beta.solana.com',
    'https://solana-rpc.publicnode.com',
    'https://solana.drpc.org/',
    'https://go.getblock.io/4136d34f90a6488b84214ae26f0ed5f4',
    'https://api.blockeden.xyz/solana/67nCBdZQSH9z3YqDDjdm',
    'https://solana.leorpc.com/?api_key=FREE',
];
const transports = transportUrls.map(url => {
    new logger_1.default().info(`Using transport: ${url}`);
    return (0, rpc_transport_http_1.createHttpTransport)({ url }); // timeout per evitare nodi lenti
});
// ----------------------
// Utils
// ----------------------
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function calculateRetryDelay(attempt, is429 = false) {
    const base = is429 ? 1000 : 100;
    return Math.min(base * Math.pow(2, attempt), 5000); // fino a 5s per 429
}
const MAX_ATTEMPTS = 5;
// ----------------------
// Core: parallel race
// ----------------------
async function fastRaceTransport(...args) {
    const errors = [];
    return new Promise((resolve, reject) => {
        let pending = transports.length;
        transports.forEach(transport => {
            transport(...args)
                .then(response => {
                return resolve(response);
            })
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
// ----------------------
// Retry intelligente
// ----------------------
async function retryingFastTransport(...args) {
    let lastError;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
            return await fastRaceTransport(...args);
        }
        catch (err) {
            lastError = err;
            const isTooManyRequests = (err?.message || '').includes('429');
            const retryDelay = calculateRetryDelay(attempt, isTooManyRequests);
            await sleep(retryDelay);
        }
    }
    throw lastError;
}
// ----------------------
// Uso finale
// ----------------------
async function getParsedTransaction(txSignature) {
    return await rpcQueue_1.rpcQueue.enqueue(async () => {
        const payload = {
            id: 1,
            jsonrpc: '2.0',
            method: 'getTransaction',
            params: [txSignature],
        };
        await sleep(500);
        const response = await retryingFastTransport({ payload });
        const data = JSON.stringify(response);
        return data;
    });
}
async function getBlock(slot, maxSupportedTransactionVersion = 0) {
    return await rpcQueue_1.rpcQueue.enqueue(async () => {
        const payload = {
            id: 1,
            jsonrpc: '2.0',
            method: 'getBlock',
            params: [slot, { maxSupportedTransactionVersion: maxSupportedTransactionVersion }],
        };
        const response = await retryingFastTransport({ payload });
        const data = JSON.stringify(response);
        return data;
    });
}
async function getLatestBlockhash() {
    return await rpcQueue_1.rpcQueue.enqueue(async () => {
        const payload = {
            id: 1,
            jsonrpc: '2.0',
            method: 'getLatestBlockhash',
            params: [],
        };
        const response = await retryingFastTransport({ payload });
        const _data = JSON.stringify(response);
        const dataParsed = JSON.parse(_data);
        if (dataParsed.result && dataParsed.result.value) {
            const blockhash = dataParsed.result.value.blockhash;
            const lastValidBlockHeight = dataParsed.result.value.lastValidBlockHeight;
            return { blockhash, lastValidBlockHeight };
        }
        const data = JSON.stringify(response);
        return data;
    });
}
async function sendRawTransaction(rawTransaction, options) {
    return await rpcQueue_1.rpcQueue.enqueue(async () => {
        const payload = {
            id: 1,
            jsonrpc: '2.0',
            method: 'getLatestBlockhash',
            params: [rawTransaction, options],
        };
        const response = await retryingFastTransport({ payload });
        const data = JSON.stringify(response);
        return data;
    });
}
//# sourceMappingURL=SmartRoundRobinRPC.js.map
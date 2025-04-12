"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParsedTransaction = getParsedTransaction;
const rpc_transport_http_1 = require("@solana/rpc-transport-http");
// Crea i trasporti per ogni server RPC
const transports = [
    (0, rpc_transport_http_1.createHttpTransport)({ url: 'https://api.mainnet-beta.solana.com' }),
    (0, rpc_transport_http_1.createHttpTransport)({ url: 'https://solana-rpc.publicnode.com' }),
    (0, rpc_transport_http_1.createHttpTransport)({ url: 'https://solana.drpc.org/' }),
];
// Funzione che distribuisce le richieste tra i trasporti
let nextTransport = 0;
async function roundRobinTransport(...args) {
    const transport = transports[nextTransport];
    nextTransport = (nextTransport + 1) % transports.length;
    return await transport(...args);
}
// Funzione di retry con logica esponenziale
const MAX_ATTEMPTS = 10;
// Sleep function to wait for a given number of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Calculate the delay for a given attempt
function calculateRetryDelay(attempt) {
    // Exponential backoff with a maximum of 1.5 seconds
    return Math.min(100 * Math.pow(2, attempt), 1500);
}
async function retryingTransport(...args) {
    let requestError;
    for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
        try {
            return await roundRobinTransport(...args);
        }
        catch (err) {
            requestError = err;
            // Solo se ci sono tentativi rimasti, dormiamo prima di riprovare
            if (attempts < MAX_ATTEMPTS - 1) {
                const retryDelay = calculateRetryDelay(attempts);
                await sleep(retryDelay);
            }
        }
    }
    throw requestError;
}
// Uso del trasporto con retry e round-robin
async function getParsedTransaction(txSignature) {
    const payload = {
        id: 1,
        jsonrpc: '2.0',
        method: 'getTransaction',
        params: [txSignature],
    };
    const response = await retryingTransport({
        payload,
    });
    const data = JSON.stringify(response);
    return data;
}
//# sourceMappingURL=SmartRoundRobinRPC.js.map
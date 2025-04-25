import { RpcTransport } from '@solana/rpc-spec';
import { RpcResponse } from '@solana/rpc-spec-types';
import { createHttpTransport } from '@solana/rpc-transport-http';
import { rpcQueue } from './helpers/rpc/rpcQueue';
import { log } from 'console';
import Logger from './logger/logger';
import { SendOptions, TransactionSignature } from '@solana/web3.js';

export const transportUrls = [
    'https://api.mainnet-beta.solana.com',
    'https://solana-rpc.publicnode.com',
    'https://solana.drpc.org/',
    'https://go.getblock.io/4136d34f90a6488b84214ae26f0ed5f4',
    'https://api.blockeden.xyz/solana/67nCBdZQSH9z3YqDDjdm',
    'https://solana.leorpc.com/?api_key=FREE',
];

const transports = transportUrls.map(url => {
    new Logger().info(`Using transport: ${url}`);
    return createHttpTransport({ url }) // timeout per evitare nodi lenti
});

// ----------------------
// Utils
// ----------------------

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function calculateRetryDelay(attempt: number, is429 = false): number {
    const base = is429 ? 1000 : 100;
    return Math.min(base * Math.pow(2, attempt), 5000); // fino a 5s per 429
}

const MAX_ATTEMPTS = 5;

// ----------------------
// Core: parallel race
// ----------------------

async function fastRaceTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
    const errors: any[] = [];

    return new Promise<RpcResponse<TResponse>>((resolve, reject) => {
        let pending = transports.length;

        transports.forEach(transport => {
            transport(...args)
                .then(response => {
                    return resolve(response as RpcResponse<TResponse>);
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

async function retryingFastTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
    let lastError;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        try {
            return await fastRaceTransport(...args);
        } catch (err: any) {
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

export async function getParsedTransaction(txSignature: string): Promise<string> {
    return await rpcQueue.enqueue(async () => {
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

export async function getBlock(slot: string, maxSupportedTransactionVersion: number = 0): Promise<string> {
    return await rpcQueue.enqueue(async () => {
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

export async function getLatestBlockhash(): Promise<string | {blockhash: string, lastValidBlockHeight: number}> {
    return await rpcQueue.enqueue(async () => {
        const payload = {
            id: 1,
            jsonrpc: '2.0',
            method: 'getLatestBlockhash',
            params: [],
        };

        const response = await retryingFastTransport({ payload });
        const _data = JSON.stringify(response);
        const dataParsed = JSON.parse(_data as string);

        if (dataParsed.result && dataParsed.result.value) {
            const blockhash = dataParsed.result.value.blockhash;
            const lastValidBlockHeight = dataParsed.result.value.lastValidBlockHeight;
            return {blockhash, lastValidBlockHeight};
        } 

        const data = JSON.stringify(response);
        return data;
    });
}

export async function sendRawTransaction(rawTransaction: Buffer | Uint8Array | Array<number>, options?: SendOptions): Promise<TransactionSignature> {
    return await rpcQueue.enqueue(async () => {
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
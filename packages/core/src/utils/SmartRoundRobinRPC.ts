import { RpcTransport } from '@solana/rpc-spec';
import { RpcResponse } from '@solana/rpc-spec-types';
import { createHttpTransport } from '@solana/rpc-transport-http';

// Crea i trasporti per ogni server RPC
const transports = [
    createHttpTransport({ url: 'https://api.mainnet-beta.solana.com' }),
    createHttpTransport({ url: 'https://solana-rpc.publicnode.com' }),
    createHttpTransport({ url: 'https://solana.drpc.org/' }),
];

// Funzione che distribuisce le richieste tra i trasporti
let nextTransport = 0;
async function roundRobinTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
    const transport = transports[nextTransport];
    nextTransport = (nextTransport + 1) % transports.length;
    return await transport(...args);
}

// Funzione di retry con logica esponenziale
const MAX_ATTEMPTS = 10;

// Sleep function to wait for a given number of milliseconds
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Calculate the delay for a given attempt
function calculateRetryDelay(attempt: number): number {
  // Exponential backoff with a maximum of 1.5 seconds
  return Math.min(100 * Math.pow(2, attempt), 1500);
}


async function retryingTransport<TResponse>(...args: Parameters<RpcTransport>): Promise<RpcResponse<TResponse>> {
    let requestError;
    for (let attempts = 0; attempts < MAX_ATTEMPTS; attempts++) {
        try {
            return await roundRobinTransport(...args);
        } catch (err) {
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
export async function getParsedTransaction(txSignature: string) {
  const payload = {
      id: 1,
      jsonrpc: '2.0',
      method: 'getTransaction',
      params: [txSignature],
  };

  const response = await retryingTransport({
      payload,
  });

  const data = JSON.stringify(response as {});
  return data;
}


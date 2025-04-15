import fetch, { RequestInfo, RequestInit } from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

// Lista proxy
const primaryProxies = [
  'http://43.135.137.249:13001',
  'http://49.51.204.163:13001',
  'http://43.135.149.110:13001',
];

const backupProxies = [
  'http://52.67.10.183:80',
  'http://200.105.215.22:33630',
  'http://45.70.236.194:999',
];

// Test se un proxy è disponibile, se non lo è mi ritorna falòse
async function isProxyWorking(proxyUrl: string): Promise<boolean> {
  try {
    const agent = new HttpsProxyAgent(proxyUrl);
    const res = await fetch('https://api.ipify.org?format=json', {
      agent,
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Seleziona proxy disponibile
async function getWorkingProxy(): Promise<HttpsProxyAgent<string>> {
  const allProxies = [...primaryProxies, ...backupProxies];

  for (const proxy of allProxies) {
    if (await isProxyWorking(proxy)) {
      console.log(`✅ Proxy in uso: ${proxy}`);
      return new HttpsProxyAgent(proxy);
    }
  }

  throw new Error('❌ Nessun proxy disponibile');
}

// Override fetch globale
let cachedAgent: HttpsProxyAgent<string> | null = null;

globalThis.fetch = async (input: globalThis.RequestInfo | URL, init?: globalThis.RequestInit): Promise<Response> => {
  if (!cachedAgent) {
    cachedAgent = await getWorkingProxy();
  }

  return fetch(input as RequestInfo, {
    ...(init as RequestInit),
    agent: cachedAgent,
  }) as unknown as globalThis.Response;
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const https_proxy_agent_1 = require("https-proxy-agent");
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
async function isProxyWorking(proxyUrl) {
    try {
        const agent = new https_proxy_agent_1.HttpsProxyAgent(proxyUrl);
        const res = await (0, node_fetch_1.default)('https://api.ipify.org?format=json', {
            agent,
        });
        return res.ok;
    }
    catch {
        return false;
    }
}
// Seleziona proxy disponibile
async function getWorkingProxy() {
    const allProxies = [...primaryProxies, ...backupProxies];
    for (const proxy of allProxies) {
        if (await isProxyWorking(proxy)) {
            console.log(`✅ Proxy in uso: ${proxy}`);
            return new https_proxy_agent_1.HttpsProxyAgent(proxy);
        }
    }
    throw new Error('❌ Nessun proxy disponibile');
}
// Override fetch globale
let cachedAgent = null;
globalThis.fetch = async (input, init) => {
    if (!cachedAgent) {
        cachedAgent = await getWorkingProxy();
    }
    return (0, node_fetch_1.default)(input, {
        ...init,
        agent: cachedAgent,
    });
};
//# sourceMappingURL=setupProxyFetch.js.map
"use strict";
// --- HubbleService.ts ---
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HubbleService = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const BASE_URL = "https://api.hubbleprotocol.io";
class HubbleService {
    async getUserPosition(walletAddress) {
        const res = await (0, node_fetch_1.default)(`${BASE_URL}/v1/user/${walletAddress}`);
        if (!res.ok)
            throw new Error(`Failed to fetch user data: ${res.statusText}`);
        return res.json();
    }
    async getVaults() {
        const res = await (0, node_fetch_1.default)(`${BASE_URL}/v1/vaults`);
        if (!res.ok)
            throw new Error(`Failed to fetch vaults: ${res.statusText}`);
        return res.json();
    }
    async getAssets() {
        const res = await (0, node_fetch_1.default)(`${BASE_URL}/v1/assets`);
        if (!res.ok)
            throw new Error(`Failed to fetch assets: ${res.statusText}`);
        return res.json();
    }
    async getAssetPrice(assetSymbol) {
        const res = await (0, node_fetch_1.default)(`${BASE_URL}/v1/assets/${assetSymbol}`);
        if (!res.ok)
            throw new Error(`Failed to fetch asset price: ${res.statusText}`);
        return res.json();
    }
    async getGlobalStats() {
        const res = await (0, node_fetch_1.default)(`${BASE_URL}/v1/stats`);
        if (!res.ok)
            throw new Error(`Failed to fetch global stats: ${res.statusText}`);
        return res.json();
    }
}
exports.HubbleService = HubbleService;
//# sourceMappingURL=HubbleService.js.map
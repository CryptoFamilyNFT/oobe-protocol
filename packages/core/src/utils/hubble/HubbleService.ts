// --- HubbleService.ts ---

import fetch from "node-fetch";

const BASE_URL = "https://api.hubbleprotocol.io";

export class HubbleService {
  async getUserPosition(walletAddress: string) {
    const res = await fetch(`${BASE_URL}/v1/user/${walletAddress}`);
    if (!res.ok) throw new Error(`Failed to fetch user data: ${res.statusText}`);
    return res.json();
  }

  async getVaults() {
    const res = await fetch(`${BASE_URL}/v1/vaults`);
    if (!res.ok) throw new Error(`Failed to fetch vaults: ${res.statusText}`);
    return res.json();
  }

  async getAssets() {
    const res = await fetch(`${BASE_URL}/v1/assets`);
    if (!res.ok) throw new Error(`Failed to fetch assets: ${res.statusText}`);
    return res.json();
  }

  async getAssetPrice(assetSymbol: string) {
    const res = await fetch(`${BASE_URL}/v1/assets/${assetSymbol}`);
    if (!res.ok) throw new Error(`Failed to fetch asset price: ${res.statusText}`);
    return res.json();
  }

  async getGlobalStats() {
    const res = await fetch(`${BASE_URL}/v1/stats`);
    if (!res.ok) throw new Error(`Failed to fetch global stats: ${res.statusText}`);
    return res.json();
  }
}
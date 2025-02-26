"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenDataByTicker = exports.getTokenAddressFromTicker = exports.getTokenDataByAddress = void 0;
const web3_js_1 = require("@solana/web3.js");
async function getTokenDataByAddress(mint) {
    try {
        if (!mint) {
            throw new Error("Mint address is required");
        }
        const response = await fetch(`https://tokens.jup.ag/token/${mint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const token = (await response.json());
        return token;
    }
    catch (error) {
        throw new Error(`Error fetching token data: ${error.message}`);
    }
}
exports.getTokenDataByAddress = getTokenDataByAddress;
async function getTokenAddressFromTicker(ticker) {
    try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${ticker}`);
        const data = await response.json();
        if (!data.pairs || data.pairs.length === 0) {
            return null;
        }
        // Filter for Solana pairs only and sort by FDV
        let solanaPairs = data.pairs
            .filter((pair) => pair.chainId === "solana")
            .sort((a, b) => (b.fdv || 0) - (a.fdv || 0));
        solanaPairs = solanaPairs.filter((pair) => pair.baseToken.symbol.toLowerCase() === ticker.toLowerCase());
        // Return the address of the highest FDV Solana pair
        return solanaPairs[0].baseToken.address;
    }
    catch (error) {
        console.error("Error fetching token address from DexScreener:", error);
        return null;
    }
}
exports.getTokenAddressFromTicker = getTokenAddressFromTicker;
async function getTokenDataByTicker(ticker) {
    const address = await getTokenAddressFromTicker(ticker);
    if (!address) {
        throw new Error(`Token address not found for ticker: ${ticker}`);
    }
    return getTokenDataByAddress(new web3_js_1.PublicKey(address));
}
exports.getTokenDataByTicker = getTokenDataByTicker;
//# sourceMappingURL=token_data.operation.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const ZeroCombineFetcher_1 = require("../config/ZeroCombineFetcher");
/**
 * @description This script fetches the latest transaction for a given public key using the ZeroCombineFetcher.
 * @param {string} publicKey - The agent public key to fetch the latest transaction for.
 * @returns {Promise<void>} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 */
new ZeroCombineFetcher_1.ZeroCombineFetcher(new web3_js_1.PublicKey("2n7aXr7v9x4hJ6Y5cZ5V6f8k1q5x3t4g1f5v5f5f5f5f"), new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed")).execute().catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Finished");
});
//# sourceMappingURL=fetcher.js.map
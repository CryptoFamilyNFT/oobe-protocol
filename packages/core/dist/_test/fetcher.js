"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const ZeroCombineFetcher_1 = require("../config/ZeroCombineFetcher");
const default_1 = require("../config/default");
/**
 * @description This script fetches the latest transaction for a given public key using the ZeroCombineFetcher.
 * @param {string} publicKey - The agent public key to fetch the latest transaction for.
 * @param {number} limit - The number of transactions to fetch.
 * @param {string[]} transportsRPC - An array of RPC URLs to use for fetching the transactions.
 * @param {string} connectionUrl - The Solana connection URL to use for fetching the transactions.
 * @returns {ProofRecord} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 */
const configManager = new default_1.ConfigManager().setDefaultConfig({
    transportsRPC: [
        "https://api.mainnet-beta.solana.com",
        "https://mainnet.helius-rpc.com",
    ]
});
new ZeroCombineFetcher_1.ZeroCombineFetcher(new web3_js_1.PublicKey("7pz2bh5Spq9HqF4gLz4tCmU935yYgNzkkLi4yPs6Aiws"), new web3_js_1.Connection("https://api.mainnet-beta.solana.com"), configManager).execute(1000).then((x) => console.log(x)).catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Finished");
});
//# sourceMappingURL=fetcher.js.map
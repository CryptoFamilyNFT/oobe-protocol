"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const ZeroCombineFetcher_1 = require("../config/ZeroCombineFetcher");
/**
 * @description This script fetches the latest transaction for a given public key using the ZeroCombineFetcher.
 * @param {string} publicKey - The agent public key to fetch the latest transaction for.
 * @returns {ProofRecord} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 */
new ZeroCombineFetcher_1.ZeroCombineFetcher(new web3_js_1.PublicKey("7pz2bh5Spq9HqF4gLz4tCmU235yYgNzkkLi4qPs6Aiws"), new web3_js_1.Connection("https://api.mainnet-beta.solana.com", "confirmed")).execute(1000).then((x) => console.log(x)).catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Finished");
});
//# sourceMappingURL=fetcher.js.map
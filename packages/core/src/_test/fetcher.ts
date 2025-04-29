import { Connection, PublicKey } from "@solana/web3.js";
import { ZeroCombineFetcher } from "../config/ZeroCombineFetcher";
import { ConfigManager } from "../config/default";

/**
 * @description This script fetches the latest transaction for a given public key using the ZeroCombineFetcher.
 * @param {string} publicKey - The agent public key to fetch the latest transaction for.
 * @param {number} limit - The number of transactions to fetch.
 * @param {string[]} transportsRPC - An array of RPC URLs to use for fetching the transactions.
 * @param {string} connectionUrl - The Solana connection URL to use for fetching the transactions.
 * @returns {ProofRecord} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 */
const configManager = new ConfigManager().setDefaultConfig({
    transportsRPC: [
        "https://api.mainnet-beta.solana.com",
        "https://mainnet.helius-rpc.com",
    ]
})
new ZeroCombineFetcher(
    new PublicKey("7pz2bh5Spq9HqF4gLz4tCmU935yYgNzkkLi4yPs6Aiws"),
    new Connection("https://api.mainnet-beta.solana.com"),
    configManager
).execute(1000).then((x) => console.log(x)).catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Finished");
})

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaTokenBalances = SolanaTokenBalances;
const web3_js_1 = require("@solana/web3.js");
const spl_token_1 = require("@solana/spl-token");
const spl_v1_1 = require("spl-v1");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const SmartRoundRobinRPC_1 = require("../../../utils/SmartRoundRobinRPC");
async function SolanaTokenBalances(agent, walletAddress) {
    const solanaRpcClient = new SmartRoundRobinRPC_1.SolanaRpcClient();
    const publicKey = walletAddress ?? agent.wallet.publicKey;
    console.log("⏳ Fetching balances and token accounts...");
    const [lamportsBalance, splTokenAccounts, token2022Accounts] = await Promise.all([
        Number(solanaRpcClient.getBalance(publicKey)),
        solanaRpcClient.getTokenAccountsByOwner(publicKey, spl_token_1.TOKEN_PROGRAM_ID),
        solanaRpcClient.getTokenAccountsByOwner(publicKey, spl_v1_1.TOKEN_2022_PROGRAM_ID),
    ]);
    console.log("✅ Balances and token accounts fetched");
    console.log("values", splTokenAccounts, token2022Accounts);
    const allTokenAccounts = [...splTokenAccounts.value, ...token2022Accounts.value];
    console.log(`📦 Found ${allTokenAccounts.length} token accounts`);
    console.log("🔄 Processing token accounts...");
    // Step 1: Costruiamo la lista con PDA e dati di base
    const tokenBalances = allTokenAccounts
        .map((v) => {
        const info = v.account.data.parsed.info;
        const mint = info.mint;
        const balance = info.tokenAmount.uiAmount;
        const decimals = info.tokenAmount.decimals;
        if (balance === 0)
            return null;
        const [metadataPDA] = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from("metadata"),
            raydium_sdk_v2_1.METADATA_PROGRAM_ID.toBuffer(),
            new web3_js_1.PublicKey(mint).toBuffer(),
        ], raydium_sdk_v2_1.METADATA_PROGRAM_ID);
        return {
            metadataPDA,
            tokenAddress: mint,
            balance,
            decimals,
        };
    })
        .filter((x) => x !== null);
    // Step 2: Decodifica metadati in batch
    const metadataAccounts = await solanaRpcClient.getMultipleAccountInfo(tokenBalances.map((x) => {
        console.log("🗿", x);
        return x.metadataPDA;
    }));
    // Step 3: Associa metadati ai token corrispondenti
    const finalTokens = tokenBalances.map((token, i) => {
        const account = metadataAccounts[i];
        let name = "Unknown";
        let symbol = "UNKNOWN";
        let sellerFee = 0;
        // Check if the account is null or undefined
        if (account?.data) {
            console.log("account", account);
            try {
                let offset = 1 + 32 + 32; // skip key, updateAuthority, mint
                const nameRaw = account.data.slice(offset, offset + 32);
                name = nameRaw.toString("utf8").replace(/\0/g, "").trim();
                offset += 32;
                const symbolRaw = account.data.slice(offset, offset + 16);
                symbol = symbolRaw.toString("utf8").replace(/\0/g, "").trim();
                // dopo uri
                const _sellerFee = account.data.slice(offset, offset + 2); // 2 byte
                sellerFee = Number(_sellerFee.toString("utf8").replace(/\0/g, "").trim());
                console.log("Decoded metadata:", name, symbol, sellerFee);
            }
            catch (e) {
                console.warn(`⚠️ Failed to decode metadata for token ${token.tokenAddress}`, e);
            }
        }
        return {
            tokenAddress: token.tokenAddress,
            name,
            symbol,
            balance: token.balance,
            decimals: token.decimals,
            isNFT: sellerFee > 0
        };
    });
    console.log("🏁 Token accounts processed");
    return {
        sol: lamportsBalance / web3_js_1.LAMPORTS_PER_SOL,
        tokens: finalTokens.filter((x) => x !== null),
    };
}
//# sourceMappingURL=token_balances.js.map
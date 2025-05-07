import { AccountInfo, LAMPORTS_PER_SOL, ParsedAccountData, PublicKey } from "@solana/web3.js";
import type { Agent } from "../../../agent/Agents";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { TOKEN_2022_PROGRAM_ID } from "spl-v1";
import { METADATA_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";
import { Idl, BorshAccountsCoder } from "@coral-xyz/anchor";
import { METADATA_IDL } from "../../../utils/IDL/metadataIdl";
import { SolanaRpcClient } from "../../../utils/SmartRoundRobinRPC";

export async function SolanaTokenBalances(
  agent: Agent,
  walletAddress?: PublicKey,
): Promise<{
  sol: number;
  tokens: Array<{
    tokenAddress: string;
    name: string;
    symbol: string;
    balance: number;
    decimals: number;
  }>;
}> {
  console.log("🚀 Starting SolanaTokenBalances function");
  const solanaRpcClient = new SolanaRpcClient();
  const publicKey = walletAddress ?? agent.wallet.publicKey;
  console.log("🔑 Using public key:", publicKey.toBase58());

  console.log("⏳ Fetching balances and token accounts...");
  const [lamportsBalance, splTokenAccounts, token2022Accounts] = await Promise.all([
    Number(solanaRpcClient.getBalance(publicKey)),
    solanaRpcClient.getTokenAccountsByOwner(publicKey, TOKEN_PROGRAM_ID),
    solanaRpcClient.getTokenAccountsByOwner(publicKey, TOKEN_2022_PROGRAM_ID),
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
      const balance = info.tokenAmount.uiAmount as number;
      const decimals = info.tokenAmount.decimals as number;

      if (balance === 0) return null;

      const [metadataPDA] = PublicKey.findProgramAddressSync(
        [
          Buffer.from("metadata"),
          METADATA_PROGRAM_ID.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        METADATA_PROGRAM_ID
      );

      return {
        metadataPDA,
        tokenAddress: mint,
        balance,
        decimals,
      };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  // Step 2: Decodifica metadati in batch
  const metadataAccounts = await solanaRpcClient.getMultipleAccountInfo(
    tokenBalances.map((x) => {
      console.log("🗿", x)
      return x.metadataPDA
    })
  );

  // Step 3: Associa metadati ai token corrispondenti
  const finalTokens = tokenBalances.map((token, i) => {
    const account = metadataAccounts[i];
    let name = "Unknown";
    let symbol = "UNKNOWN";
    let sellerFee = 0

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

      } catch (e) {
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
    sol: lamportsBalance / LAMPORTS_PER_SOL,
    tokens: finalTokens.filter((x): x is NonNullable<typeof x> => x !== null),
  };
}

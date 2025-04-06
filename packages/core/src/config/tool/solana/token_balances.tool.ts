import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import type { Agent } from "../../../agent/Agents";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { getTokenMetadata } from "../../../utils/tokenMetadata";

/**
 * Get the token balances of a Solana wallet
 * @param agent - SolanaAgentKit instance
 * @param token_address - Optional SPL token mint address. If not provided, returns SOL balance
 * @returns Promise resolving to the balance as an object containing sol balance and token balances with their respective mints, symbols, names and decimals
 */
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
  const [lamportsBalance, tokenAccountData] = await Promise.all([
    agent.connection.getBalance(walletAddress ?? new PublicKey(agent.walletAddress)),
    agent.connection.getParsedTokenAccountsByOwner(
      walletAddress ?? new PublicKey(agent.walletAddress),
      {
        programId: TOKEN_PROGRAM_ID,
      },
    ),
  ]);

  const removedZeroBalance = tokenAccountData.value.filter(
    (v) => v.account.data.parsed.info.tokenAmount.uiAmount !== 0,
  );

  const tokenBalances = await Promise.all(
    removedZeroBalance.map(async (v) => {
      const mint = v.account.data.parsed.info.mint;
      const metadataPDA = await PublicKey.findProgramAddress(
        [
          Buffer.from("metadata"),
          TOKEN_PROGRAM_ID.toBuffer(),
          new PublicKey(mint).toBuffer(),
        ],
        TOKEN_PROGRAM_ID
      );
      const mintInfo = await getTokenMetadata(agent.connection, metadataPDA[0], mint);
      return {
        tokenAddress: mint,
        name: mintInfo?.name ?? "",
        symbol: mintInfo?.symbol ?? "",
        balance: v.account.data.parsed.info.tokenAmount.uiAmount as number,
        decimals: v.account.data.parsed.info.tokenAmount.decimals as number,
      };
    }),
  );

  const solBalance = lamportsBalance / LAMPORTS_PER_SOL;

  return {
    sol: solBalance,
    tokens: tokenBalances,
  };
}
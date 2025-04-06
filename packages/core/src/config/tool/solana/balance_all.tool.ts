import { Tool } from "@langchain/core/tools";
import { RayOperation } from "../../../operations/ray/ray.operation";
import { findProgramAddress, getPdaMetadataKey, TokenAccount } from "@raydium-io/raydium-sdk-v2";
import { NonceAccount, ParsedAccountData } from "@solana/web3.js";
import { getTokenMetadata } from "../../../utils/tokenMetadata";
import { Agent } from "../../../agent/Agents";

export class balanceAllTokensOwnedTool extends Tool {
    name = "solana_balance_all_tokens_owned";
    description = `Get the balance of all tokens owned by a Solana wallet.
    use your wallet address using fetch_agent_keypair where you check your balance if user say it generally, remember the correlation between name, symbol and tokenMint.

    Input (input is JSON string):
    walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
    `;

    constructor(private agent: Agent) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        const rayOp = new RayOperation(this.agent);
        console.log("Input:", input);
        try {
            // Parse and normalize input
            const parsedInput = typeof input === "string" && input.trim().startsWith("{")
            ? JSON.parse(input)
            : { walletAddress: input.trim() };
            let walletAddress;

            if (!parsedInput.tokenAddress || Object.keys(parsedInput.tokenAddress).length === 0) {
                walletAddress = this.agent.wallet.publicKey.toBase58();
            }

            const { tokenAccounts } = await rayOp.parseTokenAccountData();

            const results = [];

            for (const tokenAccount of tokenAccounts) {
                if (tokenAccount?.publicKey) {
                    const pdaMint = getPdaMetadataKey(tokenAccount?.mint);

                    try {
                        const metadata = await getTokenMetadata(
                            this.agent.connection,
                            pdaMint.publicKey,
                            tokenAccount?.mint
                        );

                        if (metadata) {
                            results.push({
                                ...metadata,
                                tokenMint: tokenAccount.mint.toBase58(),
                                balance: tokenAccount.amount.toNumber() / Math.pow(10, metadata.decimals), // Convert from BN to decimal using metadata decimals
                            });

                            results[results.length - 1].balance = parseFloat(
                                results[results.length - 1].balance.toFixed(metadata.decimals)
                            );
                        }
                    } catch (error: any) {
                        if (error.message.includes("TokenInvalidAccountOwnerError")) {
                            continue;
                        }
                    }
                }
            }

            return JSON.stringify({
                status: "success",
                tokens: results,
            });
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
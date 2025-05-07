import { StructuredTool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
import { PublicKey } from "@solana/web3.js";

export class GetAssociatedForTokensAndSharesTool extends StructuredTool {
    name = "get_associated_token_and_shares_for_kamino_strategy";
    description = "Get associated token addresses and data for a Kamino strategy.";
  
    schema = z.object({
      address: z.string().describe("Strategy public key"),
    });
  
    constructor(private kamino: kaminoOperations) {
      super();
    }
  
    async _call(input: z.infer<typeof this.schema>) {
        try {
      const strategy = await this.kamino.getKaminoCustomStrategy(new PublicKey(input.address));

      const associated = await this.kamino.getAssociatedForTokensAndShares({
          strategy: strategy,
          strategyPubkey: new PublicKey(input.address)
      });

        if (!associated) {
            return JSON.stringify({
            status: 'error',
            message: 'Associated token addresses not found',
            });
        }


        if (!strategy) {
            return JSON.stringify({
                status: 'error',
                message: 'Strategy not found',
            });
        }

      return JSON.stringify({
        sharesAta: associated?.sharesAta.toBase58(),
        tokenAAta: associated?.tokenAAta.toBase58(),
        tokenBAta: associated?.tokenBAta.toBase58(),
        sharesMint: strategy.sharesMint.toBase58(),
        tokenAMint: strategy.tokenAMint.toBase58(),
        tokenBMint: strategy.tokenBMint.toBase58(),
      });
    } catch(e: any) {
        if (e instanceof z.ZodError) {
            return JSON.stringify({
                status: 'error',
                message: `Invalid input: ${e.message}`,
            });
        }
        return JSON.stringify({
            status: 'error',
            message: e.message,
        });
    }
    }
  }
  
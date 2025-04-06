import { PublicKey } from "@solana/web3.js";
import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";

export class PerpCloseTradeTool extends Tool {
  name = "solana_close_perp_trade";
  description = `This tool can be used to close perpetuals trade ( It uses Adrena Protocol ).

  Inputs ( input is a JSON string ):
  tradeMint: string, eg "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn", "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" etc. (optional)
  price?: number, eg 100 (optional)
  side: string, eg: "long" or "short"`;

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(input: string): Promise<string> {
    try {
      const parsedInput = JSON.parse(input);

      const tx =
        parsedInput.side === "long"
          ? await this.agent.closePerpTradeLong({
              price: parsedInput.price,
              tradeMint: new PublicKey(parsedInput.tradeMint),
            })
          : await this.agent.closePerpTradeShort({
              price: parsedInput.price,
              tradeMint: new PublicKey(parsedInput.tradeMint),
            });

      return JSON.stringify({
        status: "success",
        message: "Perpetual trade closed successfully",
        transaction: tx,
        price: parsedInput.price,
        tradeMint: new PublicKey(parsedInput.tradeMint),
        side: parsedInput.side,
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
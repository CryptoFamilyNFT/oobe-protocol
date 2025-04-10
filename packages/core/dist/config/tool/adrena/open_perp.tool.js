"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerpOpenTradeTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("langchain/tools");
class PerpOpenTradeTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "open_perp_trade";
        this.description = `This tool can be used to open perpetuals trade ( It uses Adrena Protocol ).

  Inputs ( input is a JSON string ):
  collateralAmount: number, eg 1 or 0.01 (required)
  collateralMint: string, eg "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn" or "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" etc. (optional)
  tradeMint: string, eg "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn", "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" etc. (optional)
  leverage: number, eg 50000 = x5, 100000 = x10, 1000000 = x100 (optional)
  price?: number, eg 100 (optional)
  slippage?: number, eg 0.3 (optional)
  side: string, eg: "long" or "short"`;
    }
    async _call(input) {
        try {
            const parsedInput = JSON.parse(input);
            const tx = parsedInput.side === "long"
                ? await this.agent.openPerpTradeLong({
                    price: parsedInput.price,
                    collateralAmount: parsedInput.collateralAmount,
                    collateralMint: new web3_js_1.PublicKey(parsedInput.collateralMint),
                    leverage: parsedInput.leverage,
                    tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
                    slippage: parsedInput.slippage,
                })
                : await this.agent.openPerpTradeLong({
                    price: parsedInput.price,
                    collateralAmount: parsedInput.collateralAmount,
                    collateralMint: new web3_js_1.PublicKey(parsedInput.collateralMint),
                    leverage: parsedInput.leverage,
                    tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
                    slippage: parsedInput.slippage,
                });
            return JSON.stringify({
                status: "success",
                message: "Perpetual trade opened successfully",
                transaction: tx,
                price: parsedInput.price,
                collateralAmount: parsedInput.collateralAmount,
                collateralMint: new web3_js_1.PublicKey(parsedInput.collateralMint),
                leverage: parsedInput.leverage,
                tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
                slippage: parsedInput.slippage,
                side: parsedInput.side,
            });
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.PerpOpenTradeTool = PerpOpenTradeTool;
//# sourceMappingURL=open_perp.tool.js.map
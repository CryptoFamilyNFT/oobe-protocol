"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerpCloseTradeTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class PerpCloseTradeTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        tradeMint: zod_1.z.string().optional().nullable(),
        price: zod_1.z.number().optional().nullable(),
        side: zod_1.z.string().refine(val => val === "long" || val === "short", {
            message: "Side must be either 'long' or 'short'",
        }),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "solana_close_perp_trade";
        this.description = `This tool can be used to close perpetuals trade ( It uses Adrena Protocol ).

  Inputs ( input is a JSON string ):
  tradeMint: string, eg "J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn", "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" etc. (optional)
  price?: number, eg 100 (optional)
  side: string, eg: "long" or "short"`;
    }
    async _call(input) {
        try {
            const parsedInput = JSON.parse(JSON.stringify(input));
            if (!parsedInput.tradeMint) {
                return JSON.stringify({
                    status: "error",
                    message: "tradeMint is required",
                    code: "INVALID_INPUT",
                });
            }
            const tx = parsedInput.side === "long"
                ? await this.agent.closePerpTradeLong({
                    price: parsedInput.price,
                    tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
                })
                : await this.agent.closePerpTradeShort({
                    price: parsedInput.price,
                    tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
                });
            return JSON.stringify({
                status: "success",
                message: "Perpetual trade closed successfully",
                transaction: tx,
                price: parsedInput.price,
                tradeMint: new web3_js_1.PublicKey(parsedInput.tradeMint),
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
exports.PerpCloseTradeTool = PerpCloseTradeTool;
//# sourceMappingURL=close_perp.tool.js.map
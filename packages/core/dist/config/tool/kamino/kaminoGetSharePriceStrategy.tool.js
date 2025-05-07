"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKaminoSharePriceTool = void 0;
const zod_1 = require("zod");
const tools_1 = require("langchain/tools");
const web3_js_1 = require("@solana/web3.js");
class GetKaminoSharePriceTool extends tools_1.StructuredTool {
    constructor(kamino, schema = zod_1.z.object({
        input: zod_1.z.string().nullable().describe("Strategy public key"),
    })) {
        super();
        this.kamino = kamino;
        this.schema = schema;
        this.name = "get_kamino_share_price";
        this.description = "Get the share price of a Kamino strategy.";
    }
    async _validateInput(input) {
        if (input === null) {
            throw new Error("Input cannot be null.");
        }
        if (!input) {
            throw new Error("Input is required but was not provided.");
        }
        const parsed = this.schema.safeParse(input);
        if (!parsed.success) {
            throw new Error(`Invalid input: ${parsed.error.message}`);
        }
        return parsed.data;
    }
    async _call(input) {
        try {
            if (!input) {
                throw new Error("Input is required but was not provided.");
            }
            const price = await this.kamino.getKaminoSharePrice(new web3_js_1.PublicKey(input));
            return price.toString();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return `Invalid input: ${error.message}`;
            }
            throw error;
        }
    }
}
exports.GetKaminoSharePriceTool = GetKaminoSharePriceTool;
//# sourceMappingURL=kaminoGetSharePriceStrategy.tool.js.map
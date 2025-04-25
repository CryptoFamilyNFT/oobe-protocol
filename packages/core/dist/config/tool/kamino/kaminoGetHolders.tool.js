"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetKaminoHoldersTool = void 0;
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("langchain/tools");
class GetKaminoHoldersTool extends tools_1.StructuredTool {
    constructor(kamino, schema = zod_1.z.object({
        address: zod_1.z.string().describe("Strategy public key"),
    })) {
        super();
        this.kamino = kamino;
        this.schema = schema;
        this.name = "get_kamino_holders";
        this.description = "Get the token holders of a Kamino strategy.";
    }
    async _call(input) {
        try {
            const holders = await this.kamino.getKaminoHolders(new web3_js_1.PublicKey(input.address));
            return JSON.stringify(holders);
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: 'error',
                message: error.message,
            });
        }
    }
}
exports.GetKaminoHoldersTool = GetKaminoHoldersTool;
//# sourceMappingURL=kaminoGetHolders.tool.js.map
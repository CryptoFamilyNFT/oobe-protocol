"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchAgentKeypair = void 0;
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class FetchAgentKeypair extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({})) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "fetch_agent_keypair";
        this.description = `Fetch the agent's wallet keypair. 
    This tool can be used to fetch the agent's wallet keypair. 
    This is your publicKey use for address reference to your wallet.
     `;
    }
    async _call() {
        try {
            const keypair = this.agent.wallet.publicKey;
            return JSON.stringify({
                status: "success",
                message: "Agent keypair fetched successfully",
                keypair,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: "error",
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.FetchAgentKeypair = FetchAgentKeypair;
//# sourceMappingURL=fetch_agent_wallet.js.map
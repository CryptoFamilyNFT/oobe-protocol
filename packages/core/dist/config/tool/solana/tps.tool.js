"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaTPSCalculatorTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class SolanaTPSCalculatorTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({})) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "solana_get_tps";
        this.description = "Get the current TPS of the Solana network";
    }
    async _call(_input) {
        try {
            const tps = await this.agent.getTPS();
            return `Solana (mainnet-beta) current transactions per second: ${tps}`;
        }
        catch (error) {
            return `Error fetching TPS: ${error.message}`;
        }
    }
}
exports.SolanaTPSCalculatorTool = SolanaTPSCalculatorTool;
//# sourceMappingURL=tps.tool.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ray_operation_1 = require("../../operations/ray/ray.operation");
const zod_1 = require("zod");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const GetRaydiumTokens = {
    name: "GET_TOKENS_ON_RAYDIUM",
    similes: [],
    description: "Buy a token on Raydium with specified parameters",
    examples: [
        [
            {
                input: {},
                output: {
                    baseToken: "SOL",
                    quoteToken: "USDC",
                },
                explanation: "Check/Fetch new pools on Raydium",
            },
        ],
    ],
    schema: zod_1.z.object({}),
    handler: async (agent) => {
        try {
            const operation = new ray_operation_1.RayOperation(agent);
            const data = await operation.getNewPools();
            await (0, raydium_sdk_v2_1.sleep)(10000);
            return {
                baseToken: data[0]?.baseToken,
                quoteToken: data[0]?.quoteToken,
            };
        }
        catch (e) {
            console.error("Error in GET_TOKENS_ON_RAYDIUM tool:", e);
            throw new Error("Failed to get tokens on Raydium");
        }
    },
};
exports.default = GetRaydiumTokens;
//# sourceMappingURL=r_get.actions.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const token_data_operation_1 = require("../../operations/token_data/token_data.operation");
const tokenDataAction = {
    name: "GET_TOKEN_DATA",
    similes: [
        "token data by ticker",
        "fetch token info by ticker",
        "lookup token ticker info",
        "get token info by ticker",
    ],
    description: "Get the token data for a given token ticker",
    examples: [
        [
            {
                input: {
                    ticker: "USDC",
                },
                output: {
                    status: "success",
                    tokenData: {
                        // Some placeholder example data
                        symbol: "USDC",
                        name: "USD Coin",
                        decimals: 6,
                        mintAddress: "FhRg...",
                    },
                },
                explanation: "Fetches metadata for the USDC token by its ticker.",
            },
        ],
    ],
    schema: zod_1.z.object({
        ticker: zod_1.z.string().min(1).describe("Ticker of the token, e.g. 'USDC'"),
    }),
    handler: async (agent, input) => {
        try {
            const ticker = input.ticker;
            const tokenData = await (0, token_data_operation_1.getTokenDataByTicker)(ticker);
            return {
                status: "success",
                tokenData: tokenData,
                message: `Successfully fetched token data for ticker: ${ticker}`,
            };
        }
        catch (error) {
            return {
                status: "error",
                message: `Failed to fetch token data for ticker: ${input.ticker || ""}. ${error.message}`,
                code: error.code || "UNKNOWN_ERROR",
            };
        }
    },
};
exports.default = tokenDataAction;
//# sourceMappingURL=tokenData.js.map
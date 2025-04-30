"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRugsAction = void 0;
const zod_1 = require("zod");
const dex_operation_1 = require("../../operations/dex/dex.operation");
exports.checkRugsAction = {
    name: "CHECK_RUGS_ACTION",
    similes: [
        "check tokens for rug pulls",
        "check if the token is scams",
        "check if the token is a rug pull",
        "check hodlings for rug pulls",
        "check if the token is a scam",
    ],
    description: "Check if a token or multiple tokens is/are rug pull/s. Return a trade analysis with market advice and buy/sell recommendations.",
    examples: [
        [
            {
                input: {
                    tokenAddress: ["SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa", "aEfDdRQtYMWaQrsroBrJ2Q53fgVdq95CV9UPGEvpCxa"],
                },
                output: {
                    status: "success",
                    message: "[{ token: 'SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa', analysis: {isRug: 'This token is a rug pull'}, pair: {...}, recommendations: 'Sell immediately due to high risk' }]",
                    token: "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa",
                },
                explanation: "Check if the token is a rug pull and provide market advice.",
            },
        ],
    ],
    schema: zod_1.z.object({
        tokenAddress: zod_1.z.union([
            zod_1.z.string().describe("Wallet address to check rug pulls for"),
            zod_1.z.array(zod_1.z.string()).describe("Array of wallet addresses to check rug pulls for"),
        ]),
    }),
    handler: async (agent, input) => {
        const dexOps = new dex_operation_1.DexOperation(agent);
        try {
            const { tokenAddress } = input;
            let data;
            if (Array.isArray(tokenAddress)) {
                let _tokens = [];
                for (const token of tokenAddress) {
                    const analysis = await dexOps.GetRugCheckAnalysis(token);
                    const poolDetails = await dexOps.GetTokenPoolDetails(token);
                    const supportLevel = dexOps.calculateSupportLevel(JSON.parse(poolDetails));
                    const resistanceLevel = dexOps.calculateResistanceLevel(JSON.parse(poolDetails));
                    const volatility = dexOps.calculateVolatility(JSON.parse(poolDetails));
                    const whaleRisk = dexOps.detectWhaleRisk(JSON.parse(analysis));
                    const riskAnalysis = dexOps.analyzeRisk(JSON.parse(analysis));
                    const rsi = dexOps.calculateRSI(JSON.parse(poolDetails));
                    const recommendations = dexOps.generateRecommendations(JSON.parse(poolDetails), JSON.parse(analysis));
                    _tokens.push({
                        token,
                        data: analysis,
                        poolDetails,
                        supportLevel,
                        resistanceLevel,
                        volatility,
                        whaleRisk,
                        rsi,
                        riskScore: riskAnalysis.score,
                        riskLevel: riskAnalysis.level,
                        recommendations,
                        marketAdvice: "",
                    });
                }
                data = _tokens;
            }
            else {
                const analysis = await dexOps.GetRugCheckAnalysis(tokenAddress);
                const poolDetails = await dexOps.GetTokenPoolDetails(tokenAddress);
                const supportLevel = dexOps.calculateSupportLevel(JSON.parse(poolDetails));
                const resistanceLevel = dexOps.calculateResistanceLevel(JSON.parse(poolDetails));
                const volatility = dexOps.calculateVolatility(JSON.parse(poolDetails));
                const whaleRisk = dexOps.detectWhaleRisk(JSON.parse(analysis));
                const riskAnalysis = dexOps.analyzeRisk(JSON.parse(analysis));
                const rsi = dexOps.calculateRSI(JSON.parse(poolDetails));
                const recommendations = dexOps.generateRecommendations(JSON.parse(poolDetails), JSON.parse(analysis));
                data = {
                    token: tokenAddress,
                    analysis,
                    poolDetails,
                    supportLevel,
                    resistanceLevel,
                    volatility,
                    whaleRisk,
                    rsi,
                    riskScore: riskAnalysis.score,
                    riskLevel: riskAnalysis.level,
                    recommendations,
                };
            }
            return { status: "success", data };
        }
        catch (error) {
            return {
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            };
        }
    },
};
//# sourceMappingURL=checkRugs.js.map
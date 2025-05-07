"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckTokensRugTool = void 0;
const tools_1 = require("langchain/tools");
const dex_operation_1 = require("../../../operations/dex/dex.operation");
const zod_1 = require("zod");
class CheckTokensRugTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        tokenAddress: zod_1.z.union([zod_1.z.string(), zod_1.z.array(zod_1.z.string())])
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "analyze_rug_check_and_technical_analysis_token";
        this.description = `Check if a token is a rug pull. 
    Extract the mint token address from the data if it contains other data.
    If you want to check multiple tokens, you can provide an array of token addresses.
    If no tokenAddress is provided, use your wallet address using fetch_agent_keypair where you check your balance and use mint res from it.
    If you got poolDetails in the response it means you have to make a techinal trading analysis to trade that token.
    Return a trade analisys techinal about all the data you get.
    **Expected input format**: A JSON string with the following structure:
    {
      "tokenAddress": "string | string[]"
    }
    Example:
    {
      "tokenAddress": "SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa"
    }
    or
    {
      "tokenAddress": ["SENDdRQtYMWaQrBroBrJ2Q53fgVuq95CV9UPGEvpCxa", "aEfDdRQtYMWaQrsroBrJ2Q53fgVdq95CV9UPGEvpCxa"]
    }`;
    }
    async _call(input) {
        const dexOps = new dex_operation_1.DexOperation(this.agent);
        try {
            const { tokenAddress } = JSON.parse(JSON.stringify(input));
            let data;
            if (Array.isArray(tokenAddress)) {
                let _tokens = [];
                for (const token of tokenAddress) {
                    const poolDetails = await dexOps.GetTokenPoolDetails(token);
                    // Check if poolDetails is empty or has empty string
                    if (!poolDetails || poolDetails === "") {
                        console.log(`No pool details found for token: ${token}`);
                        continue; // Skip this token
                    }
                    data = await dexOps.GetRugCheckAnalysis(token);
                    const supportLevel = dexOps.calculateSupportLevel(JSON.parse(poolDetails));
                    const resistanceLevel = dexOps.calculateResistanceLevel(JSON.parse(poolDetails));
                    const volatility = dexOps.calculateVolatility(JSON.parse(poolDetails));
                    const whaleRisk = dexOps.detectWhaleRisk(JSON.parse(data));
                    const riskAnalysis = dexOps.analyzeRisk(JSON.parse(data));
                    const rsi = dexOps.calculateRSI(JSON.parse(poolDetails));
                    const recommendations = dexOps.generateRecommendations(JSON.parse(poolDetails), JSON.parse(data));
                    _tokens.push({
                        token,
                        data: data,
                        poolDetails: poolDetails.length ? poolDetails : null,
                        supportLevel,
                        resistanceLevel,
                        volatility,
                        whaleRisk,
                        rsi,
                        riskScore: riskAnalysis.score,
                        riskLevel: riskAnalysis.level,
                        recommendations
                    });
                }
                return data = JSON.stringify(_tokens);
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
                data = {
                    token: tokenAddress,
                    analysis,
                    poolDetails: poolDetails,
                    supportLevel,
                    resistanceLevel,
                    volatility,
                    whaleRisk,
                    rsi,
                    riskScore: riskAnalysis.score,
                    riskLevel: riskAnalysis.level,
                    recommendations: dexOps.generateRecommendations(JSON.parse(poolDetails), JSON.parse(analysis))
                };
            }
            console.log(data);
            return JSON.stringify({ status: 'success', data });
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
                message: error,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.CheckTokensRugTool = CheckTokensRugTool;
//# sourceMappingURL=check_tokens.tool.js.map
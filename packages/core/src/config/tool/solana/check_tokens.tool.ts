import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { DexOperation } from "../../../operations/dex/dex.operation";
import { Pair } from "../../../types/dex.interface";
import { RugCheck } from "../../../types/rugCheck.interface";

export class CheckTokensRugTool extends Tool {
    name = "check_tokens_rug";
    description = `Check if a token is a rug pull. 
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

    constructor(private agent: Agent) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        const dexOps = new DexOperation(this.agent);
        
        try {
            const { tokenAddress } = JSON.parse(input);

            let data;
            if (Array.isArray(tokenAddress)) {
                let _tokens = [];
                for (const token of tokenAddress) {
                    const poolDetails = await dexOps.GetTokenPoolDetails(token);
                    data = await dexOps.GetRugCheckAnalysis(token);
                    const supportLevel = dexOps.calculateSupportLevel(JSON.parse(poolDetails) as Pair);
                    const resistanceLevel = dexOps.calculateResistanceLevel(JSON.parse(poolDetails) as Pair);
                    const volatility = dexOps.calculateVolatility(JSON.parse(poolDetails) as Pair);
                    const whaleRisk = dexOps.detectWhaleRisk(JSON.parse(data));
                    const riskAnalysis = dexOps.analyzeRisk(JSON.parse(data));
                    const rsi = dexOps.calculateRSI(JSON.parse(poolDetails) as Pair);
        
                    const recommendations = dexOps.generateRecommendations(JSON.parse(poolDetails) as Pair, JSON.parse(data) as RugCheck);
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
            } else {
                const analysis = await dexOps.GetRugCheckAnalysis(tokenAddress);
                const poolDetails = await dexOps.GetTokenPoolDetails(tokenAddress);
                const supportLevel = dexOps.calculateSupportLevel(JSON.parse(poolDetails) as Pair);
                    const resistanceLevel = dexOps.calculateResistanceLevel(JSON.parse(poolDetails) as Pair);
                    const volatility = dexOps.calculateVolatility(JSON.parse(poolDetails) as Pair);
                    const whaleRisk = dexOps.detectWhaleRisk(JSON.parse(analysis));
                    const riskAnalysis = dexOps.analyzeRisk(JSON.parse(analysis));
                    const rsi = dexOps.calculateRSI(JSON.parse(poolDetails) as Pair);
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
                    recommendations: dexOps.generateRecommendations(JSON.parse(poolDetails) as Pair, JSON.parse(analysis) as RugCheck)
                }
            }

            console.log(data);

            return JSON.stringify({status: 'success', data});
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
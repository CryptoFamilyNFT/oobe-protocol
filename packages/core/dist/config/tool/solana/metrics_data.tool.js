"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsDataToolStudyLogics = void 0;
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class MetricsDataToolStudyLogics extends tools_1.StructuredTool {
    constructor(schema = zod_1.z.object({
        token: zod_1.z.string(),
        analysis: zod_1.z.string().describe("JSON string of RugCheck"),
        poolDetails: zod_1.z.string().describe("JSON string of pool details") // JSON string of pool details
    })) {
        super();
        this.schema = schema;
        this.name = "metrics_data_tool_study_logics";
        this.description = `Analyzes market data to provide entry/exit points, risk assessment, RSI analysis, and insights.
    Inputs ( input is a JSON string ):
    {
        token: string,
        analysis: string, // JSON string of RugCheck
        poolDetails: string // JSON string of pool details
    }`;
    }
    async _call(input) {
        try {
            const { token, analysis, poolDetails } = JSON.parse(JSON.stringify(input));
            const rugCheck = JSON.parse(analysis);
            const poolData = JSON.parse(poolDetails);
            const supportLevel = this.calculateSupportLevel(poolData);
            const resistanceLevel = this.calculateResistanceLevel(poolData);
            const volatility = this.calculateVolatility(poolData);
            const whaleRisk = this.detectWhaleRisk(rugCheck);
            const riskAnalysis = this.analyzeRisk(rugCheck);
            const rsi = this.calculateRSI(poolData);
            const recommendations = this.generateRecommendations(supportLevel, resistanceLevel, rsi, riskAnalysis, whaleRisk, volatility);
            return JSON.stringify({
                token,
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
        catch (error) {
            return `Error analyzing market data: ${error.message}`;
        }
    }
    calculateSupportLevel(poolData) {
        const liquidity = poolData.poolLiquidity;
        const volatilityFactor = this.calculateVolatility(poolData);
        return liquidity * (0.9 - volatilityFactor); // Maggiore volatilità, minore supporto
    }
    calculateResistanceLevel(poolData) {
        const liquidity = poolData.poolLiquidity;
        const volatilityFactor = this.calculateVolatility(poolData);
        return liquidity * (1.1 + volatilityFactor); // Maggiore volatilità, maggiore resistenza
    }
    calculateVolatility(poolData) {
        // Differenza tra minimo e massimo prezzo rispetto al prezzo medio
        const priceRange = poolData.poolVolume24h / poolData.poolLiquidity;
        return Math.min(0.2, priceRange); // Limitiamo al 20% per evitare outliers
    }
    detectWhaleRisk(rugCheck) {
        const whaleThreshold = 5; // Se i top holder controllano più del 5%, rischio whale
        const topHolderPercentage = rugCheck.topHolders.reduce((acc, holder) => acc + holder.pct, 0);
        return topHolderPercentage > whaleThreshold;
    }
    analyzeRisk(rugCheck) {
        const score = rugCheck.score_normalised;
        const riskLevel = score < 30 ? "High" : score < 60 ? "Medium" : "Low";
        return { score, level: riskLevel };
    }
    calculateRSI(poolData) {
        const priceHistory = poolData.recentPrices; // Array di prezzi storici
        const period = 14; // RSI standard usa 14 periodi
        if (priceHistory.length < period) {
            return 50; // Default RSI neutrale
        }
        let gains = 0, losses = 0;
        for (let i = 1; i < period; i++) {
            const change = priceHistory[i] - priceHistory[i - 1];
            if (change > 0)
                gains += change;
            else
                losses -= change;
        }
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }
    generateRecommendations(supportLevel, resistanceLevel, rsi, riskAnalysis, whaleRisk, volatility) {
        let advice = "📊 Trade strategy: Buy near support, sell near resistance.";
        if (rsi < 30) {
            advice = "🟢 RSI < 30: Oversold! Potential buy opportunity.";
        }
        else if (rsi > 70) {
            advice = "🔴 RSI > 70: Overbought! Consider selling.";
        }
        if (riskAnalysis.level === "High") {
            advice += " ⚠ High risk detected. Trade cautiously.";
        }
        else if (whaleRisk) {
            advice += " 🚨 Whale accumulation detected. Price manipulation possible.";
        }
        else if (volatility > 0.15) {
            advice += " ⚠ High volatility detected. Be cautious with entry/exit.";
        }
        return {
            entryPoint: supportLevel + 5,
            exitPoint: resistanceLevel - 5,
            advice,
        };
    }
}
exports.MetricsDataToolStudyLogics = MetricsDataToolStudyLogics;
//# sourceMappingURL=metrics_data.tool.js.map
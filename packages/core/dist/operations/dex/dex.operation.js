"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexOperation = void 0;
const axios_1 = __importDefault(require("axios"));
class DexOperation {
    constructor(agent) {
        this.agent = agent;
    }
    async GetProgramName(tokenAccount) {
        const connection = this.agent.connection;
        const accountInfo = await connection.getAccountInfo(tokenAccount);
        if (!accountInfo) {
            return null;
        }
        const programId = accountInfo.owner.toBase58();
        const programName = await this.resolveProgramName(programId);
        return programName || null;
    }
    async resolveProgramName(programId) {
        const programNames = {
            "11111111111111111111111111111111": "System Program",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "Token Program"
        };
        return programNames[programId] || null;
    }
    async GetLatestTokensBoosted() {
        return await axios_1.default.get("https://api.dexscreener.com/token-boosts/latest/v1")
            .then((response) => {
            return JSON.stringify({
                status: "success",
                message: response.data,
            });
        })
            .catch((error) => {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        });
    }
    async GetTopTokensBoosted() {
        return await axios_1.default.get("https://api.dexscreener.com/token-boosts/top/v1")
            .then((response) => {
            return JSON.stringify({
                status: "success",
                message: response.data,
            });
        })
            .catch((error) => {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        });
    }
    async GetTokenPoolDetails(tokenAddress) {
        return await axios_1.default.get(`https://api.dexscreener.com/token-pairs/v1/solana/${tokenAddress}`)
            .then((response) => {
            const data = response.data;
            if (data.length === 0) {
                console.log("firstPair", data);
                if (data.length === 0) {
                    return JSON.stringify({
                        status: "error",
                        message: "No data found for the provided token address.",
                    });
                }
                return JSON.stringify({
                    status: "success",
                    message: data,
                });
            }
            else {
                const firstPair = data[0];
                return JSON.stringify({
                    status: "success",
                    message: firstPair
                });
            }
        })
            .catch((error) => {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        });
    }
    calculateSupportLevel(poolData) {
        if (!poolData) {
            return 0; // Default value if data is missing
        }
        const liquidity = poolData.liquidity;
        if (!liquidity) {
            return 0; // Default value if liquidity is missing
        }
        const { usd } = liquidity;
        if (!usd) {
            return 0; // Default value if liquidity is missing
        }
        const volatilityFactor = this.calculateVolatility(poolData);
        return usd * (0.9 - volatilityFactor);
    }
    calculateResistanceLevel(poolData) {
        if (!poolData || !poolData.liquidity) {
            return 0; // Default value if data is missing
        }
        const liquidity = poolData.liquidity.base;
        const volatilityFactor = this.calculateVolatility(poolData);
        return liquidity * (1.1 + volatilityFactor);
    }
    calculateVolatility(poolData) {
        if (!poolData || !poolData.volume || !poolData.volume.h24 || !poolData.liquidity) {
            return 0; // Default value if data is missing
        }
        const { h24 } = poolData.volume;
        const { usd } = poolData.liquidity;
        const priceRange = h24 / (usd || 1); // Avoid division by zero
        return Math.min(0.2, Math.max(0, priceRange)); // Ensure the value is between 0 and 0.2
    }
    detectWhaleRisk(rugCheck) {
        if (!rugCheck || !rugCheck.topHolders) {
            return false; // Default value if data is missing
        }
        const whaleThreshold = 5;
        const topHolderPercentage = rugCheck.topHolders.reduce((acc, holder) => acc + (holder.pct || 0), 0);
        return topHolderPercentage > whaleThreshold;
    }
    analyzeRisk(rugCheck) {
        if (!rugCheck || typeof rugCheck.score_normalised !== "number") {
            return { score: 0, level: "Unknown" }; // Default value if data is missing
        }
        const score = rugCheck.score_normalised;
        const riskLevel = score < 30 ? "High" : score < 60 ? "Medium" : "Low";
        return { score, level: riskLevel };
    }
    calculateRSI(poolData) {
        const priceChange24h = poolData.priceChange.h24;
        console.log("\x1b[31m%s\x1b[0m", "priceChange24h", priceChange24h);
        const period = 1;
        let gains = 0, losses = 0;
        const change = priceChange24h;
        console.log("\x1b[31m%s\x1b[0m", "change", change);
        if (change > 0)
            gains += change;
        else
            losses -= change;
        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }
    generateRecommendations(poolData, rugCheck) {
        const eximateSupport = poolData.priceUsd ? Number(poolData.priceUsd) * 0.95 : 0; // 5% below current price
        const supportLevel = poolData.priceUsd ? Number(poolData.priceUsd) - eximateSupport : 0;
        return {
            entryPoint: supportLevel,
            exitPoint: Number(poolData.priceUsd) * 1.05,
        };
    }
    getTopHoldersPercOnSupply(holders, totalSupply, decimals) {
        if (!holders || !Array.isArray(holders) || !totalSupply || !decimals) {
            return { percentage: "0%", amount: "0", insiders: 0 }; // Default values if data is missing
        }
        const holdersArrayShifted = holders.slice(1);
        const topHoldersSupply = holdersArrayShifted.reduce((acc, holder) => acc + (holder.amount || 0), 0);
        const insiders = holdersArrayShifted.filter(holder => holder.insider === true)?.length || 0;
        const percentage = (topHoldersSupply / totalSupply) * 100;
        return { percentage: percentage.toFixed(2) + "%", amount: (topHoldersSupply / (10 ** decimals)).toFixed(2), insiders: insiders };
    }
    async GetRugCheckAnalysis(tokenAddress) {
        const maxRetries = 3;
        let attempts = 0;
        let success = false;
        let response = {
            status: "error",
            message: "Unknown error",
        };
        console.log("tokenAddress", tokenAddress);
        while (attempts < maxRetries && !success) {
            response = await axios_1.default.get(`https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`)
                .then((response) => {
                success = true;
                return {
                    status: "success",
                    message: response.data,
                };
            })
                .catch((error) => {
                attempts++;
                if (attempts >= maxRetries) {
                    return {
                        status: "error",
                        message: error.message,
                    };
                }
                return new Promise((resolve) => setTimeout(resolve, 1000));
            });
        }
        if (response.status === "error") {
            return JSON.stringify({
                status: "error",
                message: response.message,
                code: "UNKNOWN_ERROR",
            });
        }
        const content = response.message;
        const { percentage, amount, insiders } = this.getTopHoldersPercOnSupply(content.topHolders, content.token.supply, content.token.decimals);
        const data = {
            isFreezable: content.token.freezeAuthority ? true : false,
            topHoldersPercentage: percentage,
            topHoldersAmount: parseFloat(amount),
            insiders: insiders,
            lockersOwener: content.lockerOwners,
            knowAccounts: content.knownAccounts,
        };
        return JSON.stringify({
            status: "success",
            data,
        });
    }
}
exports.DexOperation = DexOperation;
//# sourceMappingURL=dex.operation.js.map
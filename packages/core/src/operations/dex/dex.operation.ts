import axios from "axios";
import { Agent } from "../../agent/Agents";
import { Pair, TokenDetails } from "../../types/dex.interface";
import { GenericResponse, RugCheckResponse, RugCheck, Holder } from "../../types/rugCheck.interface";
import { PublicKey } from "@solana/web3.js";

export class DexOperation {
    agent: Agent;

    constructor(agent: Agent) {
        this.agent = agent;
    }

    async GetProgramName(tokenAccount: PublicKey): Promise<string | null> {
        const connection = this.agent.connection;
        const accountInfo = await connection.getAccountInfo(tokenAccount);
        if (!accountInfo) {
            return null;
        }

        const programId = accountInfo.owner.toBase58();
        const programName = await this.resolveProgramName(programId);

        return programName || null;
    }

    private async resolveProgramName(programId: string): Promise<string | null> {
        const programNames: { [key: string]: string } = {
            "11111111111111111111111111111111": "System Program",
            "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA": "Token Program"
        };
        return programNames[programId] || null;
    }

    async GetLatestTokensBoosted(): Promise<string> {
        return await axios.get("https://api.dexscreener.com/token-boosts/latest/v1")
            .then((response) => {
                return JSON.stringify({
                    status: "success",
                    message: response.data as TokenDetails[],
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

    async GetTopTokensBoosted(): Promise<string> {
        return await axios.get("https://api.dexscreener.com/token-boosts/top/v1")
            .then((response) => {
                return JSON.stringify({
                    status: "success",
                    message: response.data as TokenDetails[],
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

    async GetTokenPoolDetails(tokenAddress: string): Promise<string> {
        return await axios.get(`https://api.dexscreener.com/token-pairs/v1/solana/${tokenAddress}`)
            .then((response) => {
                const data = response.data;
                if (data.length === 0) {
                    console.log("firstPair", data);
                    return JSON.stringify({
                        status: "success",
                        message: data as Pair,
                    });
                } else {
                    const firstPair = data[0] as Pair;
                    return JSON.stringify({
                        status: "success",
                        message: firstPair as Pair
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

    public calculateSupportLevel(poolData: Pair): number {
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

    public calculateResistanceLevel(poolData: Pair): number {
        if (!poolData || !poolData.liquidity) {
            return 0; // Default value if data is missing
        }
        const liquidity = poolData.liquidity.base;
        const volatilityFactor = this.calculateVolatility(poolData);
        return liquidity * (1.1 + volatilityFactor);
    }

    public calculateVolatility(poolData: Pair): number {
        if (!poolData || !poolData.volume || !poolData.volume.h24 || !poolData.liquidity) {
            return 0; // Default value if data is missing
        }

        const { h24 } = poolData.volume;
        const { usd } = poolData.liquidity;

        const priceRange = h24 / (usd || 1); // Avoid division by zero
        return Math.min(0.2, Math.max(0, priceRange)); // Ensure the value is between 0 and 0.2
    }

    public detectWhaleRisk(rugCheck: RugCheck): boolean {
        if (!rugCheck || !rugCheck.topHolders) {
            return false; // Default value if data is missing
        }
        const whaleThreshold = 5;
        const topHolderPercentage = rugCheck.topHolders.reduce((acc, holder) => acc + (holder.pct || 0), 0);
        return topHolderPercentage > whaleThreshold;
    }

    public analyzeRisk(rugCheck: RugCheck): { score: number; level: string } {
        if (!rugCheck || typeof rugCheck.score_normalised !== "number") {
            return { score: 0, level: "Unknown" }; // Default value if data is missing
        }
        const score = rugCheck.score_normalised;
        const riskLevel = score < 30 ? "High" : score < 60 ? "Medium" : "Low";
        return { score, level: riskLevel };
    }

    public calculateRSI(poolData: Pair): number {
        if (!poolData || !poolData.priceChange || typeof poolData.priceChange.h24 !== "number") {
            return 50; // Default RSI neutral value if data is missing
        }

        const priceChange24h = poolData.priceChange.h24;
        const period = 1;

        if (period <= 0) {
            return 50; // Default RSI neutral value
        }

        let gains = 0, losses = 0;
        const change = priceChange24h;

        if (change > 0) gains += change;
        else losses -= change;

        const avgGain = gains / period;
        const avgLoss = losses / period;
        const rs = avgLoss === 0 ? 100 : avgGain / avgLoss;
        return 100 - (100 / (1 + rs));
    }

    public generateRecommendations(
        poolData: Pair,
        rugCheck: RugCheck
    ): any {
        if (!poolData || !rugCheck) {
            return {
                entryPoint: 0,
                exitPoint: 0,
                advice: "⚠ Insufficient data to generate recommendations.",
            };
        }


        const rsi = this.calculateRSI(poolData) || 50; // Default RSI value if undefined

        const eximateSupport = poolData.priceUsd ? Number(poolData.priceUsd) * 0.95 : 0; // 5% below current price
        const supportLevel = poolData.priceUsd ? Number(poolData.priceUsd) - eximateSupport : 0;

        return {
            entryPoint: supportLevel ? supportLevel + 5 : 0,
            exitPoint: poolData.priceUsd ? Number(poolData.priceUsd) * 1.05 - 5 : 0, // 5% above current price minus 5
            rsi,
        };
    }

    getTopHoldersPercOnSupply(holders: Holder[], totalSupply: number, decimals: number): { percentage: string, amount: string, insiders: number } {
        if (!holders || !Array.isArray(holders) || !totalSupply || !decimals) {
            return { percentage: "0%", amount: "0", insiders: 0 }; // Default values if data is missing
        }
        const holdersArrayShifted = holders.slice(1);
        const topHoldersSupply = holdersArrayShifted.reduce((acc, holder) => acc + (holder.amount || 0), 0);
        const insiders = holdersArrayShifted.filter(holder => holder.insider === true)?.length || 0;
        const percentage = (topHoldersSupply / totalSupply) * 100;
        return { percentage: percentage.toFixed(2) + "%", amount: (topHoldersSupply / (10 ** decimals)).toFixed(2), insiders: insiders };
    }

    async GetRugCheckAnalysis(tokenAddress: string): Promise<string> {
        const maxRetries = 3;
        let attempts = 0;
        let success = false;
        let response: RugCheckResponse | GenericResponse = {
            status: "error",
            message: "Unknown error",
        } as GenericResponse;
        console.log("tokenAddress", tokenAddress);
        while (attempts < maxRetries && !success) {
            response = await axios.get(`https://api.rugcheck.xyz/v1/tokens/${tokenAddress}/report`)
                .then((response) => {
                    success = true;
                    return {
                        status: "success",
                        message: response.data as RugCheck,
                    } as RugCheckResponse;
                })
                .catch((error) => {
                    attempts++;
                    if (attempts >= maxRetries) {
                        return {
                            status: "error",
                            message: error.message,
                        } as GenericResponse;
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

        const content = (response as RugCheckResponse).message;

        const { percentage, amount, insiders } = this.getTopHoldersPercOnSupply(content.topHolders, content.token.supply, content.token.decimals);

        const data = {
            isFreezable: content.token.freezeAuthority ? true : false,
            topHoldersPercentage: percentage,
            topHoldersAmount: parseFloat(amount),
            insiders: insiders,
            lockersOwener: content.lockerOwners,
            knowAccounts: content.knownAccounts,
            ...content
        }

        return JSON.stringify({
            status: "success",
            data,
        });
    }
}
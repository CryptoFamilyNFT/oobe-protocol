import { Agent } from "../../agent/Agents";
import { Pair } from "../../types/dex.interface";
import { RugCheck, Holder } from "../../types/rugCheck.interface";
import { PublicKey } from "@solana/web3.js";
export declare class DexOperation {
    agent: Agent;
    constructor(agent: Agent);
    GetProgramName(tokenAccount: PublicKey): Promise<string | null>;
    private resolveProgramName;
    GetLatestTokensBoosted(): Promise<string>;
    GetTopTokensBoosted(): Promise<string>;
    GetTokenPoolDetails(tokenAddress: string): Promise<string>;
    calculateSupportLevel(poolData: Pair): number;
    calculateResistanceLevel(poolData: Pair): number;
    calculateVolatility(poolData: Pair): number;
    detectWhaleRisk(rugCheck: RugCheck): boolean;
    analyzeRisk(rugCheck: RugCheck): {
        score: number;
        level: string;
    };
    calculateRSI(poolData: Pair): number;
    generateRecommendations(poolData: Pair, rugCheck: Partial<RugCheck>): any;
    getTopHoldersPercOnSupply(holders: Holder[], totalSupply: number, decimals: number): {
        percentage: string;
        amount: string;
        insiders: number;
    };
    GetRugCheckAnalysis(tokenAddress: string): Promise<string>;
}
//# sourceMappingURL=dex.operation.d.ts.map
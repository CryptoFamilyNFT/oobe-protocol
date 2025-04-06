import { Tool } from "langchain/tools";
export declare class MetricsDataToolStudyLogics extends Tool {
    name: string;
    description: string;
    constructor();
    _call(input: string): Promise<string>;
    private calculateSupportLevel;
    private calculateResistanceLevel;
    private calculateVolatility;
    private detectWhaleRisk;
    private analyzeRisk;
    private calculateRSI;
    private generateRecommendations;
}
//# sourceMappingURL=metrics_data.tool.d.ts.map
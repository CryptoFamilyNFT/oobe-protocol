import { StructuredTool } from "langchain/tools";
import { z } from "zod";
export declare class MetricsDataToolStudyLogics extends StructuredTool {
    schema: z.ZodObject<{
        token: z.ZodString;
        analysis: z.ZodString;
        poolDetails: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
        analysis: string;
        poolDetails: string;
    }, {
        token: string;
        analysis: string;
        poolDetails: string;
    }>;
    name: string;
    description: string;
    constructor(schema?: z.ZodObject<{
        token: z.ZodString;
        analysis: z.ZodString;
        poolDetails: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
        analysis: string;
        poolDetails: string;
    }, {
        token: string;
        analysis: string;
        poolDetails: string;
    }>);
    _call(input: z.infer<typeof this.schema>): Promise<string>;
    private calculateSupportLevel;
    private calculateResistanceLevel;
    private calculateVolatility;
    private detectWhaleRisk;
    private analyzeRisk;
    private calculateRSI;
    private generateRecommendations;
}
//# sourceMappingURL=metrics_data.tool.d.ts.map
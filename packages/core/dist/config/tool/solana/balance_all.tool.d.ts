import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class balanceAllTokensOwnedTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        walletAddress: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        walletAddress: string;
    }, {
        walletAddress: string;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        walletAddress: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        walletAddress: string;
    }, {
        walletAddress: string;
    }>);
    private readonly parserSchema;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=balance_all.tool.d.ts.map
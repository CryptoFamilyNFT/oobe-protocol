import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaBalanceOtherTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        walletAddress: z.ZodString;
        tokenAddress: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        walletAddress: string;
        tokenAddress?: string | null | undefined;
    }, {
        walletAddress: string;
        tokenAddress?: string | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        walletAddress: z.ZodString;
        tokenAddress: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        walletAddress: string;
        tokenAddress?: string | null | undefined;
    }, {
        walletAddress: string;
        tokenAddress?: string | null | undefined;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=balance_of.tool.d.ts.map
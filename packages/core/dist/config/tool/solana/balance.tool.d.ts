import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaBalanceTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenAddress: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        tokenAddress?: string | null | undefined;
    }, {
        tokenAddress?: string | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenAddress: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        tokenAddress?: string | null | undefined;
    }, {
        tokenAddress?: string | null | undefined;
    }>);
    private logger;
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=balance.tool.d.ts.map
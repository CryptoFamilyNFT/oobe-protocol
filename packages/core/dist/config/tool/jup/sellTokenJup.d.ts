import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class JupiterSellTokenTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slippage: number;
        tokenMint: string;
        amount: number;
    }, {
        slippage: number;
        tokenMint: string;
        amount: number;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slippage: number;
        tokenMint: string;
        amount: number;
    }, {
        slippage: number;
        tokenMint: string;
        amount: number;
    }>);
    private isValidBase58;
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=sellTokenJup.d.ts.map
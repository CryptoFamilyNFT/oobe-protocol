import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class JupiterBuyTokenTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodNumber>>>;
        balanceSol: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        tokenMint: string;
        amount: number;
        slippage?: number | null | undefined;
        balanceSol?: number | null | undefined;
    }, {
        tokenMint: string;
        amount: number;
        slippage?: number | null | undefined;
        balanceSol?: number | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodNumber>>>;
        balanceSol: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        tokenMint: string;
        amount: number;
        slippage?: number | null | undefined;
        balanceSol?: number | null | undefined;
    }, {
        tokenMint: string;
        amount: number;
        slippage?: number | null | undefined;
        balanceSol?: number | null | undefined;
    }>);
    private isValidBase58;
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=buyTokenJup.d.ts.map
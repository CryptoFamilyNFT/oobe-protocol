import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class RaydiumBuyTokenTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNumber;
        balanceSol: z.ZodNumber;
        balanceMint: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slippage: number;
        tokenMint: string;
        amount: number;
        balanceSol: number;
        balanceMint: number;
    }, {
        slippage: number;
        tokenMint: string;
        amount: number;
        balanceSol: number;
        balanceMint: number;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenMint: z.ZodString;
        amount: z.ZodNumber;
        slippage: z.ZodNumber;
        balanceSol: z.ZodNumber;
        balanceMint: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        slippage: number;
        tokenMint: string;
        amount: number;
        balanceSol: number;
        balanceMint: number;
    }, {
        slippage: number;
        tokenMint: string;
        amount: number;
        balanceSol: number;
        balanceMint: number;
    }>);
    private isValidBase58;
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=buyTokenRay.d.ts.map
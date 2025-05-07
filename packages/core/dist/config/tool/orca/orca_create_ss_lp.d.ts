import { Decimal } from "decimal.js";
import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class orcaCreateSsLp extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        depositTokenAmount: z.ZodNumber;
        depositTokenMint: z.ZodString;
        otherTokenMint: z.ZodString;
        initialPrice: z.ZodType<Decimal, z.ZodTypeDef, Decimal>;
        maxPrice: z.ZodType<Decimal, z.ZodTypeDef, Decimal>;
        feeTierBps: z.ZodEnum<[string, ...string[]]>;
    }, "strip", z.ZodTypeAny, {
        initialPrice: Decimal;
        depositTokenAmount: number;
        depositTokenMint: string;
        otherTokenMint: string;
        maxPrice: Decimal;
        feeTierBps: string;
    }, {
        initialPrice: Decimal;
        depositTokenAmount: number;
        depositTokenMint: string;
        otherTokenMint: string;
        maxPrice: Decimal;
        feeTierBps: string;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        depositTokenAmount: z.ZodNumber;
        depositTokenMint: z.ZodString;
        otherTokenMint: z.ZodString;
        initialPrice: z.ZodType<Decimal, z.ZodTypeDef, Decimal>;
        maxPrice: z.ZodType<Decimal, z.ZodTypeDef, Decimal>;
        feeTierBps: z.ZodEnum<[string, ...string[]]>;
    }, "strip", z.ZodTypeAny, {
        initialPrice: Decimal;
        depositTokenAmount: number;
        depositTokenMint: string;
        otherTokenMint: string;
        maxPrice: Decimal;
        feeTierBps: string;
    }, {
        initialPrice: Decimal;
        depositTokenAmount: number;
        depositTokenMint: string;
        otherTokenMint: string;
        maxPrice: Decimal;
        feeTierBps: string;
    }>);
    protected _call(arg: any): Promise<string>;
}
//# sourceMappingURL=orca_create_ss_lp.d.ts.map
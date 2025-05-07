import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaTransferTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        to: z.ZodString;
        amount: z.ZodNumber;
        mint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        to: string;
        mint?: string | null | undefined;
    }, {
        amount: number;
        to: string;
        mint?: string | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        to: z.ZodString;
        amount: z.ZodNumber;
        mint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        amount: number;
        to: string;
        mint?: string | null | undefined;
    }, {
        amount: number;
        to: string;
        mint?: string | null | undefined;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=transfer.tool.d.ts.map
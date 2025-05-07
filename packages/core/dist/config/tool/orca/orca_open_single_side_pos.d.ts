import { Agent } from "../../../agent/Agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
export declare class orcaOpenSingleSidePositionTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        whirlpoolAddress: z.ZodString;
        inputTokenMint: z.ZodString;
        inputAmount: z.ZodNumber;
        distanceFromCurrentPriceBps: z.ZodNumber;
        widthBps: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        whirlpoolAddress: string;
        inputTokenMint: string;
        inputAmount: number;
        distanceFromCurrentPriceBps: number;
        widthBps: number;
    }, {
        whirlpoolAddress: string;
        inputTokenMint: string;
        inputAmount: number;
        distanceFromCurrentPriceBps: number;
        widthBps: number;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        whirlpoolAddress: z.ZodString;
        inputTokenMint: z.ZodString;
        inputAmount: z.ZodNumber;
        distanceFromCurrentPriceBps: z.ZodNumber;
        widthBps: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        whirlpoolAddress: string;
        inputTokenMint: string;
        inputAmount: number;
        distanceFromCurrentPriceBps: number;
        widthBps: number;
    }, {
        whirlpoolAddress: string;
        inputTokenMint: string;
        inputAmount: number;
        distanceFromCurrentPriceBps: number;
        widthBps: number;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=orca_open_single_side_pos.d.ts.map
import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class PerpOpenTradeTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        collateralAmount: z.ZodNumber;
        collateralMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        tradeMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        leverage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        price: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        slippage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        side: z.ZodEffects<z.ZodString, "long" | "short", string>;
    }, "strip", z.ZodTypeAny, {
        side: "long" | "short";
        collateralAmount: number;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
        collateralMint?: string | null | undefined;
        leverage?: number | null | undefined;
        slippage?: number | null | undefined;
    }, {
        side: string;
        collateralAmount: number;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
        collateralMint?: string | null | undefined;
        leverage?: number | null | undefined;
        slippage?: number | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        collateralAmount: z.ZodNumber;
        collateralMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        tradeMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        leverage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        price: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        slippage: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        side: z.ZodEffects<z.ZodString, "long" | "short", string>;
    }, "strip", z.ZodTypeAny, {
        side: "long" | "short";
        collateralAmount: number;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
        collateralMint?: string | null | undefined;
        leverage?: number | null | undefined;
        slippage?: number | null | undefined;
    }, {
        side: string;
        collateralAmount: number;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
        collateralMint?: string | null | undefined;
        leverage?: number | null | undefined;
        slippage?: number | null | undefined;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=open_perp.tool.d.ts.map
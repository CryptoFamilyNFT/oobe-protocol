import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaPumpfunTokenLaunchTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenName: z.ZodString;
        tokenTicker: z.ZodString;
        description: z.ZodString;
        imageUrl: z.ZodString;
        twitter: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        telegram: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        website: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        initialLiquiditySOL: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        imageUrl: string;
        description: string;
        tokenName: string;
        tokenTicker: string;
        twitter?: string | null | undefined;
        telegram?: string | null | undefined;
        website?: string | null | undefined;
        initialLiquiditySOL?: number | null | undefined;
    }, {
        imageUrl: string;
        description: string;
        tokenName: string;
        tokenTicker: string;
        twitter?: string | null | undefined;
        telegram?: string | null | undefined;
        website?: string | null | undefined;
        initialLiquiditySOL?: number | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenName: z.ZodString;
        tokenTicker: z.ZodString;
        description: z.ZodString;
        imageUrl: z.ZodString;
        twitter: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        telegram: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        website: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        initialLiquiditySOL: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    }, "strip", z.ZodTypeAny, {
        imageUrl: string;
        description: string;
        tokenName: string;
        tokenTicker: string;
        twitter?: string | null | undefined;
        telegram?: string | null | undefined;
        website?: string | null | undefined;
        initialLiquiditySOL?: number | null | undefined;
    }, {
        imageUrl: string;
        description: string;
        tokenName: string;
        tokenTicker: string;
        twitter?: string | null | undefined;
        telegram?: string | null | undefined;
        website?: string | null | undefined;
        initialLiquiditySOL?: number | null | undefined;
    }>);
    private validateInput;
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=createTokenPF.d.ts.map
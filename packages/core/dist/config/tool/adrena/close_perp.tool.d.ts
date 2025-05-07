import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class PerpCloseTradeTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tradeMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        price: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        side: z.ZodEffects<z.ZodString, "long" | "short", string>;
    }, "strip", z.ZodTypeAny, {
        side: "long" | "short";
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
    }, {
        side: string;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tradeMint: z.ZodNullable<z.ZodOptional<z.ZodString>>;
        price: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
        side: z.ZodEffects<z.ZodString, "long" | "short", string>;
    }, "strip", z.ZodTypeAny, {
        side: "long" | "short";
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
    }, {
        side: string;
        tradeMint?: string | null | undefined;
        price?: number | null | undefined;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=close_perp.tool.d.ts.map
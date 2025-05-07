import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class CheckTokensRugTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        tokenAddress: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        tokenAddress: string | string[];
    }, {
        tokenAddress: string | string[];
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        tokenAddress: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    }, "strip", z.ZodTypeAny, {
        tokenAddress: string | string[];
    }, {
        tokenAddress: string | string[];
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=check_tokens.tool.d.ts.map
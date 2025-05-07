import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaIQImageTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        imageUrl: string;
    }, {
        imageUrl: string;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        imageUrl: string;
    }, {
        imageUrl: string;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=IQimageInscription.tool.d.ts.map
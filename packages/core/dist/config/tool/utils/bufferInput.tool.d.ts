import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class BufferInputTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        input: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        input: string;
    }, {
        input: string;
    }>;
    name: string;
    description: string;
    examples: {
        input: string;
        output: string;
    }[];
    constructor(agent: Agent, schema?: z.ZodObject<{
        input: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        input: string;
    }, {
        input: string;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=bufferInput.tool.d.ts.map
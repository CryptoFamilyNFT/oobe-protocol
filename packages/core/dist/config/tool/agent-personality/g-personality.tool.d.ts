import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class GetPersonalityTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=g-personality.tool.d.ts.map
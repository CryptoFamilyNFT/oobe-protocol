import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class AgentAwarenessTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    name: string;
    description: string;
    private logger;
    constructor(agent: Agent, schema?: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=singularity.tool.d.ts.map
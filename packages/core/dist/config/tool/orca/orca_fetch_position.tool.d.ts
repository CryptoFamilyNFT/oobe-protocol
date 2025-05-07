import { Agent } from "../../../agent/Agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
export declare class orcaFetchPositionTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_fetch_position.tool.d.ts.map
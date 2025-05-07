import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class RaydiumGetTokensTool extends StructuredTool {
    private agent;
    name: string;
    description: string;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    constructor(agent: Agent);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=getTokensRay.d.ts.map
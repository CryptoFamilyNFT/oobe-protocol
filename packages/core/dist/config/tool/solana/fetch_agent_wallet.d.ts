import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class FetchAgentKeypair extends StructuredTool {
    private agent;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=fetch_agent_wallet.d.ts.map
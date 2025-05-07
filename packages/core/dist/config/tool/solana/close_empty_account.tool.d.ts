import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaCloseEmptyTokenAccounts extends StructuredTool {
    private agent;
    schema: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    name: string;
    description: string;
    private logger;
    constructor(agent: Agent, schema?: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=close_empty_account.tool.d.ts.map
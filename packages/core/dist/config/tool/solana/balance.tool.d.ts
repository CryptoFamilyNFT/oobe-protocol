import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaBalanceTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    private logger;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=balance.tool.d.ts.map
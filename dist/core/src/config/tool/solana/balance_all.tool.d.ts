import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class balanceAllTokensOwnedTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=balance_all.tool.d.ts.map
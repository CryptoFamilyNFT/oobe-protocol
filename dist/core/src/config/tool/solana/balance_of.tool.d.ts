import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaBalanceOtherTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=balance_of.tool.d.ts.map
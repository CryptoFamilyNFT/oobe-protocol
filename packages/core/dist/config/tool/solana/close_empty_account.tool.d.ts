import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaCloseEmptyTokenAccounts extends Tool {
    private agent;
    name: string;
    description: string;
    private logger;
    constructor(agent: Agent);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=close_empty_account.tool.d.ts.map
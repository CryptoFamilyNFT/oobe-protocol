import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
export declare class FetchAgentKeypair extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=fetch_agent_wallet.d.ts.map
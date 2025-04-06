import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class JupiterBuyTokenTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    private isValidBase58;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=buyTokenJup.d.ts.map
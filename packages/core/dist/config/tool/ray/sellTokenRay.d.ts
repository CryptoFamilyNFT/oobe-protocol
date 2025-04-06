import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class RaydiumSellTokenTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    private isValidBase58;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=sellTokenRay.d.ts.map
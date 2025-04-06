import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class RaydiumGetTokensTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(): Promise<string>;
}
//# sourceMappingURL=getTokensRay.d.ts.map
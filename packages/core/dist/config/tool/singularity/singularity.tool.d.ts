import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class AgentAwarenessTool extends Tool {
    private agent;
    name: string;
    description: string;
    private logger;
    constructor(agent: Agent);
    private sanitizeBlockchainString;
    private analyzeActions;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=singularity.tool.d.ts.map
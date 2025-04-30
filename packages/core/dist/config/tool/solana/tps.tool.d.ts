import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaTPSCalculatorTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    _call(_input: string): Promise<string>;
}
//# sourceMappingURL=tps.tool.d.ts.map
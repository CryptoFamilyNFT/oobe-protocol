import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
export declare class orcaClosePositionTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_pos_close.tool.d.ts.map
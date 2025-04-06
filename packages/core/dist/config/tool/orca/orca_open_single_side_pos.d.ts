import { Agent } from "../../../agent/Agents";
import { Tool } from "langchain/tools";
export declare class orcaOpenSingleSidePositionTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_open_single_side_pos.d.ts.map
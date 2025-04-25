import { Agent } from "../../../agent/Agents";
import { Tool } from "langchain/tools";
export declare class orcaFetchPositionTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_fetch_position.tool.d.ts.map
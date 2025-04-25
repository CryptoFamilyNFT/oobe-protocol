import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
export declare class PerpCloseTradeTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=close_perp.tool.d.ts.map
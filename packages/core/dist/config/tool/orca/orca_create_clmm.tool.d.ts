import { Agent } from "../../../agent/Agents";
import { Tool } from "langchain/tools";
export declare class orcaCreateClmm extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_create_clmm.tool.d.ts.map
import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
export declare class orcaCreateSsLp extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(arg: any): Promise<string>;
}
//# sourceMappingURL=orca_create_ss_lp.d.ts.map
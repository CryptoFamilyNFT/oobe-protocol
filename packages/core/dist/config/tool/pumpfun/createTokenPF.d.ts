import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaPumpfunTokenLaunchTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    private validateInput;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=createTokenPF.d.ts.map
import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
export declare class CheckTokensRugTool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=check_tokens.tool.d.ts.map
import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class SolanaCreateImageTool extends Tool {
    private solanaKit;
    name: string;
    description: string;
    constructor(solanaKit: Agent);
    private validateInput;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=createImage.tool.d.ts.map
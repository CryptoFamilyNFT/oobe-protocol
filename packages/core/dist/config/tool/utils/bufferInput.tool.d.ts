import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
export declare class BufferInputTool extends Tool {
    private agent;
    name: string;
    description: string;
    examples: {
        input: string;
        output: string;
    }[];
    constructor(agent: Agent);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=bufferInput.tool.d.ts.map
import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";

export class BufferInputTool extends Tool {
    name = "buffer_input";
    description = "This tool is used to buffer input data. It is not intended for direct use.";
    examples = [
        {
            input: "Buffer this input data",
            output: "Buffered data: BufferInputTool",
        },
    ];

    constructor(private agent: Agent) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        // Validate input
        if (typeof input !== "string") {
            throw new Error("Input must be a string");
        }
        // Buffer the input data
        input = input.trim();
        const parsedInput = JSON.parse(input);
        // Perform buffering operation

       const bufferedData = Buffer.from(parsedInput).toString('base64');

        return JSON.stringify({
            status: "success",
            bufferedData,
            message: "String data buffered successfully",
        });
    }
}
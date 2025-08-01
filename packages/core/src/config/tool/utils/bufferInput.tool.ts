import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";

export class BufferInputTool extends StructuredTool {
    name = "buffer_input";
    description = "This tool is used to buffer input data. It is not intended for direct use.";
    examples = [
        {
            input: "Buffer this input data",
            output: "Buffered data: BufferInputTool",
        },
    ];

    constructor(private agent: Agent, override schema = z.object({
        input: z.string().describe("Input data to be buffered"),
    })) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        // Validate input
        if (typeof input !== "string") {
            throw new Error("Input must be a string");
        }
        // Buffer the input data
        input = input;
        const parsedInput = this.schema.parse(input);
        // Perform buffering operation

       const bufferedData = Buffer.from(parsedInput.input).toString('base64');

        return JSON.stringify({
            status: "success",
            bufferedData,
            message: "String data buffered successfully",
        });
    }
}
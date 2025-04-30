"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferInputTool = void 0;
const tools_1 = require("@langchain/core/tools");
class BufferInputTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "buffer_input";
        this.description = "This tool is used to buffer input data. It is not intended for direct use.";
        this.examples = [
            {
                input: "Buffer this input data",
                output: "Buffered data: BufferInputTool",
            },
        ];
    }
    async _call(input) {
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
exports.BufferInputTool = BufferInputTool;
//# sourceMappingURL=bufferInput.tool.js.map
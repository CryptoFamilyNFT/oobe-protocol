"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const iq_operation_1 = require("../../operations/iq/iq.operation");
const codeInTextIQAction = {
    name: "TEXT_CODE_IN_IQ",
    similes: [
        "write text using IQ protocol",
        "store message with IQ",
        "inscribe text message to IQ",
        "convert message to IQ storage",
        "use IQ to store a text message",
        "IQ text inscription",
        "save text in IQ6900",
        "process text with IQ",
        "send text to IQ system"
    ],
    description: "create a text using the IQ6900 protocol for text [not image]",
    examples: [
        [
            {
                input: {
                    message: "Much Luv to IQ from Bobby Hill Agent",
                },
                output: {
                    status: "success",
                    signature: "2ZE7Rz...",
                    message: "Successfully executed IQ protocol on text",
                },
                explanation: "Create and store a text using the IQ protocol, optimized for data storage",
            },
        ],
    ],
    schema: zod_1.z.object({
        text: zod_1.z.string().describe("text to be processed"),
    }),
    handler: async (agent, input) => {
        const iq = new iq_operation_1.IQOperation();
        try {
            console.log("[oobe-protocol] - IQ -  Inscribing text: ", input.message);
            const result = await iq.AstralChef(input.message, 10, 0.5, agent, "text");
            return {
                status: "success",
                signature: result,
                message: "Successfully executed IQ protocol on image",
            };
        }
        catch (error) {
            return {
                status: "error",
                message: "Failed to execute IQ protocol on image",
                error: error.message,
            };
        }
    },
};
exports.default = codeInTextIQAction;
//# sourceMappingURL=iq_text.action.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const iq_operation_1 = require("../../operations/iq/iq.operation");
const codeInIQAction = {
    name: "IMAGE_IQ",
    similes: [
        "convert image to ASCII using IQ6900",
        "inscribe image in IQ storage",
        "process image with IQ6900",
        "transform image to ASCII via IQ",
        "store image using IQ",
        "IQ image inscription",
        "use IQ protocol for ASCII image",
        "convert image to IQ text format"
    ],
    description: "Inscribe an image with ASCII Art Generator (IQ6900) characters using the IQ6900 protocol optimization for data storage, image has to be 500x500 max",
    examples: [
        [
            {
                input: {
                    imageUrl: "https://example.com/image.png",
                },
                output: {
                    status: "success",
                    signature: "2ZE7Rz...",
                    DBPDA: "7nxQB...",
                    message: "Successfully executed IQ protocol on image",
                },
                explanation: "Create and store an ASCII representation of an image using the IQ protocol, optimized for data storage. Use a font size of 10 and a density of 0.5. use iq_code_in_inscription",
            },
        ],
    ],
    schema: zod_1.z.object({
        imageUrl: zod_1.z.string().url().describe("URL of the image to be processed"),
    }),
    handler: async (agent, input) => {
        const iq = new iq_operation_1.IQOperation();
        try {
            const result = await iq.AstralChef(input.imageUrl, 10, 0.5, agent, "image");
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
exports.default = codeInIQAction;
//# sourceMappingURL=iq.action.js.map
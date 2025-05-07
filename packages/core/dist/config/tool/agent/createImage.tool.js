"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCreateImageTool = void 0;
const tools_1 = require("@langchain/core/tools");
const createImage_1 = require("./createImage");
const zod_1 = require("zod");
class SolanaCreateImageTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        prompt: zod_1.z
            .string()
            .min(1)
            .max(1000)
            .describe("The text description of the image to generate"),
        model: zod_1.z
            .enum(["dall-e-3"])
            .default("dall-e-3")
            .describe("The AI model to use for generation")
            .optional()
            .nullable(),
        size: zod_1.z
            .enum(["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"])
            .default("1024x1024")
            .describe("The size of the generated image")
            .optional()
            .nullable(),
        quality: zod_1.z
            .enum(["standard", "hd"])
            .default("standard")
            .describe("The quality level of the generated image")
            .optional()
            .nullable(),
        style: zod_1.z
            .enum(["natural", "vivid"])
            .default("natural")
            .describe("The style of the generated image")
            .optional()
            .nullable(),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "solana_create_image";
        this.description = "Create an image using OpenAI's DALL-E. Input should be a string prompt for the image.";
    }
    validateInput(input) {
        if (typeof input.prompt !== "string" || input.prompt.trim().length === 0) {
            throw new Error("Input must be a non-empty string prompt");
        }
    }
    async _call(input) {
        console.log("\x1b[35m%s\x1b[0m", "-Input received in CREATE_IMAGE tool:", input);
        let parsedInput = this.schema.parse(input);
        try {
            const result = await (0, createImage_1.create_image)(this.agent, parsedInput.prompt.trim());
            return JSON.stringify({
                status: "success",
                message: "Image created successfully",
                ...result,
            });
        }
        catch (error) {
            console.error("Error creating image:", error);
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.SolanaCreateImageTool = SolanaCreateImageTool;
//# sourceMappingURL=createImage.tool.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCreateImageTool = void 0;
const tools_1 = require("@langchain/core/tools");
const createImage_1 = require("./createImage");
class SolanaCreateImageTool extends tools_1.Tool {
    constructor(solanaKit) {
        super();
        this.solanaKit = solanaKit;
        this.name = "solana_create_image";
        this.description = "Create an image using OpenAI's DALL-E. Input should be a string prompt for the image.";
    }
    validateInput(input) {
        if (typeof input !== "string" || input.trim().length === 0) {
            throw new Error("Input must be a non-empty string prompt");
        }
    }
    async _call(input) {
        try {
            this.validateInput(input);
            const result = await (0, createImage_1.create_image)(this.solanaKit, input.trim());
            return JSON.stringify({
                status: "success",
                message: "Image created successfully",
                ...result,
            });
        }
        catch (error) {
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
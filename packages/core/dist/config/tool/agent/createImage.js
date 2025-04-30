"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_image = create_image;
const openai_1 = __importDefault(require("openai"));
const logger_1 = __importDefault(require("../../../utils/logger/logger"));
/**
 * Generate an image using OpenAI's DALL-E
 * @param agent SolanaAgentKit instance
 * @param prompt Text description of the image to generate
 * @param size Image size ('256x256', '512x512', or '1024x1024') (default: '1024x1024')
 * @param n Number of images to generate (default: 1)
 * @returns Object containing the generated image URLs
 */
async function create_image(agent, prompt, size = "1024x1024", n = 1) {
    const logger = new logger_1.default();
    try {
        if (!await agent.getOpenK()) {
            throw new Error("OpenAI API key not found in agent configuration");
        }
        const openai = new openai_1.default({
            apiKey: await agent.getOpenK(),
        });
        const response = await openai.images.generate({
            prompt,
            n,
            size,
        });
        return {
            images: response.data?.map((img) => img.url),
        };
    }
    catch (error) {
        logger.error(`Image generation failed: ${error.message}`);
        throw new Error(`Image generation failed: ${error.message}`);
    }
}
//# sourceMappingURL=createImage.js.map
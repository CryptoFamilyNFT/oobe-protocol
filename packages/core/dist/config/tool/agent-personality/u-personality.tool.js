"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsePersonalityTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class UsePersonalityTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        SpriteProfile: zod_1.z.object({
            name: zod_1.z.string(),
            tone: zod_1.z.string(),
            description: zod_1.z.string(),
            traits: zod_1.z.array(zod_1.z.object({
                trait: zod_1.z.string(),
                value: zod_1.z.number().min(0).max(100)
            })),
        })
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "S-A-USE_PERSONALITY_TOOL";
        this.description = "Get onchain personalities profile and everything related to fetch personalities onchain.";
    }
    async _call(input) {
        try {
            const result = JSON.stringify({
                status: "success",
                personality: `My personality is now ${input.SpriteProfile.name}`,
                ...input.SpriteProfile
            });
            return result;
        }
        catch (error) {
            const errorResponse = JSON.stringify({
                status: "error",
                message: error.message || error,
            });
            return errorResponse;
        }
    }
}
exports.UsePersonalityTool = UsePersonalityTool;
//# sourceMappingURL=u-personality.tool.js.map
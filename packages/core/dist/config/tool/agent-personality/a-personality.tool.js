"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class PersonalityTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        action: zod_1.z.enum(["create", "trade", "convert", "evolve", "delete"]),
        personalityName: zod_1.z.string().describe("The name of the personality."),
        tone: zod_1.z.string().describe("The tone of the personality."),
        stylePrompt: zod_1.z.string().describe("A prompt to define the style of the personality."),
        events: zod_1.z.array(zod_1.z.object({
            type: zod_1.z.string(),
            data: zod_1.z.any(),
        })).optional().nullable().describe("Events to be associated with the personality. (optional)"),
        customLogic: zod_1.z.function().args(zod_1.z.any()).returns(zod_1.z.promise(zod_1.z.any())).optional().nullable().describe("Custom logic to be associated with the personality. (optional)"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "S-A-CREATE_PERSONALITY_TOOL";
        this.description = "Manage and evolve the personality of the agent.";
    }
    async _call(input) {
        try {
            const { action, personalityName, tone, stylePrompt, events, customLogic } = this.schema.parse(input);
            const personalityProfile = await this.agent.getCurrentProfileAgent(personalityName, tone, stylePrompt, "🔮");
            const data_merkle = this.agent.merkleValidate(personalityProfile, "personality");
            await this.agent.merkle.onChainMerklePersonalityInscription(data_merkle);
            this.agent.setPersonality(personalityProfile);
            return JSON.stringify({
                status: "success",
                message: `Personality ${action} successfully, from now on you are ${personalityName} with tone ${tone}`,
                data: {
                    personality: personalityProfile,
                    events: events,
                    customLogic: customLogic,
                    data_merkle: data_merkle,
                }
            });
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
            });
        }
    }
}
exports.PersonalityTool = PersonalityTool;
//# sourceMappingURL=a-personality.tool.js.map
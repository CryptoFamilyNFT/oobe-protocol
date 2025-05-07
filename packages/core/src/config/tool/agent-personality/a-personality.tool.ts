import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";


export class PersonalityTool extends StructuredTool {
  name = "S-A-CREATE_PERSONALITY_TOOL";
  description = "Manage and evolve the personality of the agent.";

  constructor(private agent: Agent, override schema = z.object({
    action: z.enum(["create", "trade", "convert", "evolve", "delete"]),
    personalityName: z.string().describe("The name of the personality."),
    tone: z.string().describe("The tone of the personality."),
    stylePrompt: z.string().describe("A prompt to define the style of the personality."),
    events: z.array(z.object({
      type: z.string(),
      data: z.any(),
    })).optional().nullable().describe("Events to be associated with the personality. (optional)"),
    customLogic: z.function().args(z.any()).returns(z.promise(z.any())).optional().nullable().describe("Custom logic to be associated with the personality. (optional)"),
  })) {
    super();
  }

  protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
    try {
      const { action, personalityName, tone, stylePrompt, events, customLogic } = this.schema.parse(input);
      const personalityProfile = await this.agent.getCurrentProfileAgent(personalityName, tone, stylePrompt, "🔮");


      const data_merkle = this.agent.merkleValidate(personalityProfile, "personality" as unknown as Record<string, any>);

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
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
      });
    }
  }
}
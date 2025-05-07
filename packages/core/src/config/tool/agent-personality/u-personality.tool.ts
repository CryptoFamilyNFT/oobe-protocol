import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
import { ZeroCombineFetcher } from "../../ZeroCombineFetcher";
import { IConfiguration } from "../../types/config.types";
import { Personality, ZeroFormatRecord } from "../../../utils/oobe/ZeroFormatRecord";
import { SolanaRpcClient } from "../../../utils/SmartRoundRobinRPC";


export class UsePersonalityTool extends StructuredTool {
    name = "S-A-USE_PERSONALITY_TOOL";
    description = "Get onchain personalities profile and everything related to fetch personalities onchain.";

    constructor(private agent: Agent, override schema = z.object({
        SpriteProfile: z.object({
            name: z.string(),
            tone: z.string(),
            description: z.string(),
            traits: z.array(z.object({
                trait: z.string(),
                value: z.number().min(0).max(100)
            })),
        })
    })) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        try {
            const result = JSON.stringify({
                status: "success",
                personality: `My personality is now ${input.SpriteProfile.name}`,
                ...input.SpriteProfile
            })
            return result;
        } catch (error: any) {

            const errorResponse = JSON.stringify({
                status: "error",
                message: error.message || error,
            });

            return errorResponse;
        }
    }
}
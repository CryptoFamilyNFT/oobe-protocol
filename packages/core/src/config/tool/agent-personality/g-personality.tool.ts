import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
import { ZeroCombineFetcher } from "../../ZeroCombineFetcher";
import { IConfiguration } from "../../types/config.types";
import { Personality, ZeroFormatRecord } from "../../../utils/oobe/ZeroFormatRecord";
import { SolanaRpcClient } from "../../../utils/SmartRoundRobinRPC";


export class GetPersonalityTool extends StructuredTool {
    name = "S-A-GET_PERSONALITY_TOOL";
    description = "Get onchain personalities profile and everything related to fetch personalities onchain.";

    constructor(private agent: Agent, override schema = z.object({})) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        console.log("[GetPersonalityTool] _call invoked with input:", input);
        const rpcsTransport = new SolanaRpcClient().getRpcTransports();

        try {
            console.log("[GetPersonalityTool] Initializing ZeroCombineFetcher...");
            const fetcher = new ZeroCombineFetcher(
                this.agent.wallet.publicKey,
                this.agent.connection,
                rpcsTransport ? { transportsRPC: rpcsTransport } as IConfiguration : { transportsRPC: [''] } as IConfiguration
            );

            console.log("[GetPersonalityTool] Executing fetcher to get onchain personalities...");
            const onchain_personalities = await fetcher.executePersonality();
            console.log("[GetPersonalityTool] Fetcher executed successfully. Data:", onchain_personalities);

            const personalityProfile = onchain_personalities.finalTransactions.personalities;

            if (!personalityProfile) {
                console.error("[GetPersonalityTool] No personality profile found.");
                throw new Error("No personality profile found.");
            }

            console.log("[GetPersonalityTool] Parsing personality profile...");
            const parsedProfilePersonality = await new ZeroFormatRecord().analyzeActions(personalityProfile, "PERSONALITY") as Personality;
            console.log("[GetPersonalityTool] Parsed personality profile:", parsedProfilePersonality.profile);

            const result = JSON.stringify({
                status: "success",
                message: `Personalities fetched successfully`,
                data: {
                    personality: parsedProfilePersonality,
                }
            });

            console.log("[GetPersonalityTool] Returning success response:", result);
            return result;
        } catch (error: any) {
            console.error("[GetPersonalityTool] Error occurred:", error);

            const errorResponse = JSON.stringify({
                status: "error",
                message: error.message || error,
            });

            console.log("[GetPersonalityTool] Returning error response:", errorResponse);
            return errorResponse;
        }
    }
}
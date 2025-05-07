"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPersonalityTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
const ZeroCombineFetcher_1 = require("../../ZeroCombineFetcher");
const ZeroFormatRecord_1 = require("../../../utils/oobe/ZeroFormatRecord");
const SmartRoundRobinRPC_1 = require("../../../utils/SmartRoundRobinRPC");
class GetPersonalityTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({})) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "S-A-GET_PERSONALITY_TOOL";
        this.description = "Get onchain personalities profile and everything related to fetch personalities onchain.";
    }
    async _call(input) {
        console.log("[GetPersonalityTool] _call invoked with input:", input);
        const rpcsTransport = new SmartRoundRobinRPC_1.SolanaRpcClient().getRpcTransports();
        try {
            console.log("[GetPersonalityTool] Initializing ZeroCombineFetcher...");
            const fetcher = new ZeroCombineFetcher_1.ZeroCombineFetcher(this.agent.wallet.publicKey, this.agent.connection, rpcsTransport ? { transportsRPC: rpcsTransport } : { transportsRPC: [''] });
            console.log("[GetPersonalityTool] Executing fetcher to get onchain personalities...");
            const onchain_personalities = await fetcher.executePersonality();
            console.log("[GetPersonalityTool] Fetcher executed successfully. Data:", onchain_personalities);
            const personalityProfile = onchain_personalities.finalTransactions.personalities;
            if (!personalityProfile) {
                console.error("[GetPersonalityTool] No personality profile found.");
                throw new Error("No personality profile found.");
            }
            console.log("[GetPersonalityTool] Parsing personality profile...");
            const parsedProfilePersonality = await new ZeroFormatRecord_1.ZeroFormatRecord().analyzeActions(personalityProfile, "PERSONALITY");
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
        }
        catch (error) {
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
exports.GetPersonalityTool = GetPersonalityTool;
//# sourceMappingURL=g-personality.tool.js.map
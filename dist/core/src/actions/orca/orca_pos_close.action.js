"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orca_pos_close_tool_1 = require("../../config/tool/orca/orca_pos_close.tool");
const closeOrcaPositionAction = {
    name: "CLOSE_ORCA_POSITION_ACTION",
    similes: [
        "close orca liquidity position",
        "close orca whirlpool position",
        "close orca liquidity pool",
        "close my orca liquidity position",
        "close my orca whirlpool position",
        "close my orca liquidity pool",
        "close orca position",
        "close orca pool",
        "close orca liquidity",
    ],
    description: "Close an existing liquidity position in an Orca Whirlpool. This functions fetches the position details using the provided mint address and closes the position with a 1% slippage",
    examples: [
        [
            {
                input: {
                    positionMintAddress: "EPjasdf...",
                },
                output: {
                    status: "success",
                    signature: "12Erx...",
                    message: "Successfully closed Orca whirlpool position",
                },
                explanation: "Close a USDC/SOL whirlpool position",
            },
        ],
    ],
    schema: zod_1.z.object({
        positionMintAddress: zod_1.z.string().describe("The mint address of the liquidity position to close"),
    }),
    handler: async (agent, input) => {
        try {
            const signature = new orca_pos_close_tool_1.orcaClosePositionTool(agent).invoke(JSON.stringify({
                positionMintAddress: input.positionMintAddress,
            }));
            return {
                status: "success",
                signature,
                message: "Successfully closed Orca whirlpool position",
            };
        }
        catch (e) {
            return {
                status: "error",
                message: `Failed to close Orca whirlpool position: ${e.message}`,
            };
        }
    },
};
exports.default = closeOrcaPositionAction;
//# sourceMappingURL=orca_pos_close.action.js.map
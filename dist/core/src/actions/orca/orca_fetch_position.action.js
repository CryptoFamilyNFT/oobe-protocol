"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orca_fetch_position_tool_1 = require("../../config/tool/orca/orca_fetch_position.tool");
const fetchOrcaPositionsAction = {
    name: "FETCH_ORCA_POSITIONS_ACTION",
    description: "Fetch all the liquidity positions in an Orca Whirlpool by owner. Returns an object with position mint addresses as keys and position status details as values.",
    similes: [
        "fetch orca liquidity positions",
        "fetch orca whirlpool positions",
        "fetch orca liquidity pools",
        "fetch my orca liquidity positions",
    ],
    examples: [
        [
            {
                input: {},
                output: {
                    status: "success",
                    message: "Liquidity positions fetched.",
                    positions: {
                        positionMintAddress1: {
                            whirlpoolAddress: "whirlpoolAddress1",
                            positionInRange: true,
                            distanceFromCenterBps: 250,
                        },
                    },
                },
                explanation: "Fetch all Orca whirlpool positions",
            },
        ],
    ],
    schema: zod_1.z.object({}),
    handler: async (agent) => {
        try {
            const positions = JSON.parse(await new orca_fetch_position_tool_1.orcaFetchPositionTool(agent).invoke(""));
            return {
                status: "success",
                message: "Liquidity positions fetched.",
                positions,
            };
        }
        catch (e) {
            return {
                status: "error",
                message: `Failed to fetch Orca whirlpool positions: ${e.message}`,
            };
        }
    },
};
exports.default = fetchOrcaPositionsAction;
//# sourceMappingURL=orca_fetch_position.action.js.map
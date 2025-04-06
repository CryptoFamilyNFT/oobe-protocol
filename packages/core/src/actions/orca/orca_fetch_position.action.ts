import { z } from "zod";
import { Agent } from "../../agent/Agents";
import { Action } from "../../types/action.interface";
import { orcaFetchPositionTool } from "../../config/tool/orca/orca_fetch_position.tool";

const fetchOrcaPositionsAction: Action = {
  name: "FETCH_ORCA_POSITIONS_ACTION",
  description:
    "Fetch all the liquidity positions in an Orca Whirlpool by owner. Returns an object with position mint addresses as keys and position status details as values.",
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
  schema: z.object({}),
  handler: async (agent: Agent) => {
    try {
      const positions = JSON.parse(await new orcaFetchPositionTool(agent).invoke(""));

      return {
        status: "success",
        message: "Liquidity positions fetched.",
        positions,
      };
    } catch (e:any) {
      return {
        status: "error",
        message: `Failed to fetch Orca whirlpool positions: ${e.message}`,
      };
    }
  },
};

export default fetchOrcaPositionsAction;
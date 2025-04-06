import { token } from "@coral-xyz/anchor/dist/cjs/utils";
import { RayOperation } from "../../operations/ray/ray.operation";
import { Action } from "../../types/action.interface";
import { z } from 'zod';
import { sleep } from "@raydium-io/raydium-sdk-v2";

const GetRaydiumTokens: Action = {
    name: "GET_TOKENS_ON_RAYDIUM",
    similes: [

    ],
    description: "Buy a token on Raydium with specified parameters",
    examples: [
        [
            {
                input: {},
                output: {
                    baseToken: "SOL",
                    quoteToken: "USDC",
                },
                explanation: "Check/Fetch new pools on Raydium",
            },
        ],
    ],
    schema: z.object({}),
    handler: async (agent) => {
        try {

            const operation = new RayOperation(agent);
            const data = await operation.getNewPools();
            await sleep(10000);
            return {
                baseToken: data[0]?.baseToken,
                quoteToken: data[0]?.quoteToken,
            };
        } catch(e) {
            console.error("Error in GET_TOKENS_ON_RAYDIUM tool:", e);
            throw new Error("Failed to get tokens on Raydium");
        }
    },
};

export default GetRaydiumTokens;

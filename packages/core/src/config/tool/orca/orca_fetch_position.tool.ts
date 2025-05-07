import { Agent } from "../../../agent/Agents";
import { Wallet } from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import {
    ORCA_WHIRLPOOL_PROGRAM_ID,
    WhirlpoolContext,
    buildWhirlpoolClient,
    getAllPositionAccountsByOwner,
    PriceMath,
} from "@orca-so/whirlpools-sdk";
import { StructuredTool, Tool } from "langchain/tools";
import { z } from "zod";

interface PositionInfo {
    whirlpoolAddress: string;
    positionInRange: boolean;
    distanceFromCenterBps: number;
}

type PositionDataMap = {
    [positionMintAddress: string]: PositionInfo;
};
export class orcaFetchPositionTool extends StructuredTool {

    name = "ORCA_FETCH_POSITION";
    description = `Returns A JSON string with an object mapping position mint addresses to position details:
  {
    "positionMintAddress1": {
      "whirlpoolAddress": "whirlpoolAddress1",
      "positionInRange": true,
      "distanceFromCenterBps": 250
    }
  }
    `;

    constructor(private agent: Agent, override schema = z.object({
    })) {
        super();
    }

    protected async _call(input: string): Promise<string> {
        try {
            const nodeWallet = new NodeWallet(this.agent.wallet);

            const ctx = WhirlpoolContext.from(
                this.agent.connection,
                nodeWallet,
                ORCA_WHIRLPOOL_PROGRAM_ID,
            );
            const client = buildWhirlpoolClient(ctx);

            const positions = await getAllPositionAccountsByOwner({
                ctx,
                owner: this.agent.wallet.publicKey,
            });
            const positionDatas = [
                ...positions.positions.entries(),
                ...positions.positionsWithTokenExtensions.entries(),
            ];
            const result: PositionDataMap = {};
            for (const [, positionData] of positionDatas) {
                const positionMintAddress = positionData.positionMint;
                const whirlpoolAddress = positionData.whirlpool;
                const whirlpool = await client.getPool(whirlpoolAddress);
                const whirlpoolData = whirlpool.getData();
                const sqrtPrice = whirlpoolData.sqrtPrice;
                const currentTick = whirlpoolData.tickCurrentIndex;
                const mintA = whirlpool.getTokenAInfo();
                const mintB = whirlpool.getTokenBInfo();
                const currentPrice = PriceMath.sqrtPriceX64ToPrice(
                    sqrtPrice,
                    mintA.decimals,
                    mintB.decimals,
                );
                const lowerTick = positionData.tickLowerIndex;
                const upperTick = positionData.tickUpperIndex;
                const lowerPrice = PriceMath.tickIndexToPrice(
                    lowerTick,
                    mintA.decimals,
                    mintB.decimals,
                );
                const upperPrice = PriceMath.tickIndexToPrice(
                    upperTick,
                    mintA.decimals,
                    mintB.decimals,
                );
                const centerPosition = lowerPrice.add(upperPrice).div(2);

                const positionInRange =
                    currentTick > lowerTick && currentTick < upperTick ? true : false;
                const distanceFromCenterBps = Math.ceil(
                    currentPrice
                        .sub(centerPosition)
                        .abs()
                        .div(centerPosition)
                        .mul(10000)
                        .toNumber(),
                );

                result[positionMintAddress.toString()] = {
                    whirlpoolAddress: whirlpoolAddress.toString(),
                    positionInRange,
                    distanceFromCenterBps,
                };
            }
            return JSON.stringify(result);
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
          });
        }
    }
}


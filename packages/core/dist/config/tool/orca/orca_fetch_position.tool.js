"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orcaFetchPositionTool = void 0;
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class orcaFetchPositionTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({})) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "ORCA_FETCH_POSITION";
        this.description = `Returns A JSON string with an object mapping position mint addresses to position details:
  {
    "positionMintAddress1": {
      "whirlpoolAddress": "whirlpoolAddress1",
      "positionInRange": true,
      "distanceFromCenterBps": 250
    }
  }
    `;
    }
    async _call(input) {
        try {
            const nodeWallet = new nodewallet_1.default(this.agent.wallet);
            const ctx = whirlpools_sdk_1.WhirlpoolContext.from(this.agent.connection, nodeWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
            const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
            const positions = await (0, whirlpools_sdk_1.getAllPositionAccountsByOwner)({
                ctx,
                owner: this.agent.wallet.publicKey,
            });
            const positionDatas = [
                ...positions.positions.entries(),
                ...positions.positionsWithTokenExtensions.entries(),
            ];
            const result = {};
            for (const [, positionData] of positionDatas) {
                const positionMintAddress = positionData.positionMint;
                const whirlpoolAddress = positionData.whirlpool;
                const whirlpool = await client.getPool(whirlpoolAddress);
                const whirlpoolData = whirlpool.getData();
                const sqrtPrice = whirlpoolData.sqrtPrice;
                const currentTick = whirlpoolData.tickCurrentIndex;
                const mintA = whirlpool.getTokenAInfo();
                const mintB = whirlpool.getTokenBInfo();
                const currentPrice = whirlpools_sdk_1.PriceMath.sqrtPriceX64ToPrice(sqrtPrice, mintA.decimals, mintB.decimals);
                const lowerTick = positionData.tickLowerIndex;
                const upperTick = positionData.tickUpperIndex;
                const lowerPrice = whirlpools_sdk_1.PriceMath.tickIndexToPrice(lowerTick, mintA.decimals, mintB.decimals);
                const upperPrice = whirlpools_sdk_1.PriceMath.tickIndexToPrice(upperTick, mintA.decimals, mintB.decimals);
                const centerPosition = lowerPrice.add(upperPrice).div(2);
                const positionInRange = currentTick > lowerTick && currentTick < upperTick ? true : false;
                const distanceFromCenterBps = Math.ceil(currentPrice
                    .sub(centerPosition)
                    .abs()
                    .div(centerPosition)
                    .mul(10000)
                    .toNumber());
                result[positionMintAddress.toString()] = {
                    whirlpoolAddress: whirlpoolAddress.toString(),
                    positionInRange,
                    distanceFromCenterBps,
                };
            }
            return JSON.stringify(result);
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.orcaFetchPositionTool = orcaFetchPositionTool;
//# sourceMappingURL=orca_fetch_position.tool.js.map
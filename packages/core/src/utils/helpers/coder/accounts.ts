// @ts-nocheck
// @ts-ignore
import * as B from "@native-to-anchor/buffer-layout";
import { AccountsCoder, Idl } from "@coral-xyz/anchor";
import { IdlTypeDef } from "@coral-xyz/anchor/dist/cjs/idl";
import { Structure } from "@raydium-io/raydium-sdk-v2";
import { Account } from "@solana/spl-token";

interface TargetOrders {
  owner: bigint[];
  buyOrders: {
    price: bigint;
    vol: bigint;
  }[];
  padding1: bigint[];
  targetX: bigint;
  targetY: bigint;
  planXBuy: bigint;
  planYBuy: bigint;
  planXSell: bigint;
  planYSell: bigint;
  placedX: bigint;
  placedY: bigint;
  calcPnlX: bigint;
  calcPnlY: bigint;
  padding2: bigint[];
  replaceBuyClientId: bigint[];
  replaceSellClientId: bigint[];
  lastOrderNumerator: bigint;
  lastOrderDenominator: bigint;
  planOrdersCur: bigint;
  placeOrdersCur: bigint;
  validBuyOrderNum: bigint;
  validSellOrderNum: bigint;
  padding3: bigint[];
  freeSlotBits: bigint;
}

interface Fees {
  minSeparateNumerator: bigint;
  minSeparateDenominator: bigint;
  tradeFeeNumerator: bigint;
  tradeFeeDenominator: bigint;
  pnlNumerator: bigint;
  pnlDenominator: bigint;
  swapFeeNumerator: bigint;
  swapFeeDenominator: bigint;
}

interface AmmInfo {
  status: bigint;
  nonce: bigint;
  orderNum: bigint;
  depth: bigint;
  coinDecimals: bigint;
  pcDecimals: bigint;
  state: bigint;
  resetFlag: bigint;
  minSize: bigint;
  volMaxCutRatio: bigint;
  amountWave: bigint;
  coinLotSize: bigint;
  pcLotSize: bigint;
  minPriceMultiplier: bigint;
  maxPriceMultiplier: bigint;
  sysDecimalValue: bigint;
  fees: Fees;
  outPut: {
    needTakePnlCoin: bigint;
    needTakePnlPc: bigint;
    totalPnlPc: bigint;
    totalPnlCoin: bigint;
    poolOpenTime: bigint;
    punishPcAmount: bigint;
    punishCoinAmount: bigint;
    orderbookToInitTime: bigint;
    swapCoinInAmount: bigint;
    swapPcOutAmount: bigint;
    swapTakePcFee: bigint;
    swapPcInAmount: bigint;
    swapCoinOutAmount: bigint;
    swapTakeCoinFee: bigint;
  };
  tokenCoin: Buffer;
  tokenPc: Buffer;
  coinMint: Buffer;
  pcMint: Buffer;
  lpMint: Buffer;
  openOrders: Buffer;
  market: Buffer;
  serumDex: Buffer;
  targetOrders: Buffer;
  withdrawQueue: Buffer;
  tokenTempLp: Buffer;
  ammOwner: Buffer;
  lpAmount: bigint;
  clientOrderId: bigint;
  padding: bigint[];
}

export class RaydiumAmmAccountsCoder<A extends string = string>
  implements AccountsCoder {
  constructor(_idl: Idl) { }

  public async encode<T = any>(accountName: A, account: T): Promise<Buffer> {
    switch (accountName) {
      case "targetOrders": {
        const buffer = Buffer.alloc(2208);
        const len = TARGET_ORDERS_LAYOUT.encode(account as TargetOrders, buffer);
        return buffer.subarray(0, len);
      } case "fees": {
        const buffer = Buffer.alloc(64);
        const len = FEES_LAYOUT.encode(account as Fees, buffer);
        return buffer.subarray(0, len);
      } case "ammInfo": {
        const buffer = Buffer.alloc(752);
        const len = AMM_INFO_LAYOUT.encode(account as AmmInfo, buffer);
        return buffer.subarray(0, len);
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public decode<T = any>(accountName: A, ix: Buffer): T {
    return this.decodeUnchecked(accountName, ix);
  }

  public decodeUnchecked<T = any>(accountName: A, ix: Buffer): T {
    switch (accountName) {
      case "targetOrders": {
        return decodeTargetOrdersAccount(ix);
      } case "fees": {
        return decodeFeesAccount(ix);
      } case "ammInfo": {
        return decodeAmmInfoAccount(ix);
      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public memcmp(
    accountName: A,
    _appendData?: Buffer
  ): { dataSize?: number, offset?: number, bytes?: string } {
    switch (accountName) {
      case "targetOrders": {
        return {
          dataSize: 2208,
        };

      } case "fees": {
        return {
          dataSize: 64,
        };

      } case "ammInfo": {
        return {
          dataSize: 752,
        };

      }
      default: {
        throw new Error(`Invalid account name: ${accountName}`);
      }
    }
  }

  public size(idlAccount: IdlTypeDef): number {
    switch (idlAccount.name) {
      case "targetOrders": {
        return 2208;
      } case "fees": {
        return 64;
      } case "ammInfo": {
        return 752;
      }
      default: {
        throw new Error(`Invalid account name: ${idlAccount.name}`);
      }
    }
  }
}

function decodeTargetOrdersAccount<T = any>(ix: Buffer): T {
  return TARGET_ORDERS_LAYOUT.decode(ix) as T;
}
function decodeFeesAccount<T = any>(ix: Buffer): T {
  return FEES_LAYOUT.decode(ix) as T;
}
function decodeAmmInfoAccount<T = any>(ix: Buffer): T {
  return AMM_INFO_LAYOUT.decode(ix) as T;
}


const TARGET_ORDERS_LAYOUT: B.Layout<TargetOrders> = B.struct([
  B.seq(B.u64(), 4, "owner"),
  B.seq(
    B.struct([
      B.u64("price"),
      B.u64("vol"),
    ]),
    50,
    "buyOrders"
  ),
  B.seq(B.u64(), 8, "padding1"),
  B.u128("targetX"),
  B.u128("targetY"),
  B.u128("planXBuy"),
  B.u128("planYBuy"),
  B.u128("planXSell"),
  B.u128("planYSell"),
  B.u128("placedX"),
  B.u128("placedY"),
  B.u128("calcPnlX"),
  B.u128("calcPnlY"),
  B.seq(B.u64(), 6, "padding2"),
  B.seq(B.u64(), 10, "replaceBuyClientId"),
  B.seq(B.u64(), 10, "replaceSellClientId"),
  B.u64("lastOrderNumerator"),
  B.u64("lastOrderDenominator"),
  B.u64("planOrdersCur"),
  B.u64("placeOrdersCur"),
  B.u64("validBuyOrderNum"),
  B.u64("validSellOrderNum"),
  B.seq(B.u64(), 10, "padding3"),
  B.u128("freeSlotBits"),
]) as B.Layout<TargetOrders>;

const FEES_LAYOUT: B.Layout<Fees> = B.struct([
  B.u64("minSeparateNumerator"),
  B.u64("minSeparateDenominator"),
  B.u64("tradeFeeNumerator"),
  B.u64("tradeFeeDenominator"),
  B.u64("pnlNumerator"),
  B.u64("pnlDenominator"),
  B.u64("swapFeeNumerator"),
  B.u64("swapFeeDenominator"),
]) as B.Layout<Fees>;

const AMM_INFO_LAYOUT: B.Layout<AmmInfo> = B.struct([
  B.u64("status"),
  B.u64("nonce"),
  B.u64("orderNum"),
  B.u64("depth"),
  B.u64("coinDecimals"),
  B.u64("pcDecimals"),
  B.u64("state"),
  B.u64("resetFlag"),
  B.u64("minSize"),
  B.u64("volMaxCutRatio"),
  B.u64("amountWave"),
  B.u64("coinLotSize"),
  B.u64("pcLotSize"),
  B.u64("minPriceMultiplier"),
  B.u64("maxPriceMultiplier"),
  B.u64("sysDecimalValue"),
  B.struct([
    B.u64("minSeparateNumerator"),
    B.u64("minSeparateDenominator"),
    B.u64("tradeFeeNumerator"),
    B.u64("tradeFeeDenominator"),
    B.u64("pnlNumerator"),
    B.u64("pnlDenominator"),
    B.u64("swapFeeNumerator"),
    B.u64("swapFeeDenominator"),
  ], "fees"),
  B.struct([
    B.u64("needTakePnlCoin"),
    B.u64("needTakePnlPc"),
    B.u64("totalPnlPc"),
    B.u64("totalPnlCoin"),
    B.u64("poolOpenTime"),
    B.u64("punishPcAmount"),
    B.u64("punishCoinAmount"),
    B.u64("orderbookToInitTime"),
    B.u128("swapCoinInAmount"),
    B.u128("swapPcOutAmount"),
    B.u64("swapTakePcFee"),
    B.u128("swapPcInAmount"),
    B.u128("swapCoinOutAmount"),
    B.u64("swapTakeCoinFee"),
  ], "outPut"),
  B.publicKey("tokenCoin"),
  B.publicKey("tokenPc"),
  B.publicKey("coinMint"),
  B.publicKey("pcMint"),
  B.publicKey("lpMint"),
  B.publicKey("openOrders"),
  B.publicKey("market"),
  B.publicKey("serumDex"),
  B.publicKey("targetOrders"),
  B.publicKey("withdrawQueue"),
  B.publicKey("tokenTempLp"),
  B.publicKey("ammOwner"),
  B.u64("lpAmount"),
  B.u64("clientOrderId"),
  B.seq(B.u64(), 2, "padding"),
]) as B.Layout<AmmInfo>;
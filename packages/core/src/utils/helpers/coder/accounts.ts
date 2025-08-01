export interface TargetOrders {
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

export interface Fees {
  minSeparateNumerator: bigint;
  minSeparateDenominator: bigint;
  tradeFeeNumerator: bigint;
  tradeFeeDenominator: bigint;
  pnlNumerator: bigint;
  pnlDenominator: bigint;
  swapFeeNumerator: bigint;
  swapFeeDenominator: bigint;
}

export interface AmmInfo {
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


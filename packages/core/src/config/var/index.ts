import { PublicKey } from "@solana/web3.js";


export const TOKENS = {
  USDC: new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
  USDT: new PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
  USDS: new PublicKey("USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA"),
  SOL: new PublicKey("So11111111111111111111111111111111111111112"),
  jitoSOL: new PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
} as const;

export const DEFAULT_OPTIONS = {
  SLIPPAGE_BPS: 300,
  TOKEN_DECIMALS: 9,
  RERERRAL_FEE: 200,
  LEVERAGE_BPS: 50000, // 10000 = x1, 50000 = x5, 100000 = x10, 1000000 = x100
} as const;


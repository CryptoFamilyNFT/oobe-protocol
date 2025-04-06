"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = exports.TOKENS = void 0;
const web3_js_1 = require("@solana/web3.js");
exports.TOKENS = {
    USDC: new web3_js_1.PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    USDT: new web3_js_1.PublicKey("Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
    USDS: new web3_js_1.PublicKey("USDSwr9ApdHk5bvJKMjzff41FfuX8bSxdKcR81vTwcA"),
    SOL: new web3_js_1.PublicKey("So11111111111111111111111111111111111111112"),
    jitoSOL: new web3_js_1.PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn"),
};
exports.DEFAULT_OPTIONS = {
    SLIPPAGE_BPS: 300,
    TOKEN_DECIMALS: 9,
    RERERRAL_FEE: 200,
    LEVERAGE_BPS: 50000, // 10000 = x1, 50000 = x5, 100000 = x10, 1000000 = x100
};
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaCore = void 0;
const web3_js_1 = require("@solana/web3.js");
class SolanaCore {
    connection;
    constructor(endpoint) {
        this.connection = new web3_js_1.Connection(endpoint);
    }
    createWallet() {
        return web3_js_1.Keypair.generate();
    }
    async getBalance(publicKey) {
        return await this.connection.getBalance(new web3_js_1.PublicKey(publicKey));
    }
}
exports.SolanaCore = SolanaCore;

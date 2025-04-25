"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupKaminoMarket = void 0;
const kamino_lending_sdk_1 = require("@hubbleprotocol/kamino-lending-sdk");
const web3_js_1 = require("@solana/web3.js");
const setupKaminoMarket = async (connection) => {
    const kaminoMarket = await kamino_lending_sdk_1.KaminoMarket.load(connection, new web3_js_1.PublicKey('aK2dDzV4B5kyxNrF9C5mwNP3yZJMHKeSSUe8LbuZhJY'));
    if (kaminoMarket === null)
        return null;
    await kaminoMarket.loadReserves(); // Load all pools
    return kaminoMarket;
};
exports.setupKaminoMarket = setupKaminoMarket;
//# sourceMappingURL=kaminoClient.js.map
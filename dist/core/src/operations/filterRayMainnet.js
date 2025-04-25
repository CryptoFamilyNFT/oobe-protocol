"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterRayMainnet = filterRayMainnet;
const axios_1 = __importDefault(require("axios"));
// Query mainnet pool info from rpc https://api.raydium.io/v2/sdk/liquidity/mainnet.json.
async function filterRayMainnet() {
    try {
        const response = await axios_1.default.get("https://api.raydium.io/v2/sdk/liquidity/mainnet.json");
        const data = response.data;
        const filteredData = data.filter((item) => item.name.includes("Raydium"));
        return filteredData;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
//# sourceMappingURL=filterRayMainnet.js.map
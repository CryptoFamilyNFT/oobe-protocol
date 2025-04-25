"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const idl_json_1 = __importDefault(require("../../idl.json"));
(async () => {
    const coder = new __1.RaydiumAmmCoder(idl_json_1.default);
    const result = coder.instruction.decode(Buffer.from("0bf70a9c01000000006417427900000000", "hex"));
    console.log(result);
})();
//# sourceMappingURL=decodeRayInstructions.js.map
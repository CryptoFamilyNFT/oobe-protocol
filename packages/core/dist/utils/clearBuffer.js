"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimTrailingZeros = trimTrailingZeros;
const buffer_1 = require("buffer");
function trimTrailingZeros(buffer) {
    return buffer_1.Buffer.from(buffer.filter(byte => byte !== 0));
}
//# sourceMappingURL=clearBuffer.js.map
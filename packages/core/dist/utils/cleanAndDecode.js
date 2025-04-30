"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanAndDecodeResult = cleanAndDecodeResult;
function cleanAndDecodeResult(input) {
    if (typeof input !== 'string') {
        return String(input); // Or handle differently
    }
    return input.replace(/[^\x20-\x7E]/g, ''); // Example cleanup
}
//# sourceMappingURL=cleanAndDecode.js.map
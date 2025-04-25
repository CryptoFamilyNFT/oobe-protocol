"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressData = compressData;
exports.decompressData = decompressData;
const zlib_1 = __importDefault(require("zlib"));
/**
 * Compress data using gzip.
 * @param data - The string data to compress.
 * @returns A promise that resolves to a Buffer containing the compressed data.
 */
function compressData(data) {
    return zlib_1.default.gzipSync(data);
}
/**
 * Decompress data using gunzip.
 * @param compressedData - The Buffer containing compressed data.
 * @returns The decompressed string.
 */
function decompressData(compressedData) {
    return zlib_1.default.gunzipSync(compressedData).toString();
}
//# sourceMappingURL=glib.js.map
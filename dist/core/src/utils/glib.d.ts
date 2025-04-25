/**
 * Compress data using gzip.
 * @param data - The string data to compress.
 * @returns A promise that resolves to a Buffer containing the compressed data.
 */
export declare function compressData(data: string): Buffer;
/**
 * Decompress data using gunzip.
 * @param compressedData - The Buffer containing compressed data.
 * @returns The decompressed string.
 */
export declare function decompressData(compressedData: Buffer): string;
//# sourceMappingURL=glib.d.ts.map
import zlib from 'zlib';

/**
 * Compress data using gzip.
 * @param data - The string data to compress.
 * @returns A promise that resolves to a Buffer containing the compressed data.
 */
export function compressData(data: string): Buffer {
    return zlib.gzipSync(data);
}

/**
 * Decompress data using gunzip.
 * @param compressedData - The Buffer containing compressed data.
 * @returns The decompressed string.
 */
export function decompressData(compressedData: Buffer): string {
    return zlib.gunzipSync(compressedData).toString();
}
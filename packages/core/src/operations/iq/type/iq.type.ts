export interface ConversionParams {
    imageBuffer: Buffer;
    fontSize: number;
    density: number;
    watermark?: boolean;
}

export interface AsciiArtParams {
    imageBuffer: Buffer;
    fontSize: number;
    outputHeight: number;
}

import { Buffer } from 'buffer';

export function trimTrailingZeros(buffer: Buffer): Buffer {
    return Buffer.from(buffer.filter(byte => byte !== 0));

}
import { Connection, PublicKey, Keypair, Transaction } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { Agent } from "../../agent/Agents";
import { AsciiArtParams, ConversionParams } from "./type/iq.type";
import { Buffer } from "buffer";
export declare class IQOperation {
    static PROGRAM_ID: PublicKey;
    static IQ_HOST: string;
    static GEN_ART_API: string;
    static COMPRESS_API: string;
    static contractChunkSize: number;
    getImageBufferFromUrl(imageUrl: string): Promise<{
        height: number;
        bufferImage: Buffer;
    }>;
    convertImageToASCII(imageBuffer: Buffer): Promise<Buffer>;
    _getChunk(message: string, chunkSize: number): Promise<string[] | null>;
    compressImageBuffer(imageBuffer: {
        result: string;
        width: number;
    }): Promise<{
        chunkList: {
            text_list: string[] | null;
            method: any;
        }[];
        chunkSize: number;
        merkleRoot: any;
    }>;
    splitAndHashBuffer(buffer: Buffer, chunkSize?: number): Promise<{
        chunks: Buffer[];
        hashes: string[];
    }>;
    getPDA(userKey: string): Promise<string | undefined>;
    getDBPDA(userKey: string): Promise<string>;
    verifyUserGotInitialized(payer: Keypair): Promise<{
        dbPDA: string;
        userPDA: string;
    } | undefined>;
    createInitTransactionOnServer(userKeyString: string, agent: Agent): Promise<Transaction | null>;
    pda_make(connection: Connection, payer: anchor.Wallet, agent: Agent): Promise<void>;
    userInitialize(connection: Connection, payer: anchor.Wallet, agent: Agent): Promise<void>;
    static sleep(ms: number): Promise<unknown>;
    sendCode(chunks: Buffer[], codeAccount: PublicKey, asciiBuffer: Buffer, payer: Keypair, connection: Connection, PROGRAM_ID: PublicKey): Promise<string[]>;
    dbCodeIn(connection: Connection, payer: Keypair, handle: string, datatype: string, offset: string, dbAccount: PublicKey): Promise<void>;
    fetchAsciiFromChain(connection: Connection, dbAccountPDA: PublicKey, codeAccountPDA: PublicKey): Promise<string | undefined>;
    handleBufferImage(imageUrl: string, fontSize?: number, density?: number): Promise<{
        result: string;
        width: number;
    }>;
    static generateImage(params: ConversionParams): Promise<Buffer>;
    static generateAsciiArt(params: AsciiArtParams): Promise<{
        result: string;
        width: number;
    }>;
    private static mapBrightnessToChar;
    static compressText(originalText: string): Promise<any>;
    static decompressText(compressedText: string, method: string): Promise<string>;
    private static calculateBrightness;
    private getMerkleRootFromServer;
    createSendTransactionOnServer(userKeyString: string, code: any, before_tx: any, method: any, decode_break: any, agent: Agent): Promise<Transaction>;
    _translate_transaction(data: any, agent: Agent): Promise<Transaction>;
    makeAllTransactions(userKeyStr: string, chunkSize: number, chunkList: {
        text_list: string[] | null;
        method: any;
    }[], handle: string | undefined, type: "image" | "text" | undefined, offset: any, agent: Agent): Promise<string | false>;
    createDbCodeTransactionOnserver(userKeyString: string, handle: string, tail_tx: any, type: string, offset: any, agent: Agent): Promise<Transaction>;
    getByteLength(text: string): Promise<number>;
    emojiToText(message: string): Promise<string>;
    _getChunk_ForText(message: string, chunkSize: number): Promise<string[]>;
    _send_transaction(connection: Connection, transaction: Transaction, agent: Agent): Promise<string>;
    textCodeIn(userKeyStr: string, text: string, agent: Agent): Promise<string | false>;
    makeTextTransactions(userKeyStr: string, chunkSize: number, chunkList: any, handle: string | undefined, type: "image" | "text" | undefined, offset: any, agent: Agent): Promise<string>;
    AstralChef(imageUrl: string, fontSize: number, density: number, agent: Agent, type: string): Promise<string | false | undefined>;
}
//# sourceMappingURL=iq.operation.d.ts.map
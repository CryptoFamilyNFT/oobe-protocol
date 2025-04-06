import {
    Connection,
    PublicKey,
    Keypair,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
    Struct,
} from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import zlib from 'zlib';
import * as Jimp from 'jimp';
import { Agent } from "../../agent/Agents";
import { null_Logger } from "../../utils/logger/tmp/null/null";
import { AsciiArtParams, ConversionParams } from "./type/iq.type";
import { createHash } from "crypto";
import { buffer, text } from "stream/consumers";
import { Buffer } from "buffer";
import { sleep } from "openai/core";

export class IQOperation {
    static PROGRAM_ID = new PublicKey("FG5nDUjz4S1FBs2rZrXsKsa7J34e21WF17F8nFL9uwWi");
    static IQ_HOST = 'https://solanacontractapi.uc.r.appspot.com';
    static GEN_ART_API = "https://iq.newjeans.cloud/convert";
    static COMPRESS_API = "https://compresspy.fly.dev";
    static contractChunkSize = 850;

    public async getImageBufferFromUrl(imageUrl: string): Promise<{ height: number, bufferImage: Buffer }> {
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        const jimpImage = await Jimp.Jimp.read(Buffer.from(imageBuffer));
        const heightImage = jimpImage.bitmap.height;
        console.log("Image buffer fetched:", imageBuffer);
        console.log("Image height:", heightImage);
        return { height: heightImage, bufferImage: Buffer.from(imageBuffer) };
    }

    public async convertImageToASCII(imageBuffer: Buffer): Promise<Buffer> {
        const asciiChars = '@%#*+=-:. ';
        let asciiStr = '';

        return new Promise<Buffer>((resolve, reject) => {
            Jimp.Jimp.read(imageBuffer)
                .then((image) => {
                    const newWidth = image.bitmap.width - 300;
                    const newHeight = image.bitmap.height - 300;
                    image.resize({ w: newWidth, h: newHeight }).greyscale();

                    for (let y = 0; y < image.bitmap.height; y++) {
                        for (let x = 0; x < image.bitmap.width; x++) {
                            const idx = (y * image.bitmap.width + x) * 4;
                            const red = image.bitmap.data[idx];
                            const green = image.bitmap.data[idx + 1];
                            const blue = image.bitmap.data[idx + 2];
                            const avg = (red + green + blue) / 3;
                            const charIdx = Math.floor((avg / 255) * (asciiChars.length - 1));
                            asciiStr += asciiChars[charIdx];
                        }
                        asciiStr += '\n';
                    }

                    resolve(Buffer.from(asciiStr));
                })
                .catch((err: Error) => {
                    reject(err);
                });
        });
    }

    public async _getChunk(message: string, chunkSize: number): Promise<string[] | null> {
        const msglength = message.length;
        const totalChunks = Math.ceil(msglength / chunkSize); // 전체 메시지를 몇 개의 청크로 나눠야 하는지 계산
        let chunks = [];
        for (let i = 0; i < totalChunks; i++) {
            const start = i * chunkSize;
            const end = Math.min(start + chunkSize, msglength);
            chunks.push(message.slice(start, end));
        }
        if (chunks.length < 1) {
            return null;
        } else {
            return chunks;
        }
    }

    public async compressImageBuffer(imageBuffer: {
        result: string;
        width: number;
    }): Promise<{
        chunkList: {
            text_list: string[] | null;
            method: any;
        }[];
        chunkSize: number;
        merkleRoot: any;
    }> {
        const chunks: Buffer[] = [];
        let textChunks: string[] | null = [];
        let compressedChunks = []
        let totalChunks = []
        let chunkSize = 0;
        const contractChunkSize = 850;
        let innerOffset = "[ width: " + imageBuffer.width + " ]";
        let full_msg = innerOffset + imageBuffer.result;
        let ascii = full_msg.replace(/\n/g, "");

        console.log("Compressing image buffer...");
        textChunks = await this._getChunk(ascii, 10000);
        console.log("Image buffer compressed:", textChunks);


        const merkleroot = await this.getMerkleRootFromServer(textChunks ?? []);

        if (textChunks === null) {
            throw new Error('Failed to get chunks');
        }

        for (let textChunk of textChunks) {
            let _compressChunk = await IQOperation.compressText(textChunk);
            compressedChunks.push(_compressChunk);
        }

        for (let compressChunk of compressedChunks) {
            let _contractchunks = await this._getChunk(compressChunk.result, contractChunkSize);
            const chunkObj = {
                text_list: _contractchunks,
                method: compressChunk.method,//offset
            }
            if (_contractchunks === null) {
                throw new Error('Failed to get chunks');
            }
            totalChunks.push(chunkObj);
            chunkSize += _contractchunks.length;
        }

        const resultObj = {
            chunkList: totalChunks,
            chunkSize: chunkSize,
            merkleRoot: merkleroot,
        }

        return resultObj;
    }


    public async splitAndHashBuffer(buffer: Buffer, chunkSize: number = 1000): Promise<{ chunks: Buffer[], hashes: string[] }> {
        let chunks: Buffer[] = [];
        let hashes: string[] = [];

        for (let i = 0; i < buffer.length; i += chunkSize) {
            const chunk = buffer.subarray(i, i + chunkSize);
            const hash = createHash("sha256").update(chunk).digest("hex");
            chunks.push(chunk);
            hashes.push(hash);
        }

        return { chunks, hashes };
    }

    public async getPDA(userKey: string): Promise<string | undefined> {
        try {
            const response = await fetch(`${IQOperation.IQ_HOST}/getPDA/${userKey}`);
            const data = await response.json();
            if (response.ok) {
                return data.PDA as string;
            } else {
                throw new Error(data.error || 'Failed to fetch PDA');
            }
        } catch (error) {
            console.error('Error fetching PDA:', error);
            return undefined;
        }
    }

    public async getDBPDA(userKey: string): Promise<string> {
        try {
            const response = await fetch(`${IQOperation.IQ_HOST}/getDBPDA/${userKey}`);
            const data = await response.json();
            if (response.ok) {
                return data.DBPDA as string;
            } else {
                throw new Error(data.error || 'Failed to fetch PDA');
            }
        } catch (error) {
            console.error('Error fetching PDA:', error);
            return "null";
        }
    }

    public async verifyUserGotInitialized(payer: Keypair) {
        let dbPDA: string | undefined;
        let userPDA: string | undefined;

        // verify if user got initialized
        userPDA = await this.getPDA(payer.publicKey.toBase58());
        if (!userPDA) {
            console.log('User not initialized');

        } else {
            console.log('User initialized');
        }

        // verify if userdb got initialized
        dbPDA = await this.getDBPDA(payer.publicKey.toBase58());
        if (dbPDA === "null") {
            console.log('UserDB not initialized');
            dbPDA = undefined;
        } else {
            console.log('UserDB initialized');
        }

        if (dbPDA === undefined) {
            console.log('UserDB not initialized');
            return undefined
        } else if (userPDA === undefined) {
            console.log('User not initialized');
            return undefined
        } else {
            return { dbPDA, userPDA };
        }
    }

    public async createInitTransactionOnServer(userKeyString: string, agent: Agent) {
        try {
            const response = await fetch(IQOperation.IQ_HOST + `/initialize-user/${userKeyString}`);
            if (response.ok) {
                try {

                    const responseData = await response.json();
                    const data = responseData;
                    const transaction = await this._translate_transaction(data.transaction, agent);
                    return transaction;
                } catch (error) {
                    console.error('Error creating transaction:', error);
                    return null;
                }
            }
        } catch (error) {
            console.error('Error creating initTransactionOnServer:', error);
            return null;
        }
        return null;
    }

    public async pda_make(connection: Connection, payer: anchor.Wallet, agent: Agent) {
        const userkey = payer.publicKey;
        const useKeyString = userkey.toString();
        console.log(useKeyString);
        const transaction = await this.createInitTransactionOnServer(useKeyString, agent);
        if (transaction != null) {
            await sendAndConfirmTransaction(connection, transaction, [payer.payer], { skipPreflight: true });
        } else {
            console.log("Transaction build failed");
        }
    }

    public async userInitialize(connection: Connection, payer: anchor.Wallet, agent: Agent) {
        //const verifyUser = await this.verifyUserGotInitialized(payer.payer);
        await this.pda_make(connection, payer, agent);
    }

    static async sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        })
    }

    public async sendCode(
        chunks: Buffer[],
        codeAccount: PublicKey,
        asciiBuffer: Buffer,
        payer: Keypair,
        connection: Connection,
        PROGRAM_ID: PublicKey
    ) {
        // Handle large ASCII text
        let signatures = [];

        for (let i = 0; i < chunks.length; i++) {
            const instruction = new TransactionInstruction({
                keys: [
                    { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                    { pubkey: codeAccount, isSigner: false, isWritable: true },
                ],
                programId: PROGRAM_ID,
                data: Buffer.from(JSON.stringify({ code: chunks[i], method: 0, decode_break: i })),
            });

            const signature = await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
            signatures.push(signature);
            console.log(`Chunk ${i + 1}/${chunks.length} stored ✅ Tx:`, signature);
        }

        return signatures;
    }

    public async dbCodeIn(
        connection: Connection,
        payer: Keypair,
        handle: string,
        datatype: string,
        offset: string,
        dbAccount: PublicKey
    ) {

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: dbAccount, isSigner: false, isWritable: true },
            ],
            programId: IQOperation.PROGRAM_ID,
            data: Buffer.from(JSON.stringify({ handle, tail_tx: "", type_field: datatype, offset })),
        });

        const signature = await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer]);
        console.log("Metadata stored ✅ Tx:", signature);
    }

    public async fetchAsciiFromChain(connection: Connection, dbAccountPDA: PublicKey, codeAccountPDA: PublicKey) {
        const accountInfo = await connection.getAccountInfo(codeAccountPDA);

        if (!accountInfo) {
            console.log("No data found on-chain.");
            return;
        }

        const storedAscii = accountInfo.data.toString("utf-8").trim();
        console.log("Retrieved ASCII Data:", storedAscii);

        return storedAscii;
    }

    public async handleBufferImage(imageUrl: string, fontSize: number = 10, density: number = 1): Promise<{
        result: string;
        width: number;
    }> {
        //step-1: get buffer from url, convert image to ascii
        const { height, bufferImage } = await this.getImageBufferFromUrl(imageUrl);

        //setp-2: convert image to ascii
        const asciiBuffer = await IQOperation.generateAsciiArt({ imageBuffer: bufferImage, fontSize, outputHeight: height });

        return asciiBuffer
    }

    public static async generateImage(params: ConversionParams): Promise<Buffer> {
        const { imageBuffer, fontSize, density, watermark = false } = params;

        console.log("Generating ASCII art from image buffer...");
        if (fontSize < 0) {
            throw new Error("Font size cannot be less than 0.");
        }

        // Invio diretto del buffer come payload
        const convertResponse = await fetch(this.GEN_ART_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "x-font-size": fontSize.toString(),
                "x-density": density.toString(),
                "x-watermark": watermark.toString(),
            },
            body: imageBuffer,
        });

        if (!convertResponse.ok) {
            throw new Error("Error processing image.");
        }

        console.log("Image processed successfully.", convertResponse.statusText);

        return Buffer.from(await convertResponse.arrayBuffer()); // Restituisce l'immagine processata come buffer
    }

    public static async generateAsciiArt(params: AsciiArtParams): Promise<{ result: string; width: number }> {
        const { imageBuffer, fontSize, outputHeight } = params;

        // Validate font size
        if (fontSize < 5 || fontSize > 50) {
            throw new Error("Font size must be between 5 and 50.");
        }

        // Load image from buffer using Jimp
        const image = await Jimp.Jimp.read(imageBuffer);

        // Resize the image maintaining aspect ratio
        const aspectRatio = image.bitmap.width / image.bitmap.height;
        const outputWidth = Math.floor(outputHeight * aspectRatio);
        image.resize({ w: outputWidth, h: outputHeight });

        const result: string[] = [];
        for (let y = 0; y < image.bitmap.height; y += fontSize) {
            let line = "";

            for (let x = 0; x < image.bitmap.width; x += fontSize) {
                const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
                const char = this.mapBrightnessToChar(this.calculateBrightness(pixel.r, pixel.g, pixel.b, pixel.a));
                line += char;
            }
            result.push(line);
        }

        return { result: result.join("\n"), width: result[0]?.length || 0 };
    }

    private static mapBrightnessToChar(brightness: number): string {
        if (brightness < 51) return " ";
        if (brightness < 102) return "'";
        if (brightness < 140) return ":";
        if (brightness < 170) return "i";
        if (brightness < 200) return "I";
        if (brightness < 210) return "J";
        return "$";
    }

    static async compressText(originalText: string): Promise<any> {
        try {
            const response = await fetch(`${this.COMPRESS_API}/compress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ascii: originalText }),
            });

            if (!response.ok) {
                throw new Error(`Compression failed: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error: any) {
            console.error('Error in compressText:', error.message);
            throw error;
        }
    }

    // Decompress the ASCII art text (after compression)
    static async decompressText(compressedText: string, method: string): Promise<string> {
        try {
            const response = await fetch(`${this.COMPRESS_API}/decompress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    original_text: compressedText,
                    method: method,
                }),
            });

            if (!response.ok) {
                throw new Error(`Decompression failed: ${response.statusText}`);
            }

            const result = await response.json();
            return result.result; // Decompressed text
        } catch (error: any) {
            console.error('Error in decompressText:', error.message);
            throw error;
        }
    }

    private static calculateBrightness(r: number, g: number, b: number, a: number): number {
        // Calculate the brightness from the RGBA values
        return (r + g + b) / 3; // Simple average for grayscale
    }

    private async getMerkleRootFromServer(dataList: string[]) {
        console.log("Generating Merkle Root...", dataList);
        const url = IQOperation.IQ_HOST + "/generate-merkle-root"; // 서버 URL
        const requestData = {
            data: dataList, // 데이터 배열
        };
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const responseData = await response.json();
            console.log("Merkle Root:", responseData.merkleRoot);
            return responseData.merkleRoot;
        } catch (error: any) {
            console.error("Failed to get Merkle Root:", error.message);
            throw error;
        }
    }

    public async createSendTransactionOnServer(userKeyString: string, code: any, before_tx: any, method: any, decode_break: any, agent: Agent) {
        const url = IQOperation.IQ_HOST + '/create-send-transaction'; // 서버 URL로 변경

        const requestData = {
            userKeyString,
            code,
            before_tx,
            method,
            decode_break,
        };

        console.log("Creating send transaction on server...", requestData);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            const transaction = await this._translate_transaction(data.transaction, agent);
            return transaction;

        } catch (error: any) {
            console.error("Failed to create transaction:", error.message);
            throw error;
        }
    }

    public async _translate_transaction(data: any, agent: Agent) {
        const transaction = new Transaction()
        console.log(data);
        const connection = agent.connection;
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash; // 서버에서 받은 recentBlockhash
        transaction.feePayer = agent.wallet.publicKey

        data.instructions.forEach((instr: any) => {
            const instruction = new TransactionInstruction({
                keys: instr.keys.map((key: any) => ({
                    pubkey: new PublicKey(key.pubkey),
                    isSigner: key.isSigner,
                    isWritable: key.isWritable,
                })),
                programId: new PublicKey(instr.programId),
                data: instr.data,
            });
            transaction.add(instruction);
        });
        return transaction;

    }

    public async makeAllTransactions(
        userKeyStr: string,
        chunkSize: number,
        chunkList: {
            text_list: string[] | null;
            method: any;
        }[], handle: string = 'anonymous',
        type: 'image' | 'text' = 'image',
        offset: any,
        agent: Agent
    ) {


        let beforeHash = "Genesis";
        let current = 0;

        for (let chunks of chunkList) {
            let textList = chunks.text_list;
            let method = chunks.method;
            let decode_break = 0;
            let i = 0;

            if (textList === null) {
                throw new Error('Failed to get chunks');
            }

            for (let text of textList) {

                if (i == textList.length - 1) {
                    decode_break = 1;
                }
                if (i < textList.length) {
                    const _Trx = await this.createSendTransactionOnServer(userKeyStr, text, beforeHash, method, decode_break, agent);
                    beforeHash = (await this._send_transaction(agent.connection, _Trx, agent)) || "error";

                } else {
                    console.log("last_trx set the decodebreak");
                    const _Trx = await this.createSendTransactionOnServer(userKeyStr, text, beforeHash, method, decode_break, agent);
                    console.log(_Trx)
                    beforeHash = (await this._send_transaction(agent.connection, _Trx, agent)) || "error";
                }
                await IQOperation.sleep(3500);
                i += 1;
                current += 1;
                if (beforeHash === "error") {
                    console.log("Error in making transaction");
                    return false;
                }
            }
        }

        const DBTrx = await this.createDbCodeTransactionOnserver(userKeyStr, handle, beforeHash, type, offset, agent);
        const resultHash = (await this._send_transaction(agent.connection, DBTrx, agent)) || "error";


        return resultHash;
    }

    async createDbCodeTransactionOnserver(userKeyString: string, handle: string, tail_tx: any, type: string, offset: any, agent: Agent) {
        const url = IQOperation.IQ_HOST + '/create-db-code-free-transaction'; // 서버 URL로 변경
        const requestData = {
            userKeyString,
            handle,
            tail_tx,
            type,
            offset
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            const transaction = this._translate_transaction(data.transaction, agent)
            return transaction;

        } catch (error: any) {
            console.error("Failed to create transaction:", error.message);
            throw error;
        }
    }

    async getByteLength(text: string) {
        const encoder = new TextEncoder(); // UTF-8로 변환
        const encodedText = encoder.encode(text); // 바이트 배열 생성
        return encodedText.length; // 바이트 배열의 길이 반환
    }

    async emojiToText(message: string) {
        return message.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, (match: any) => {
            const codePoint = match.codePointAt(0).toString(16).toUpperCase();

            return "//".slice(1) + `u${codePoint}`;
        });
    }

    async _getChunk_ForText(message: string, chunkSize: number) {
        const encoder = new TextEncoder(); // 메시지를 UTF-8로 변환

        let chunks = [];
        let currentChunkStart = 0;
        let currentChunkBytes = 0;

        for (let i = 0; i < message.length; i++) {

            let charByteLength = encoder.encode(message[i]).length;
            currentChunkBytes += charByteLength;

            if (currentChunkBytes > chunkSize) {
                chunks.push(message.slice(currentChunkStart, i));
                currentChunkStart = i;
                currentChunkBytes = charByteLength;
            }
        }

        if (currentChunkStart < message.length) {
            chunks.push(message.slice(currentChunkStart)); // 나머지 문자열을 청크로 저장
        }

        return chunks;
    }

    async _send_transaction(connection: Connection, transaction: Transaction, agent: Agent) {
        if (transaction) {
            try {
                const latestBlockhash = await connection.getLatestBlockhash();
                transaction.recentBlockhash = latestBlockhash.blockhash;
                transaction.feePayer = agent.wallet.publicKey;

                const signature = await connection.sendTransaction(transaction, [agent.wallet], { skipPreflight: true });
                if (typeof signature == 'string') {
                    return signature;
                }
                return signature;
            } catch (err) {
                console.error("Error in _send_transaction:", err);
                return "error";
            }
        } else {
            console.error("transaction not found!");
            return "error";
        }
    }

    public async textCodeIn(userKeyStr: string, text: string, agent: Agent) {
        const emoji_text = await this.emojiToText(text)
        const byteLength = await this.getByteLength(emoji_text)
        const textInLimit = 15000;
        const handle = "anonymous"; // edit with twitter api

        if (text === '') {
            return false;
        } else if (byteLength > textInLimit) {
            console.log("Text is too long");
            console.log("Text length:", byteLength);
            console.log("Text limit:", textInLimit);
            return false;
        }
        const chunks = await this._getChunk_ForText(emoji_text, IQOperation.contractChunkSize);
        const chunkSize = chunks.length;

        const merkleRoot = await this.getMerkleRootFromServer(chunks);
        console.log(merkleRoot);
        const offset = merkleRoot;

        const dataType = "text";

        const result = await this.makeTextTransactions(userKeyStr, chunkSize, chunks, handle, dataType, offset, agent);
        console.log(result);
        return result;
    }

    async makeTextTransactions(userKeyStr: string,
        chunkSize: number,
        chunkList: any, handle: string = 'anonymous',
        type: 'image' | 'text' = 'image',
        offset: any,
        agent: Agent
    ) {
        let beforeHash = "Genesis";

        const totalSteps = chunkSize + 1;
        let current = 0;
        let method = 0;
        let decode_break = 0;
        let i = 0;

        for (let text of chunkList) {

            const _Trx = await this.createSendTransactionOnServer(userKeyStr, text, beforeHash, method, decode_break, agent);
            beforeHash = (await this._send_transaction(agent.connection, _Trx, agent)) || "error";

            await IQOperation.sleep(5000)

            current = current + 1;
        }

        await IQOperation.sleep(1500)

        const DBTrx = await this.createDbCodeTransactionOnserver(userKeyStr, handle, beforeHash, type, offset, agent);
        const resultHash = (await this._send_transaction(agent.connection, DBTrx, agent)) || "error";


        return resultHash;
    }

    public async AstralChef(imageUrl: string, fontSize: number, density: number, agent: Agent, type: string) {
        const wallet = new NodeWallet(agent.wallet);
        let chunksInit: Buffer<ArrayBufferLike>[] = [];
        let compressDataChunks: {
            chunkList: {
                text_list: string[] | null;
                method: any;
            }[];
            chunkSize: number;
            merkleRoot: any;
        } = { chunkList: [], chunkSize: 0, merkleRoot: null };

        console.log("[oobe-protocol] - IQ - Starting AstralChef with type:", type);

        switch (type) {
            case "image":
                console.log("[oobe-protocol] - IQ - Handling image buffer");
                const image = await this.handleBufferImage(imageUrl, fontSize, density);
                console.log("[oobe-protocol] - IQ - Image buffer handled:", image);
                const { chunkList, chunkSize, merkleRoot } = await this.compressImageBuffer(image);
                console.log("[oobe-protocol] - IQ - Image buffer compressed:", { chunkList, chunkSize, merkleRoot });
                compressDataChunks = { chunkList, chunkSize, merkleRoot };
                break;
            case "text":
                console.log("[oobe-protocol] - IQ - Handling text buffer");
                const text = await this.textCodeIn(wallet.publicKey.toBase58(), imageUrl, agent);
                break;
            default:
                throw new Error("Unsupported type");
        }

        console.log("[oobe-protocol] - IQ - [init]Chunks:", chunksInit);
        console.log("[oobe-protocol] - IQ - Chunks length:", chunksInit.length);

        const chunkList = compressDataChunks.chunkList;
        const chunkSize = compressDataChunks.chunkSize;
        const offset = compressDataChunks.merkleRoot;

        console.log("Data Chunk list and chunk size:" + offset, chunkSize, chunkList);

        let dataType: 'image' | 'text' = type === "image" ? "image" : "text";
        const handle = "anonymous"; // edit with twitter api

        const dbPDACheck = await this.getDBPDA(wallet.payer.publicKey.toBase58());

        const accountInfo = await agent.connection.getAccountInfo(new PublicKey(dbPDACheck));
        console.log("Account Info:", accountInfo);

        if (accountInfo === null) {
            console.log("[oobe-protocol] - IQ - User not initialized, initializing...");
            await this.userInitialize(agent.connection, wallet, agent);
            await IQOperation.sleep(25000);
        }

        if (dataType === "image") {
            console.log("[oobe-protocol] - IQ - Image data initialized with signature:");
            const result = await this.makeAllTransactions(agent.wallet.publicKey.toBase58(), chunkSize, chunkList, handle, dataType, offset, agent);
            console.log("Signature result: ", result);
            return result;
        } else if (dataType === "text") {
            const result = await this.textCodeIn(agent.wallet.publicKey.toBase58(), imageUrl, agent);
            console.log("Signature result: ", result);
            return result
        }
        return;
    }
}

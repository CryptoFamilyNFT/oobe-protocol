"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IQOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const Jimp = __importStar(require("jimp"));
const crypto_1 = require("crypto");
const buffer_1 = require("buffer");
class IQOperation {
    async getImageBufferFromUrl(imageUrl) {
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        const jimpImage = await Jimp.Jimp.read(buffer_1.Buffer.from(imageBuffer));
        const heightImage = jimpImage.bitmap.height;
        console.log("Image buffer fetched:", imageBuffer);
        console.log("Image height:", heightImage);
        return { height: heightImage, bufferImage: buffer_1.Buffer.from(imageBuffer) };
    }
    async convertImageToASCII(imageBuffer) {
        const asciiChars = '@%#*+=-:. ';
        let asciiStr = '';
        return new Promise((resolve, reject) => {
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
                resolve(buffer_1.Buffer.from(asciiStr));
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
    async _getChunk(message, chunkSize) {
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
        }
        else {
            return chunks;
        }
    }
    async compressImageBuffer(imageBuffer) {
        const chunks = [];
        let textChunks = [];
        let compressedChunks = [];
        let totalChunks = [];
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
                method: compressChunk.method, //offset
            };
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
        };
        return resultObj;
    }
    async splitAndHashBuffer(buffer, chunkSize = 1000) {
        let chunks = [];
        let hashes = [];
        for (let i = 0; i < buffer.length; i += chunkSize) {
            const chunk = buffer.subarray(i, i + chunkSize);
            const hash = (0, crypto_1.createHash)("sha256").update(chunk).digest("hex");
            chunks.push(chunk);
            hashes.push(hash);
        }
        return { chunks, hashes };
    }
    async getPDA(userKey) {
        try {
            const response = await fetch(`${IQOperation.IQ_HOST}/getPDA/${userKey}`);
            const data = await response.json();
            if (response.ok) {
                return data.PDA;
            }
            else {
                throw new Error(data.error || 'Failed to fetch PDA');
            }
        }
        catch (error) {
            console.error('Error fetching PDA:', error);
            return undefined;
        }
    }
    async getDBPDA(userKey) {
        try {
            const response = await fetch(`${IQOperation.IQ_HOST}/getDBPDA/${userKey}`);
            const data = await response.json();
            if (response.ok) {
                return data.DBPDA;
            }
            else {
                throw new Error(data.error || 'Failed to fetch PDA');
            }
        }
        catch (error) {
            console.error('Error fetching PDA:', error);
            return "null";
        }
    }
    async verifyUserGotInitialized(payer) {
        let dbPDA;
        let userPDA;
        // verify if user got initialized
        userPDA = await this.getPDA(payer.publicKey.toBase58());
        if (!userPDA) {
            console.log('User not initialized');
        }
        else {
            console.log('User initialized');
        }
        // verify if userdb got initialized
        dbPDA = await this.getDBPDA(payer.publicKey.toBase58());
        if (dbPDA === "null") {
            console.log('UserDB not initialized');
            dbPDA = undefined;
        }
        else {
            console.log('UserDB initialized');
        }
        if (dbPDA === undefined) {
            console.log('UserDB not initialized');
            return undefined;
        }
        else if (userPDA === undefined) {
            console.log('User not initialized');
            return undefined;
        }
        else {
            return { dbPDA, userPDA };
        }
    }
    async createInitTransactionOnServer(userKeyString, agent) {
        try {
            const response = await fetch(IQOperation.IQ_HOST + `/initialize-user/${userKeyString}`);
            if (response.ok) {
                try {
                    const responseData = await response.json();
                    const data = responseData;
                    const transaction = await this._translate_transaction(data.transaction, agent);
                    return transaction;
                }
                catch (error) {
                    console.error('Error creating transaction:', error);
                    return null;
                }
            }
        }
        catch (error) {
            console.error('Error creating initTransactionOnServer:', error);
            return null;
        }
        return null;
    }
    async pda_make(connection, payer, agent) {
        const userkey = payer.publicKey;
        const useKeyString = userkey.toString();
        console.log(useKeyString);
        const transaction = await this.createInitTransactionOnServer(useKeyString, agent);
        if (transaction != null) {
            await (0, web3_js_1.sendAndConfirmTransaction)(connection, transaction, [payer.payer], { skipPreflight: true });
        }
        else {
            console.log("Transaction build failed");
        }
    }
    async userInitialize(connection, payer, agent) {
        //const verifyUser = await this.verifyUserGotInitialized(payer.payer);
        await this.pda_make(connection, payer, agent);
    }
    static async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async sendCode(chunks, codeAccount, asciiBuffer, payer, connection, PROGRAM_ID) {
        // Handle large ASCII text
        let signatures = [];
        for (let i = 0; i < chunks.length; i++) {
            const instruction = new web3_js_1.TransactionInstruction({
                keys: [
                    { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                    { pubkey: codeAccount, isSigner: false, isWritable: true },
                ],
                programId: PROGRAM_ID,
                data: buffer_1.Buffer.from(JSON.stringify({ code: chunks[i], method: 0, decode_break: i })),
            });
            const signature = await (0, web3_js_1.sendAndConfirmTransaction)(connection, new web3_js_1.Transaction().add(instruction), [payer]);
            signatures.push(signature);
            console.log(`Chunk ${i + 1}/${chunks.length} stored ✅ Tx:`, signature);
        }
        return signatures;
    }
    async dbCodeIn(connection, payer, handle, datatype, offset, dbAccount) {
        const instruction = new web3_js_1.TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: dbAccount, isSigner: false, isWritable: true },
            ],
            programId: IQOperation.PROGRAM_ID,
            data: buffer_1.Buffer.from(JSON.stringify({ handle, tail_tx: "", type_field: datatype, offset })),
        });
        const signature = await (0, web3_js_1.sendAndConfirmTransaction)(connection, new web3_js_1.Transaction().add(instruction), [payer]);
        console.log("Metadata stored ✅ Tx:", signature);
    }
    async fetchAsciiFromChain(connection, dbAccountPDA, codeAccountPDA) {
        const accountInfo = await connection.getAccountInfo(codeAccountPDA);
        if (!accountInfo) {
            console.log("No data found on-chain.");
            return;
        }
        const storedAscii = accountInfo.data.toString("utf-8").trim();
        console.log("Retrieved ASCII Data:", storedAscii);
        return storedAscii;
    }
    async handleBufferImage(imageUrl, fontSize = 10, density = 1) {
        //step-1: get buffer from url, convert image to ascii
        const { height, bufferImage } = await this.getImageBufferFromUrl(imageUrl);
        //setp-2: convert image to ascii
        const asciiBuffer = await IQOperation.generateAsciiArt({ imageBuffer: bufferImage, fontSize, outputHeight: height });
        return asciiBuffer;
    }
    static async generateImage(params) {
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
        return buffer_1.Buffer.from(await convertResponse.arrayBuffer()); // Restituisce l'immagine processata come buffer
    }
    static async generateAsciiArt(params) {
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
        const result = [];
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
    static mapBrightnessToChar(brightness) {
        if (brightness < 51)
            return " ";
        if (brightness < 102)
            return "'";
        if (brightness < 140)
            return ":";
        if (brightness < 170)
            return "i";
        if (brightness < 200)
            return "I";
        if (brightness < 210)
            return "J";
        return "$";
    }
    static async compressText(originalText) {
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
        }
        catch (error) {
            console.error('Error in compressText:', error.message);
            throw error;
        }
    }
    // Decompress the ASCII art text (after compression)
    static async decompressText(compressedText, method) {
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
        }
        catch (error) {
            console.error('Error in decompressText:', error.message);
            throw error;
        }
    }
    static calculateBrightness(r, g, b, a) {
        // Calculate the brightness from the RGBA values
        return (r + g + b) / 3; // Simple average for grayscale
    }
    async getMerkleRootFromServer(dataList) {
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
        }
        catch (error) {
            console.error("Failed to get Merkle Root:", error.message);
            throw error;
        }
    }
    async createSendTransactionOnServer(userKeyString, code, before_tx, method, decode_break, agent) {
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
        }
        catch (error) {
            console.error("Failed to create transaction:", error.message);
            throw error;
        }
    }
    async _translate_transaction(data, agent) {
        const transaction = new web3_js_1.Transaction();
        console.log(data);
        const connection = agent.connection;
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash; // 서버에서 받은 recentBlockhash
        transaction.feePayer = agent.wallet.publicKey;
        data.instructions.forEach((instr) => {
            const instruction = new web3_js_1.TransactionInstruction({
                keys: instr.keys.map((key) => ({
                    pubkey: new web3_js_1.PublicKey(key.pubkey),
                    isSigner: key.isSigner,
                    isWritable: key.isWritable,
                })),
                programId: new web3_js_1.PublicKey(instr.programId),
                data: instr.data,
            });
            transaction.add(instruction);
        });
        return transaction;
    }
    async makeAllTransactions(userKeyStr, chunkSize, chunkList, handle = 'anonymous', type = 'image', offset, agent) {
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
                }
                else {
                    console.log("last_trx set the decodebreak");
                    const _Trx = await this.createSendTransactionOnServer(userKeyStr, text, beforeHash, method, decode_break, agent);
                    console.log(_Trx);
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
    async createDbCodeTransactionOnserver(userKeyString, handle, tail_tx, type, offset, agent) {
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
            const transaction = this._translate_transaction(data.transaction, agent);
            return transaction;
        }
        catch (error) {
            console.error("Failed to create transaction:", error.message);
            throw error;
        }
    }
    async getByteLength(text) {
        const encoder = new TextEncoder(); // UTF-8로 변환
        const encodedText = encoder.encode(text); // 바이트 배열 생성
        return encodedText.length; // 바이트 배열의 길이 반환
    }
    async emojiToText(message) {
        return message.replace(/([\uD800-\uDBFF][\uDC00-\uDFFF])/g, (match) => {
            const codePoint = match.codePointAt(0).toString(16).toUpperCase();
            return "//".slice(1) + `u${codePoint}`;
        });
    }
    async _getChunk_ForText(message, chunkSize) {
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
    async _send_transaction(connection, transaction, agent) {
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
            }
            catch (err) {
                console.error("Error in _send_transaction:", err);
                return "error";
            }
        }
        else {
            console.error("transaction not found!");
            return "error";
        }
    }
    async textCodeIn(userKeyStr, text, agent) {
        const emoji_text = await this.emojiToText(text);
        const byteLength = await this.getByteLength(emoji_text);
        const textInLimit = 15000;
        const handle = "anonymous"; // edit with twitter api
        if (text === '') {
            return false;
        }
        else if (byteLength > textInLimit) {
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
    async makeTextTransactions(userKeyStr, chunkSize, chunkList, handle = 'anonymous', type = 'image', offset, agent) {
        let beforeHash = "Genesis";
        const totalSteps = chunkSize + 1;
        let current = 0;
        let method = 0;
        let decode_break = 0;
        let i = 0;
        for (let text of chunkList) {
            const _Trx = await this.createSendTransactionOnServer(userKeyStr, text, beforeHash, method, decode_break, agent);
            beforeHash = (await this._send_transaction(agent.connection, _Trx, agent)) || "error";
            await IQOperation.sleep(5000);
            current = current + 1;
        }
        await IQOperation.sleep(1500);
        const DBTrx = await this.createDbCodeTransactionOnserver(userKeyStr, handle, beforeHash, type, offset, agent);
        const resultHash = (await this._send_transaction(agent.connection, DBTrx, agent)) || "error";
        return resultHash;
    }
    async AstralChef(imageUrl, fontSize, density, agent, type) {
        const wallet = new nodewallet_1.default(agent.wallet);
        let chunksInit = [];
        let compressDataChunks = { chunkList: [], chunkSize: 0, merkleRoot: null };
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
        let dataType = type === "image" ? "image" : "text";
        const handle = "anonymous"; // edit with twitter api
        const dbPDACheck = await this.getDBPDA(wallet.payer.publicKey.toBase58());
        const accountInfo = await agent.connection.getAccountInfo(new web3_js_1.PublicKey(dbPDACheck));
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
        }
        else if (dataType === "text") {
            const result = await this.textCodeIn(agent.wallet.publicKey.toBase58(), imageUrl, agent);
            console.log("Signature result: ", result);
            return result;
        }
        return;
    }
}
exports.IQOperation = IQOperation;
IQOperation.PROGRAM_ID = new web3_js_1.PublicKey("FG5nDUjz4S1FBs2rZrXsKsa7J34e21WF17F8nFL9uwWi");
IQOperation.IQ_HOST = 'https://solanacontractapi.uc.r.appspot.com';
IQOperation.GEN_ART_API = "https://iq.newjeans.cloud/convert";
IQOperation.COMPRESS_API = "https://compresspy.fly.dev";
IQOperation.contractChunkSize = 850;
//# sourceMappingURL=iq.operation.js.map
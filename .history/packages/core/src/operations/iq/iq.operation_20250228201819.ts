import {
    Connection,
    PublicKey,
    Keypair,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

import zlib from 'zlib';
import * as Jimp from 'jimp';

export class IQOperation {
    static PROGRAM_ID = new PublicKey("FG5nDUjz4S1FBs2rZrXsKsa7J34e21WF17F8nFL9uwWi");

    public async getImageBufferFromUrl(imageUrl: string): Promise<Buffer> {
        const response = await fetch(imageUrl);
        const imageBuffer = await response.arrayBuffer();
        return Buffer.from(imageBuffer);
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

    public  async compressImageBuffer(imageBuffer: Buffer): Promise<Buffer> {
        const chunkSize = 1024; // Define the size of each chunk
        const chunks: Buffer[] = [];

        for (let i = 0; i < imageBuffer.length; i += chunkSize) {
            const chunk = imageBuffer.subarray(i, i + chunkSize);
            const compressedChunk = await this.compressChunk(Buffer.from(chunk));
            chunks.push(compressedChunk);
        }

        return Buffer.concat(chunks);
    }

    public async compressChunk(chunk: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            zlib.deflate(chunk, (err, compressedChunk) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(compressedChunk);
                }
            });
        });
    }

    /**
     * Inizializza l'utente e crea gli account necessari
     */
    public async userInitialize(
        connection: Connection,
        payer: Keypair
    ) {
        const programId = IQOperation.PROGRAM_ID;

        const [codeAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("seedhere"), payer.publicKey.toBuffer()],
            programId
        );

        const [dbAccountPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from("dbseedhere"), payer.publicKey.toBuffer()],
            programId
        );

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true }, // Utente
                { pubkey: codeAccountPDA, isSigner: false, isWritable: true }, // CodeAccount PDA
                { pubkey: dbAccountPDA, isSigner: false, isWritable: true }, // DBAccount PDA
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // SystemProgram
            ],
            programId,
            data: Buffer.alloc(0), 
        });

        const transaction = new Transaction().add(instruction);
        transaction.feePayer = payer.publicKey;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        transaction.sign(payer);
        const signature = await sendAndConfirmTransaction(connection, transaction, [payer]);

        console.log("[oobe-protocol] - IQ - Transaction successful with signature:", signature);
        return { signature, codeAccountPDA, dbAccountPDA };
    }

    public async getTailTx(connection: Connection, dbAccountPDA: PublicKey) {
        const programData = await connection.getAccountInfo(dbAccountPDA);
        if (!programData) {
            console.log('error: cannot find account');
            return;
        }
        return programData.data;
    }


    /**
     * Invia codice con i parametri richiesti
     */
    public async sendCode(
        connection: Connection,
        payer: Keypair,
        codeAccount: PublicKey,
        code: string,
        beforeTx: string,
        method: number,
        decodeBreak: number
    ) {
        const data = IQOperation.encodeData({ code, beforeTx, method, decodeBreak });

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: codeAccount, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: IQOperation.PROGRAM_ID,
            data,
        });

        return await IQOperation.sendTransaction(connection, payer, instruction);
    }

    /**
     * Registra dati nel DB
     */
    public  async dbCodeIn(
        connection: Connection,
        payer: Keypair,
        dbAccount: PublicKey,
        handle: string,
        tailTx: string,
        typeField: string,
        offset: string
    ) {
        const data = IQOperation.encodeData({ handle, tailTx, typeField, offset });

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: dbAccount, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: IQOperation.PROGRAM_ID,
            data,
        });

        return await IQOperation.sendTransaction(connection, payer, instruction);
    }

    /**
     * Registra dati nel DB gratuitamente
     */
    static async dbCodeInForFree(
        connection: Connection,
        payer: Keypair,
        dbAccount: PublicKey,
        handle: string,
        tailTx: string,
        typeField: string,
        offset: string
    ) {
        const data = this.encodeData({ handle, tailTx, typeField, offset });
        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: dbAccount, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: this.PROGRAM_ID,
            data,
        });

        return await this.sendTransaction(connection, payer, instruction);
    }

    /**
     * Invia una transazione alla blockchain
     */
    private static async sendTransaction(
        connection: Connection,
        payer: Keypair,
        instruction: TransactionInstruction
    ) {
        const transaction = new Transaction().add(instruction);
        const txSignature = await sendAndConfirmTransaction(connection, transaction, [payer]);
        console.log(`✅ Transaction sent: ${txSignature}`);
        return txSignature;
    }

    /**
     * Converte i dati JSON in buffer per il programma Solana
     */
    private static encodeData(data: any): Buffer {
        return Buffer.from(JSON.stringify(data));
    }
}

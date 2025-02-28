import {
    Connection,
    PublicKey,
    Keypair,
    SystemProgram,
    Transaction,
    TransactionInstruction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";

export class IQOperation {
    static PROGRAM_ID = new PublicKey("FG5nDUjz4S1FBs2rZrXsKsa7J34e21WF17F8nFL9uwWi");

    /**
     * Inizializza l'utente e crea gli account necessari
     */
    static async userInitialize(
        connection: Connection,
        payer: Keypair,
        codeAccount: PublicKey,
        dbAccount: PublicKey
    ) {
        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: codeAccount, isSigner: false, isWritable: true },
                { pubkey: dbAccount, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: this.PROGRAM_ID,
            data: Buffer.alloc(0), // Nessun dato richiesto
        });

        return await this.sendTransaction(connection, payer, instruction);
    }

    /**
     * Invia codice con i parametri richiesti
     */
    static async sendCode(
        connection: Connection,
        payer: Keypair,
        codeAccount: PublicKey,
        code: string,
        beforeTx: string,
        method: number,
        decodeBreak: number
    ) {
        const data = this.encodeData({ code, beforeTx, method, decodeBreak });

        const instruction = new TransactionInstruction({
            keys: [
                { pubkey: payer.publicKey, isSigner: true, isWritable: true },
                { pubkey: codeAccount, isSigner: false, isWritable: true },
                { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
            ],
            programId: this.PROGRAM_ID,
            data,
        });

        return await this.sendTransaction(connection, payer, instruction);
    }

    /**
     * Registra dati nel DB
     */
    static async dbCodeIn(
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

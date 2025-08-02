"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTreeManager = void 0;
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
const web3_js_1 = require("@solana/web3.js");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const clearBuffer_1 = require("../utils/clearBuffer");
const default_1 = require("../config/default");
const SmartRoundRobinRPC_1 = require("../utils/SmartRoundRobinRPC");
const kliquidity_sdk_1 = require("@kamino-finance/kliquidity-sdk");
class MerkleTreeManager {
    constructor(agent) {
        this.events = [];
        this.merkleTree = null;
        this.agent = agent;
    }
    addEvent(details) {
        const event = {
            id: `event-${Date.now()}`,
            timestamp: Date.now(),
            details: details,
        };
        this.events.push(event);
        this.updateMerkleTree();
    }
    convertLeafToString(leaf) {
        return leaf; // L'hash è già in formato esadecimale leggibile
    }
    updateMerkleTree() {
        let leaves = this.events.map(event => (0, crypto_js_1.SHA256)(event.details).toString());
        // Aggiungie un nodo fittizio se c'è solo un evento
        if (leaves.length === 1) {
            leaves.push((0, crypto_js_1.SHA256)("dummy").toString());
        }
        this.merkleTree = new merkletreejs_1.MerkleTree(leaves, crypto_js_1.SHA256);
    }
    getMerkleRoot() {
        return this.merkleTree ? this.merkleTree.getRoot().toString('hex') : null;
    }
    getProof(eventDetails) {
        if (!this.merkleTree)
            return null;
        const leaf = (0, crypto_js_1.SHA256)(eventDetails).toString();
        const proof = this.merkleTree.getProof(leaf).map(proof => proof.data.toString('hex'));
        return proof;
    }
    getOriginalDataFromLeaf(leaf) {
        // Cerca l'evento corrispondente al leaf hash
        const event = this.events.find(event => (0, crypto_js_1.SHA256)(event.details).toString() === leaf);
        if (!event) {
            return null;
        }
        try {
            // Converte i dettagli dell'evento in un oggetto JSON
            const originalData = JSON.parse(event.details);
            return originalData;
        }
        catch (error) {
            return null;
        }
    }
    getLeaf(eventDetails) {
        if (!this.merkleTree)
            return null;
        const leaf = (0, crypto_js_1.SHA256)(eventDetails);
        return leaf.toString();
    }
    getEvents() {
        return this.events;
    }
    verifyEvent(eventDetails) {
        if (!this.merkleTree)
            return false;
        const leaf = (0, crypto_js_1.SHA256)(eventDetails).toString();
        const proof = this.merkleTree.getProof(leaf).map(proof => proof.data.toString('hex'));
        //console.log("Verifying Event - Leaf:", leaf); // Logga il nodo
        //console.log("Verifying Event - Proof:", proof); // Logga la proof
        return this.merkleTree.verify(proof, leaf, this.merkleTree.getRoot());
    }
    createMerkle(data) {
        const leaves = data.map((item) => (0, crypto_js_1.SHA256)(item).toString());
        this.merkleTree = new merkletreejs_1.MerkleTree(leaves, crypto_js_1.SHA256);
        return this.merkleTree.getRoot().toString('hex');
    }
    async sendTx(programId, wallet, pda, bump, data_size) {
        const dataBuffer = Buffer.alloc(5); // Allocate a buffer of 5 bytes
        dataBuffer.writeUInt8(0, 0); // First byte is the instruction identifier (0 for initialization)
        dataBuffer.writeUInt32LE(data_size, 1); // Next 4 bytes are the data size in little-endian format
        const tx = new web3_js_1.Transaction().add(new web3_js_1.TransactionInstruction({
            keys: [
                {
                    pubkey: wallet,
                    isSigner: true,
                    isWritable: true,
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true,
                },
                {
                    pubkey: web3_js_1.SYSVAR_RENT_PUBKEY,
                    isSigner: false,
                    isWritable: false,
                },
                {
                    pubkey: web3_js_1.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false,
                },
            ],
            data: dataBuffer,
            programId: programId,
        }));
        return tx;
    }
    async onChainPDAPersonality(wallet, connection) {
        const programId = new web3_js_1.PublicKey("11111111111111111111111111111111");
        const personalitySeed = "personality";
        const rpcClient = new SmartRoundRobinRPC_1.SolanaRpcClient();
        const [DB, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${personalitySeed}_db` + wallet.toBase58()).toString().slice(0, 32), 'hex')], programId);
        const [ROOT, _bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${personalitySeed}_root` + wallet.toBase58()).toString().slice(0, 32), 'hex')], programId);
        let root_pda = ROOT;
        let db_pda = DB;
        if (!root_pda) {
            // Create and derive the PDAs allocating space
            const data_size = 1024;
            const tx = await this.sendTx(programId, wallet, root_pda, bump, data_size);
            const latestBlockhash = await new SmartRoundRobinRPC_1.SolanaRpcClient().getLatestBlockhash();
            tx.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;
            tx.feePayer = wallet;
            const signer = new nodewallet_1.default(this.agent.wallet).payer;
            tx.partialSign(signer);
            const serializedTransaction = tx.serialize({ requireAllSignatures: false });
            await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });
        }
        if (!db_pda) {
            // Create and derive the PDAs allocating space
            const data_size = 1024;
            const tx = await this.sendTx(programId, wallet, db_pda, bump, data_size);
            const latestBlockhash = await new SmartRoundRobinRPC_1.SolanaRpcClient().getLatestBlockhash();
            tx.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;
            tx.feePayer = wallet;
            const signer = new nodewallet_1.default(this.agent.wallet).payer;
            tx.partialSign(signer);
            const serializedTransaction = tx.serialize({ requireAllSignatures: false });
            await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });
        }
        return {
            personalityROOT_PDA: root_pda,
            personalityDB_PDA: db_pda,
        };
    }
    async onChainPDAccounts(wallet, custom, connection) {
        const programId = new web3_js_1.PublicKey("11111111111111111111111111111111");
        const { merkleDbSeed, merkleRootSeed } = custom || new default_1.ConfigManager().getDefaultConfig();
        const rpcClient = new SmartRoundRobinRPC_1.SolanaRpcClient();
        const [LeafPDA, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleDbSeed}@` + wallet.toBase58()).toString().slice(0, 32), 'hex')], programId);
        const [RootPDA, bumpRoot] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleRootSeed}@` + wallet.toBase58()).toString().slice(0, 32), 'hex')], programId);
        //console.log("Bump:", bump);
        //console.log("Bump Root:", bumpRoot);
        let leaf = LeafPDA;
        let root = RootPDA;
        if (!leaf || !root) {
            // Create and derive the PDAs allocating space
            const data_size = 1024;
            const txLeaf = await this.sendTx(programId, wallet, LeafPDA, bump, data_size);
            const txRoot = await this.sendTx(programId, wallet, RootPDA, bumpRoot, data_size);
            const latestBlockhash = await new SmartRoundRobinRPC_1.SolanaRpcClient().getLatestBlockhash();
            txLeaf.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;
            txLeaf.feePayer = wallet;
            const signer = new nodewallet_1.default(this.agent.wallet).payer;
            txLeaf.partialSign(signer);
            const serializedTransaction = txLeaf.serialize({ requireAllSignatures: false });
            await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });
            await (0, kliquidity_sdk_1.sleep)(2000);
            const _latestBlockhash = await new SmartRoundRobinRPC_1.SolanaRpcClient().getLatestBlockhash();
            txRoot.recentBlockhash = typeof _latestBlockhash === 'string' ? _latestBlockhash : _latestBlockhash.blockhash;
            txRoot.feePayer = wallet;
            txRoot.partialSign(signer);
            const serializedTxRoot = txRoot.serialize({ requireAllSignatures: false });
            await rpcClient.sendRawTransaction(serializedTxRoot, { skipPreflight: true, preflightCommitment: 'processed' });
        }
        return {
            dbAccountStore: LeafPDA,
            dbAccountRoot: RootPDA,
        };
    }
    async sendCustomDataTx(wallet, data, connection, pda, signer) {
        const rpcClient = new SmartRoundRobinRPC_1.SolanaRpcClient();
        const instruction = web3_js_1.SystemProgram.transfer({
            fromPubkey: wallet,
            toPubkey: pda,
            lamports: 0, // No lamports transferred, just storing data
        });
        //console.log("data bytes:", data.length);
        const memoInstruction = new web3_js_1.TransactionInstruction({
            keys: [{ pubkey: wallet, isSigner: true, isWritable: false }],
            programId: raydium_sdk_v2_1.MEMO_PROGRAM_ID,
            data, // Ensure data is a UTF-8 encoded string
        });
        const transaction = new web3_js_1.Transaction().add(web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({ units: 600000 }), web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }), // Add priority fees
        instruction, memoInstruction);
        const nodeWallet = new nodewallet_1.default(this.agent.wallet).payer;
        transaction.feePayer = nodeWallet.publicKey;
        const latestBlockhash = await rpcClient.getLatestBlockhash();
        transaction.recentBlockhash = typeof latestBlockhash !== 'string' ? latestBlockhash.blockhash : latestBlockhash;
        try {
            const signature = await connection.sendTransaction(transaction, [signer], {
                skipPreflight: false,
                preflightCommitment: 'processed',
            });
            return signature;
        }
        catch (e) {
            const message = e.message || '';
            const match = message.match(/signature: '([a-zA-Z0-9]+)'/);
            if (match)
                return match[1];
            throw e;
        }
    }
    calculateChunksFromBuffer(buffer, minChunkSize = 1, maxChunkSize = 1231) {
        const adjustedMaxChunkSize = maxChunkSize - 64; // Adjust max chunk size for all chunks except the last
        const chunks = [];
        let currentChunkSize = minChunkSize;
        for (let i = 0; i < buffer.length; i += currentChunkSize) {
            const remainingBytes = buffer.length - i;
            if (remainingBytes <= maxChunkSize) {
                // For the last chunk, use the normal max chunk size
                currentChunkSize = Math.min(Math.max(minChunkSize, remainingBytes), maxChunkSize);
            }
            else {
                // For all other chunks, use the adjusted max chunk size
                currentChunkSize = Math.min(Math.max(minChunkSize, remainingBytes), adjustedMaxChunkSize);
            }
            const chunk = buffer.subarray(i, i + currentChunkSize);
            chunks.push(chunk);
        }
        const totalBytes = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
        return chunks;
    }
    async onChainMerklePersonalityInscription(data) {
        const connection = this.agent.connection;
        const wallet = this.agent.wallet.publicKey;
        const { personalityDB_PDA, personalityROOT_PDA } = await this.onChainPDAPersonality(wallet, connection);
        if (!personalityDB_PDA || !personalityROOT_PDA) {
            return;
        }
        const { input, result } = data.merkleLeaf;
        const compressedEvent = data.merkleEvents;
        if (!input || !result || !compressedEvent) {
            return;
        }
        const _zeroChunk = Buffer.alloc(128); // Allocate a buffer of 64 bytes
        Buffer.from(input, 'hex').copy(_zeroChunk, 0); // Copy the 32-byte act hash into the first half
        Buffer.from(result, 'hex').copy(_zeroChunk, 64); // Copy the 32-byte res hash into the second half
        const _events = (0, clearBuffer_1.trimTrailingZeros)(Buffer.from(compressedEvent, 'utf-8'));
        const totalChunks = this.calculateChunksFromBuffer(_events, 1, 560);
        const chunks = [...totalChunks, _zeroChunk];
        let prevSign = null;
        let zeroChunkSign = null;
        // Process each chunk in the transaction chain
        for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
            const isFirstChunk = index === 0;
            const isLastChunk = index === chunks.length - 1;
            let _tx;
            if (isFirstChunk && !isLastChunk && chunks.length >= 2) {
                _tx = await this.sendCustomDataTx(wallet, chunk, connection, personalityDB_PDA, this.agent.wallet);
                prevSign = _tx; // Remember this signature for linking the next chunk
            }
            if (isLastChunk && !isFirstChunk && prevSign) {
                Buffer.from(prevSign ?? '', 'hex').copy(_zeroChunk, 64); // th
                const act = chunk.subarray(0, 32);
                const res = chunk.subarray(64, 96);
                const tx = await this.sendCustomDataTx(wallet, Buffer.from(act.toString('hex') + '|' + res.toString('hex') + '|' + prevSign?.toString()), connection, personalityDB_PDA, this.agent.wallet);
                prevSign = tx; // Update prevSign to current chunk's signature
                zeroChunkSign = tx; // Store the signature of the last chunk
            }
            else if (!isFirstChunk && !isLastChunk && prevSign) {
                const combinedIntermediateBuffer = Buffer.alloc(chunk.length + 64);
                chunk.copy(combinedIntermediateBuffer, chunk.length);
                Buffer.from(prevSign ?? '', 'hex').copy(combinedIntermediateBuffer, 64);
                if (chunks.length <= 1) {
                    _tx = await this.sendCustomDataTx(wallet, chunk, connection, personalityDB_PDA, this.agent.wallet);
                    prevSign = _tx;
                }
                else {
                    const tx = await this.sendCustomDataTx(wallet, Buffer.from(prevSign + '|' + chunk.toString('utf-8')), connection, personalityDB_PDA, this.agent.wallet);
                    prevSign = tx; // Update prevSign to current chunk's signature
                }
            }
        }
        const signatureRoot = await this.sendCustomDataTx(wallet, Buffer.from(JSON.stringify({ root: data.merkleRoot, proofSignature: zeroChunkSign })), connection, personalityROOT_PDA, this.agent.wallet);
        return {
            personalityDB_PDA,
            zeroChunkSign,
            signatureRoot,
            merkleRoot: data.merkleRoot,
            merkleProof: data.merkleProof,
            merkleLeaf: data.merkleLeaf,
            merkleEvents: data.merkleEvents,
        };
    }
    /**
     * @name onChainMerkleInscription
     * @description This function is used to store the Merkle data on-chain.
     * @param data - The MerkleValidatorResult containing the merkle leaf, events, root, and proof.
     * @param pdas - The PDA accounts to use for the inscription. [optional]
     */
    async onChainMerkleInscription(data, pdas) {
        const connection = this.agent.connection;
        const wallet = this.agent.wallet.publicKey;
        //check if the wallet have the DB account to store the events and check if the wallet have the DB account to store the signature of the events trx and the root merkle
        const { dbAccountStore, dbAccountRoot } = pdas || await this.onChainPDAccounts(wallet);
        if (!dbAccountStore || !dbAccountRoot) {
            return;
        }
        const { input, result } = data.merkleLeaf;
        const compressedEvent = data.merkleEvents;
        if (!input || !result || !compressedEvent) {
            return;
        }
        const _zeroChunk = Buffer.alloc(128); // Allocate a buffer of 64 bytes
        Buffer.from(input, 'hex').copy(_zeroChunk, 0); // Copy the 32-byte act hash into the first half
        Buffer.from(result, 'hex').copy(_zeroChunk, 64); // Copy the 32-byte res hash into the second half
        // Codifica compressedEvent in formato binario (Base64)
        // console.log("[BEFORE] - TOTAL EVENTS BYTES:", _events.length);
        // console.log("[BEFORE] - TOTAL EVENTS:", _events);
        // console.log("[BEFORE] - TOTAL ZERO CHUNK BYTES:", _zeroChunk.length);
        // console.log("[BEFORE] - Zero chunk init length:", _zeroChunk.toString('hex'));
        // console.log("[BEFORE] - Init Events total chunk size:", _events.toString('hex'));
        const _events = (0, clearBuffer_1.trimTrailingZeros)(Buffer.from(compressedEvent, 'utf-8'));
        // const offset = _events.length;
        const totalChunks = this.calculateChunksFromBuffer(_events, 1, 560);
        // console.log("[after chunk buffer] - Zero chunk length:", `${zeroChunk.length}`, ' chunkInsideSize:', `${zeroChunk.map(chunk => chunk.length)}`);
        // console.log("[after chunk buffer] - Total chunk length:", `${totalChunks.length}`, ' chunkInsideSize:', `${totalChunks.map(chunk => chunk.length)}`);
        const chunks = [...totalChunks, _zeroChunk];
        let prevSign = null;
        let zeroChunkSign = null;
        // Process each chunk in the transaction chain
        for (let index = 0; index < chunks.length; index++) {
            const chunk = chunks[index];
            const isFirstChunk = index === 0;
            const isLastChunk = index === chunks.length - 1;
            let _tx;
            if (isFirstChunk && !isLastChunk && chunks.length >= 2) {
                _tx = await this.sendCustomDataTx(wallet, chunk, connection, dbAccountStore, this.agent.wallet);
                // Simulate the transaction with the first chunk
                //console.log("First chunk data:", firstChunkStruct, "Signature:", _tx);
                // For the first chunk, no prevSign reference needed.
                prevSign = _tx; // Remember this signature for linking the next chunk
            }
            if (isLastChunk && !isFirstChunk && prevSign) {
                // Last chunk: attach the previous transaction's signature (prevSign)
                Buffer.from(prevSign ?? '', 'hex').copy(_zeroChunk, 64); // th
                const act = chunk.subarray(0, 32);
                const res = chunk.subarray(64, 96);
                // console.log("Last chunk data -", "Signature:", prevSign);
                const tx = await this.sendCustomDataTx(wallet, Buffer.from(act.toString('hex') + '|' + res.toString('hex') + '|' + prevSign?.toString()), connection, dbAccountStore, this.agent.wallet);
                prevSign = tx; // Update prevSign to current chunk's signature
                zeroChunkSign = tx; // Store the signature of the last chunk
            }
            else if (!isFirstChunk && !isLastChunk && prevSign) {
                const combinedIntermediateBuffer = Buffer.alloc(chunk.length + 64);
                chunk.copy(combinedIntermediateBuffer, chunk.length);
                Buffer.from(prevSign ?? '', 'hex').copy(combinedIntermediateBuffer, 64);
                // Intermediate chunks: link to the previous chunk's signature
                if (chunks.length <= 1) {
                    _tx = await this.sendCustomDataTx(wallet, chunk, connection, dbAccountStore, this.agent.wallet);
                    prevSign = _tx;
                }
                else {
                    const tx = await this.sendCustomDataTx(wallet, Buffer.from(prevSign + '|' + chunk.toString('utf-8')), connection, dbAccountStore, this.agent.wallet);
                    prevSign = tx; // Update prevSign to current chunk's signature
                }
            }
        }
        const signatureRoot = await this.sendCustomDataTx(wallet, Buffer.from(JSON.stringify({ root: data.merkleRoot, proofSignature: zeroChunkSign })), connection, dbAccountRoot, this.agent.wallet);
        return {
            dbAccountStore,
            dbAccountRoot,
            zeroChunkSign,
            signatureRoot,
            merkleRoot: data.merkleRoot,
            merkleProof: data.merkleProof,
            merkleLeaf: data.merkleLeaf,
            merkleEvents: data.merkleEvents,
        };
    }
}
exports.MerkleTreeManager = MerkleTreeManager;
//# sourceMappingURL=merkle.operation.js.map
"use strict";
/**
 * @title OobePdaTransactionManager
 * @description A modular and reusable class to manage user PDA transactions and extract structured memo data
 *              from a custom Merkle-based storage system on Solana, designed for the OOBE protocol.
 * @author OOBE
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OobePdaTransactionManager = void 0;
const web3_js_1 = require("@solana/web3.js");
const default_1 = require("../config/default");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const crypto_js_1 = require("crypto-js");
const clearBuffer_1 = require("../utils/clearBuffer");
class OobePdaTransactionManager {
    constructor(agentAdd, connection) {
        this.config = new default_1.ConfigManager().getDefaultConfig();
        this.agentAdd = new web3_js_1.PublicKey(agentAdd);
        this.connection = connection;
    }
    /**
     * @returns {LeafPDA, RootPDA} - PDAs derived using Merkle DB and Root seed
     */
    getUserPDAs() {
        const wallet = this.agentAdd;
        const { merkleDbSeed, merkleRootSeed } = this.config;
        const [LeafPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleDbSeed}@${wallet.toBase58()}`).toString().slice(0, 32), "hex")], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
        const [RootPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleRootSeed}@${wallet.toBase58()}`).toString().slice(0, 32), "hex")], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
        return { LeafPDA, RootPDA };
    }
    /**
     * @param pda PublicKey of the Root PDA
     * @returns Filtered transactions with valid memo fields
     */
    async getRootTransactions(pda) {
        const signatures = await this.connection.getSignaturesForAddress(pda);
        return signatures.filter((sig) => sig.signature && sig.memo !== null);
    }
    /**
     * @param pda PublicKey of the Leaf PDA
     * @param transactionsRoot Transactions coming from the RootPDA
     * @returns Structured transaction objects with ZeroChunk memo structure
     */
    async getStructuredDbTransactions(pda, transactionsRoot) {
        const signatures = await this.connection.getSignaturesForAddress(pda);
        const signToDecode = signatures
            .filter((sig) => sig.signature && sig.memo)
            .map((sig) => ({
            ...sig,
            memo: sig.memo ? (0, clearBuffer_1.trimTrailingZeros)(Buffer.from(sig.memo)).toString("utf-8") : null,
        }));
        const ZeroTransactionsRecorded = signToDecode.filter((sig) => {
            if (!sig.memo)
                return false;
            const cleaned = sig.memo.replace(/^\[\d+\]\s*/, "").replace(/\\|\s+/g, "");
            const parts = cleaned.split("|");
            return parts.length === 3 && parts[0].length === 64 && parts[1].length === 64 && parts[2].length >= 64;
        }).map((sig) => {
            const [leaf1, leaf2, prevSign] = sig.memo.replace(/^\[\d+\]\s*/, "").split("|");
            return {
                ...sig,
                memo: { leaf1, leaf2, prevSign },
            };
        });
        const finalMatches = [];
        for (const root of transactionsRoot) {
            if (!root.memo)
                continue;
            const parsedRootMemo = JSON.parse(root.memo);
            if (!parsedRootMemo.proofSignature)
                continue;
            const match = ZeroTransactionsRecorded.find((tx) => {
                if (typeof tx.memo === "object") {
                    return tx.signature === parsedRootMemo.proofSignature;
                }
                return false;
            });
            if (match) {
                finalMatches.push({
                    root: parsedRootMemo.root,
                    proofSignature: parsedRootMemo.proofSignature,
                    transaction: match,
                });
            }
        }
        return finalMatches;
    }
    /**
     * @param transactions List of structured transactions from DB
     * @returns Enriched transactions with the first chunk of content
     */
    async fetchDbContent(transactions) {
        return await Promise.all(transactions.map(async (_tx) => {
            const firstSignature = _tx.transaction.memo.prevSign;
            const parsed = await this.connection.getParsedTransaction(firstSignature, { commitment: "finalized" });
            let firstContent = null;
            if (parsed) {
                const logMessage = parsed.meta?.logMessages?.find((msg) => msg.includes("Program log: Memo"));
                if (logMessage) {
                    const rep = logMessage.replace(/Program log: Memo \(len \d+\): /, "");
                    const [prev_chunk_sign, content] = rep.split("|");
                    firstContent = {
                        prev_chunk_sign: prev_chunk_sign.replace(/^"/, ""),
                        content,
                    };
                }
            }
            return {
                ..._tx,
                firstChunkContent: firstContent,
            };
        }));
    }
    /**
     * Recursively walks through memo chunks following `prev_chunk_sign`
     * @param transactions Enriched transactions with firstChunkContent
     * @returns Full content for each transaction reconstructed from memo chunks
     */
    async resolveMemoChunks(transactions) {
        return await Promise.all(transactions.map(async (tx) => {
            const { prev_chunk_sign, content } = tx.firstChunkContent;
            const chunks = [{ prev_chunk_sign, content }];
            let prevSign = prev_chunk_sign;
            while (prevSign) {
                const parsed = await this.connection.getParsedTransaction(prevSign, { commitment: "finalized" });
                if (!parsed)
                    break;
                const logMessage = parsed.meta?.logMessages?.find((msg) => msg.includes("Program log: Memo"));
                if (!logMessage)
                    break;
                const [prev_chunk_sign, content] = logMessage.replace(/Program log: Memo \(len \d+\): /, "").split("|");
                chunks.push({ prev_chunk_sign, content });
                if (!prev_chunk_sign)
                    break;
                prevSign = prev_chunk_sign;
            }
            const finalContent = chunks.reverse().map(c => c.content).join("");
            tx.cycledContent = [{ result: finalContent }, ...chunks.reverse()];
            return tx;
        }));
    }
}
exports.OobePdaTransactionManager = OobePdaTransactionManager;
//# sourceMappingURL=PDAManager.js.map
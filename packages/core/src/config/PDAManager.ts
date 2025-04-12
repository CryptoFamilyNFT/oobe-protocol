/**
 * @title OobePdaTransactionManager
 * @description A modular and reusable class to manage user PDA transactions and extract structured memo data
 *              from a custom Merkle-based storage system on Solana, designed for the OOBE protocol.
 * @author OOBE
 */

import { ConfirmedSignatureInfo, Connection, PublicKey } from "@solana/web3.js";
import { Agent } from "../agent/Agents";
import { ConfigManager } from "../config/default";
import { SYSTEM_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";
import { SHA256 } from "crypto-js";
import { trimTrailingZeros } from "../utils/clearBuffer";
import { ZeroChunk } from "../operations/merkle.operation";

export class OobePdaTransactionManager {
    private agentAdd: PublicKey;
    private connection: Connection;
    private config = new ConfigManager().getDefaultConfig();

    constructor(agentAdd: string, connection: Connection) {
        this.agentAdd = new PublicKey(agentAdd);
        this.connection = connection;
    }

    /**
     * @returns {LeafPDA, RootPDA} - PDAs derived using Merkle DB and Root seed
     */
    public getUserPDAs() {
        const wallet = this.agentAdd;
        const { merkleDbSeed, merkleRootSeed } = this.config;

        const [LeafPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(SHA256(`${merkleDbSeed}@${wallet.toBase58()}`).toString().slice(0, 32), "hex")],
            SYSTEM_PROGRAM_ID
        );

        const [RootPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(SHA256(`${merkleRootSeed}@${wallet.toBase58()}`).toString().slice(0, 32), "hex")],
            SYSTEM_PROGRAM_ID
        );

        return { LeafPDA, RootPDA };
    }

    FindParsedOutputTransaction(signatures: ConfirmedSignatureInfo[]) {
        const transactions = signatures.map((signature) => {
            const decodedMemo = signature.memo
    
            return {
                ...signature,
                memo: decodedMemo,
            }
        });
    
        return transactions;
    }

    /**
     * @param pda PublicKey of the Root PDA
     * @returns Filtered transactions with valid memo fields
     */
    public async getRootTransactions(pda: PublicKey): Promise<ConfirmedSignatureInfo[]> {
        const signatures = await this.connection.getSignaturesForAddress(pda);
        return signatures.filter((sig) => sig.signature && sig.memo !== null);
    }

    /**
     * @param pda PublicKey of the Leaf PDA
     * @param transactionsRoot Transactions coming from the RootPDA
     * @returns Structured transaction objects with ZeroChunk memo structure
     */
    public async getStructuredDbTransactions(pda: PublicKey, transactionsRoot: ConfirmedSignatureInfo[]) {
        const signatures = await this.connection.getSignaturesForAddress(pda);

        const filteredSignatures = signatures.filter((sig) => {
            const isValid = sig.signature && sig.memo !== null;
            return isValid;
        });

        const signToDecode = filteredSignatures.map((sig) => {
            const decodedMemo = sig.memo ? trimTrailingZeros(Buffer.from(sig.memo)).toString("utf-8") : null;
            return {
                ...sig,
                memo: decodedMemo,
            };
        });

        const decodedSigns = this.FindParsedOutputTransaction(signToDecode);

        const ZeroTransactionsRecorded = decodedSigns.filter((sig) => {
            if (sig.memo) {
                const memoContent = sig.memo.replace(/^\[\d+\]\s*/, "");
                sig.memo = memoContent;

                const cleanedMemoContent = memoContent.replace(/\\|\s+/g, "");
                console.log("[DB] - Cleaned Memo Content:", cleanedMemoContent);

                const memoParts = cleanedMemoContent.split("|");
                const isValidMemo = memoParts.length === 3 &&
                    memoParts[0].length === 64 &&
                    memoParts[1].length === 64 &&
                    memoParts[2].length >= 64;

                return isValidMemo;
            }
            return false;
        });

        const _0transactions = ZeroTransactionsRecorded.map((sig) => {
            if (!sig.memo) {
                return sig;
            }
            const memoParts = sig.memo.split("|");
            return {
                ...sig,
                memo: {
                    leaf1: memoParts[0],
                    leaf2: memoParts[1],
                    prevSign: memoParts[2],
                } as ZeroChunk,
            };
        });

        console.log("[DB] - Parsed Zero Transactions:", _0transactions);

        const tupleFinalTreeTransactions: Array<{
            root: string;
            proofSignature: string;
            transaction: typeof _0transactions[0];
        }> = [];

        transactionsRoot.forEach((_root) => {
            if (!_root.memo) {
                console.log("\x1b[33m%s\x1b[0m", "[DB] - Skipping root without memo:", _root);
                return;
            }
            const rootMemo = JSON.parse(_root.memo);
            console.log("[DB] - Parsed Root Memo:", rootMemo);

            if (!rootMemo.proofSignature) {
                console.log("\x1b[33m%s\x1b[0m", "[DB] - Skipping root without proofSignature:", rootMemo);
                return;
            }
            const { root, proofSignature } = rootMemo;

            const matchingTransaction = _0transactions.find((transaction) => {
                if (!transaction.memo) {
                    console.log("\x1b[31m%s\x1b[0m", "[DB] - Skipping transaction without memo:", transaction);
                    return false;
                }
                if (typeof transaction.memo !== "string") {
                    const isMatch = transaction.signature === proofSignature;
                    console.log("\x1b[31m%s\x1b[0m", "[DB] - Checking transaction match:", transaction.signature, "Proof Signature:", proofSignature, "Match:", isMatch);
                    return isMatch;
                }
                return false;
            });

            if (matchingTransaction) {
                console.log("\x1b[31m%s\x1b[0m", "[DB] - Matching Transaction Found:", matchingTransaction);
                tupleFinalTreeTransactions.push({
                    root: root,
                    proofSignature: proofSignature,
                    transaction: matchingTransaction,
                });
            }
        });

        console.log("\x1b[32m%s\x1b[0m", "[DB] - Final Tuple Tree Transactions:", tupleFinalTreeTransactions);
        return tupleFinalTreeTransactions;
    }

    /**
     * @param transactions List of structured transactions from DB
     * @returns Enriched transactions with the first chunk of content
     */
    public async fetchDbContent(transactions: any[]) {
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
    public async resolveMemoChunks(transactions: any[]) {
        return await Promise.all(transactions.map(async (tx) => {
            const { prev_chunk_sign, content } = tx.firstChunkContent;
            const chunks: any[] = [{ prev_chunk_sign, content }];
            let prevSign = prev_chunk_sign;

            while (prevSign) {
                const parsed = await this.connection.getParsedTransaction(prevSign, { commitment: "finalized" });
                if (!parsed) break;

                const logMessage = parsed.meta?.logMessages?.find((msg) => msg.includes("Program log: Memo"));
                if (!logMessage) break;

                const [prev_chunk_sign, content] = logMessage.replace(/Program log: Memo \(len \d+\): /, "").split("|");
                chunks.push({ prev_chunk_sign, content });

                if (!prev_chunk_sign) break;
                prevSign = prev_chunk_sign;
            }

            const finalContent = chunks.reverse().map(c => c.content).join("");
            tx.cycledContent = [{ result: finalContent }, ...chunks.reverse()];
            return tx;
        }));
    }
}

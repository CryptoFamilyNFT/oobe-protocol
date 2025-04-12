"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroCombineFetcher = void 0;
const web3_js_1 = require("@solana/web3.js");
const default_1 = require("../config/default");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const crypto_js_1 = require("crypto-js");
const clearBuffer_1 = require("../utils/clearBuffer");
const SmartRoundRobinRPC_1 = require("../utils/SmartRoundRobinRPC");
// Class to handle PDA operations
class PDAManager {
    constructor(agenWallett) {
        this.wallet = agenWallett;
        this.configManager = new default_1.ConfigManager();
    }
    getUserPDAs() {
        const { merkleDbSeed, merkleRootSeed } = this.configManager.getDefaultConfig();
        // Get the PDA for the user
        const [LeafPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleDbSeed}@${this.wallet.toBase58()}`).toString().slice(0, 32), 'hex')], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
        const [RootPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleRootSeed}@${this.wallet.toBase58()}`).toString().slice(0, 32), 'hex')], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
        return {
            LeafPDA,
            RootPDA,
        };
    }
}
// Class to handle transaction parsing logic
class TransactionParser {
    static findParsedOutputTransaction(signatures) {
        return signatures.map((signature) => {
            const decodedMemo = signature.memo;
            return {
                ...signature,
                memo: decodedMemo,
            };
        });
    }
    static async getAllTransactionsFromPDAAccountDb(connection, pda, transactionsRoot) {
        const signatures = await connection.getSignaturesForAddress(pda);
        const filteredSignatures = signatures.filter((sig) => {
            const isValid = sig.signature && sig.memo !== null;
            return isValid;
        });
        const signToDecode = filteredSignatures.map((sig) => {
            const decodedMemo = sig.memo ? (0, clearBuffer_1.trimTrailingZeros)(Buffer.from(sig.memo)).toString('utf-8') : null;
            return {
                ...sig,
                memo: decodedMemo,
            };
        });
        const decodedSigns = this.findParsedOutputTransaction(signToDecode);
        const ZeroTransactionsRecorded = decodedSigns.filter((sig) => {
            if (sig.memo) {
                const memoContent = sig.memo.replace(/^\[\d+\]\s*/, '');
                sig.memo = memoContent;
                const cleanedMemoContent = memoContent.replace(/\\|\s+/g, '');
                const memoParts = cleanedMemoContent.split('|');
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
            const memoParts = sig.memo.split('|');
            return {
                ...sig,
                memo: {
                    leaf1: memoParts[0],
                    leaf2: memoParts[1],
                    prevSign: memoParts[2],
                },
            };
        });
        const tupleFinalTreeTransactions = [];
        transactionsRoot.forEach((_root) => {
            if (!_root.memo) {
                return;
            }
            const rootMemo = JSON.parse(_root.memo);
            const { root, proofSignature } = rootMemo;
            const matchingTransaction = _0transactions.find((transaction) => {
                if (!transaction.memo) {
                    return false;
                }
                if (typeof transaction.memo !== 'string') {
                    const isMatch = transaction.signature === proofSignature;
                    return isMatch;
                }
                return false;
            });
            if (matchingTransaction) {
                tupleFinalTreeTransactions.push({
                    root: root,
                    proofSignature: proofSignature,
                    transaction: matchingTransaction,
                });
            }
        });
        return tupleFinalTreeTransactions;
    }
    static async getAllTransactionsFromPDAAccountRoot(connection, pda) {
        const signatures = await connection.getSignaturesForAddress(pda);
        const filteredSignatures = signatures.filter((sig) => sig.signature && sig.memo !== null);
        const RootTransactionDecoded = filteredSignatures.filter((sig) => {
            if (sig.memo) {
                const memoContent = sig.memo.replace(/^\[\d+\]\s*/, '');
                sig.memo = memoContent;
                const cleanedMemoContent = memoContent.replace(/\\|\s+/g, '');
                return true;
            }
            return false;
        });
        return RootTransactionDecoded;
    }
}
// Class for content fetching logic
class ContentFetcher {
    static async parseTxDt(parsedTransactionData) {
        const parsed = JSON.parse(parsedTransactionData);
        return parsed.result;
    }
    static async dbContentFetcher(connection, transactions) {
        const trackedContent = await Promise.all(transactions.map(async (_tx) => {
            const memoContentFirsrSign = _tx.transaction.memo.prevSign;
            const parsedTransactionData = await (0, SmartRoundRobinRPC_1.getParsedTransaction)(memoContentFirsrSign);
            const firstTransactionData = await this.parseTxDt(parsedTransactionData).then((tx) => {
                if (!tx) {
                    return null;
                }
                if (tx) {
                    const logMessage = tx.meta?.logMessages?.find((msg) => msg.includes('Program log: Memo'));
                    if (logMessage && logMessage !== undefined) {
                        const rep_d = logMessage.replace(/Program log: Memo \(len \d+\): /, '');
                        const parsedData = rep_d.split('|');
                        const dataParsed = {
                            prev_chunk_sign: parsedData[0].replace(/^"/, ''),
                            content: parsedData[1],
                        };
                        return dataParsed;
                    }
                }
                return null;
            });
            return {
                ..._tx,
                firstChunkContent: firstTransactionData,
            };
        }));
        return trackedContent.filter((t) => t.firstChunkContent !== null);
    }
    static async catchMemoGetContent(connection, transactions) {
        const txsCycled = await Promise.all(transactions.map(async (transaction) => {
            const { prev_chunk_sign: prevContentSign, content } = transaction.firstChunkContent;
            const allSignsAndContent = [{ prev_chunk_sign: prevContentSign, content }];
            let prevSign = prevContentSign;
            for (; prevSign;) {
                const parsedTransaction = await this.parseTxDt(await (0, SmartRoundRobinRPC_1.getParsedTransaction)(prevSign));
                if (!parsedTransaction)
                    break;
                const logMessage = parsedTransaction.meta?.logMessages?.find((msg) => msg.includes("Program log: Memo"));
                if (!logMessage)
                    break;
                const memoData = logMessage.replace(/Program log: Memo \(len \d+\): /, "").split("|");
                const dataParsed = {
                    prev_chunk_sign: memoData[0].replace(/^"/, ''),
                    content: memoData[1],
                };
                if (memoData.length === 1) {
                    const chunkFirstLast = {
                        prevSign: null,
                        content: typeof memoData[1] === 'string'
                            ? memoData[0].replace(/^"|"$/g, '').replace(/\\+/g, '')
                            : memoData[0],
                    };
                    allSignsAndContent.push({ prev_chunk_sign: chunkFirstLast.prevSign, content: chunkFirstLast.content });
                    break;
                }
                const { prev_chunk_sign, content } = dataParsed;
                allSignsAndContent.push({ prev_chunk_sign, content });
                prevSign = prev_chunk_sign; // Update `prevSign` for the next cycle
            }
            const cleanAllContentSigns = allSignsAndContent.map((sign) => {
                const { prev_chunk_sign, content } = sign;
                return {
                    ...sign,
                    prev_chunk_sign: prev_chunk_sign ? prev_chunk_sign.replace(/^"/, '').replace(/\\+/g, '') : null,
                    content: typeof content === 'string'
                        ? content.replace(/^"|"$/g, '').replace(/\\+/g, '')
                        : content,
                };
            });
            cleanAllContentSigns.unshift({
                leaf1: transaction.transaction.memo.leaf1,
                leaf2: transaction.transaction.memo.leaf2,
                prevSign: transaction.transaction.memo.prevSign,
            });
            const contentFinal = cleanAllContentSigns.reduce((chunk, val) => {
                if (val.content) {
                    chunk = val.content + chunk;
                }
                return chunk;
            }, '');
            cleanAllContentSigns.unshift({
                result: contentFinal
            });
            // Add the final array to the transaction object
            transaction.cycledContent = cleanAllContentSigns.reverse();
            return transaction;
        }));
        return txsCycled.filter((t) => t.cycledContent !== null);
    }
}
/**
 * @module ZeroCombineFetcher
 * @description: Fetches and processes transactions from a PDA account. Used for Agentic Actions.
 * @author: OOBE
 * @param agentWallet: PublicKey - The wallet address of the agent.
 * @param connection: Connection - The Solana connection object.
 * @returns FinalTransactions - The processed transactions categorized into messages and tools.
 */
class ZeroCombineFetcher {
    constructor(agentWallet, connection) {
        this.agentWallet = agentWallet;
        this.connection = connection;
    }
    async execute() {
        /**
         * init PDAManager and get user PDAs
         * @param agentWallet: PublicKey - The wallet address of the agent.
         */
        const pdaManager = new PDAManager(this.agentWallet);
        const userPdas = pdaManager.getUserPDAs();
        /**
         * Get filtered transactions from the Root PDA
         * @param pda: PublicKey - The PDA address of the Root PDA.
         * @returns transactionsRoot: ConfirmedSignatureInfo[] - Filtered transactions from the Root PDA.
         */
        const transactionsRoot = await TransactionParser.getAllTransactionsFromPDAAccountRoot(this.connection, userPdas.RootPDA);
        /**
         * Get filtered transactions from the DB PDA
         * @param pda: PublicKey - The PDA address of the DB PDA.
         * @returns transactionsDb: ConfirmedSignatureInfo[] - Filtered transactions from the DB PDA.
         */
        const transactionsDb = await TransactionParser.getAllTransactionsFromPDAAccountDb(this.connection, userPdas.LeafPDA, transactionsRoot);
        /**
         * Get structured transactions from the DB PDA
         * @param pda: PublicKey - The PDA address of the DB PDA.
         * @param transactionsRoot: ConfirmedSignatureInfo[] - Filtered transactions from the Root PDA.
         * @returns transactionsDbContent: ConfirmedSignatureInfo[] - Structured transactions from the DB PDA.
         */
        const transactionsDbContent = await ContentFetcher.dbContentFetcher(this.connection, transactionsDb);
        const finalTransactions = await ContentFetcher.catchMemoGetContent(this.connection, transactionsDbContent);
        return { finalTransactions: { messages: finalTransactions.filter((t) => t.result === ''), tools: finalTransactions.filter((t) => t.result !== '') } };
    }
}
exports.ZeroCombineFetcher = ZeroCombineFetcher;
//# sourceMappingURL=ZeroCombineFetcher.js.map
import { ConfirmedSignatureInfo, Connection, ParsedTransactionWithMeta, PublicKey } from "@solana/web3.js";
import { ConfigManager } from "../config/default";
import { SYSTEM_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";
import { SHA256 } from "crypto-js";
import { trimTrailingZeros } from "../utils/clearBuffer";
import { ZeroChunk } from "../operations/merkle.operation";
import { sleep } from "openai/core";
import { getParsedTransaction } from "../utils/SmartRoundRobinRPC";
import { all } from "axios";
import { ProofRecord } from "../types/agent.interface";

interface FinalTransactions {
    tools: any[];
}


// Class to handle PDA operations
class PDAManager {
    private wallet: PublicKey;
    private configManager: ConfigManager;

    constructor(agenWallett: PublicKey) {
        this.wallet = agenWallett;
        this.configManager = new ConfigManager();
    }

    getUserPDAs() {
        const { merkleDbSeed, merkleRootSeed } = this.configManager.getDefaultConfig();

        // Get the PDA for the user
        const [LeafPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(SHA256(`${merkleDbSeed}@${this.wallet.toBase58()}`).toString().slice(0, 32), 'hex')],
            SYSTEM_PROGRAM_ID,
        );

        const [RootPDA] = PublicKey.findProgramAddressSync(
            [Buffer.from(SHA256(`${merkleRootSeed}@${this.wallet.toBase58()}`).toString().slice(0, 32), 'hex')],
            SYSTEM_PROGRAM_ID,
        );

        return {
            LeafPDA,
            RootPDA,
        };
    }
}

// Class to handle transaction parsing logic
class TransactionParser {
    static findParsedOutputTransaction(signatures: ConfirmedSignatureInfo[]) {
        return signatures.map((signature) => {
            const decodedMemo = signature.memo;
            return {
                ...signature,
                memo: decodedMemo,
            };
        });
    }

    static async getAllTransactionsFromPDAAccountDb(connection: Connection, pda: PublicKey, transactionsRoot: ConfirmedSignatureInfo[]) {


        const signatures = await connection.getSignaturesForAddress(pda);
        const filteredSignatures = signatures.filter((sig) => {
            const isValid = sig.signature && sig.memo !== null;
            return isValid;
        });

        const signToDecode = filteredSignatures.map((sig) => {
            //const decodedMemo = sig.memo ? trimTrailingZeros(Buffer.from(sig.memo)).toString('utf-8') : null;
            return {
                ...sig,
                memo: sig.memo,
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
                } as ZeroChunk,
            };
        });


        const tupleFinalTreeTransactions: Array<{
            root: string;
            proofSignature: string;
            transaction: typeof _0transactions[0];
        }> = [];

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

        return { tupleFinalTreeTxns: tupleFinalTreeTransactions, allTxns: decodedSigns };
    }

    static async getAllTransactionsFromPDAAccountRoot(connection: Connection, pda: PublicKey) {
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
    static async parseTxDt(parsedTransactionData: string): Promise<ParsedTransactionWithMeta | null> {
        const parsed = JSON.parse(parsedTransactionData);
        return parsed.result as ParsedTransactionWithMeta;
    }


    static async dbContentFetcher(connection: Connection, transactions: any[], allTxns: ConfirmedSignatureInfo[]) {
        console.log(`Fetching memo data for ${transactions.length} transactions...`);
        const trackedContent = await Promise.all(transactions.map(async (_tx) => {
            const memoContentFirsrSign = _tx.transaction.memo.prevSign;

            const parsedTransactionData = allTxns.find((tx) => tx.signature === memoContentFirsrSign);


            const _fitstTransactionData = parsedTransactionData?.memo ? (() => {
                let memo = parsedTransactionData.memo;

                // Check if the memo contains a "|" and inject "single|" if not
                if (!memo.includes("|")) {
                    memo = `single|${memo}`;
                }

                const memoParts = memo.split("|");
                return {
                    prev_chunk_sign: memoParts[0],
                    content: memoParts.slice(1).join("|").replace(/\\+/g, '').replace(/^"|"$/g, ''),
                };
            })() : null;


            return {
                ..._tx,
                firstChunkContent: _fitstTransactionData,
            };
        }));


        return trackedContent.filter((t) => t.firstChunkContent !== null);
    }

    static async catchMemoGetContent(connection: Connection, transactions: any[], allTxns: ConfirmedSignatureInfo[]) {
        const txsCycled = await Promise.all(transactions.map(async (transaction) => {
            const { prev_chunk_sign: prevContentSign, content } = transaction.firstChunkContent;
            const allSignsAndContent: any[] = [{ prev_chunk_sign: prevContentSign, content }];
            let prevSign = prevContentSign;

            while (prevSign) {
                const parsedTransactionData = allTxns.find((tx) => tx.signature === prevSign);

                if (!parsedTransactionData) break;

                let memo = parsedTransactionData.memo;

                // Check if the memo contains a "|" and inject "single|" if not
                if (!memo?.includes("|")) {
                    memo = `single|${memo}`;
                }

                const memoParts = memo.split("|");

                const dataParsed = {
                    prev_chunk_sign: memoParts[0],
                    content: memoParts.slice(1).join("|").replace(/\\+/g, '').replace(/^"|"$/g, ''),
                };

                const { prev_chunk_sign, content } = dataParsed;
                allSignsAndContent.push({ prev_chunk_sign, content });

                if (prev_chunk_sign === 'single') break;
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
 * @returns {ProofRecord} - A promise that resolves when the fetch is complete.
 * @throws {Error} - Throws an error if the fetch fails.
 * 
 */

export class ZeroCombineFetcher {
    private agentWallet: PublicKey;
    private connection: Connection;

    constructor(agentWallet: PublicKey, connection: Connection) {
        this.agentWallet = agentWallet;
        this.connection = connection;
    }


    async execute(batchSize: number = 100): Promise<{ finalTransactions: FinalTransactions }> {

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
        const { tupleFinalTreeTxns, allTxns } = await TransactionParser.getAllTransactionsFromPDAAccountDb(this.connection, userPdas.LeafPDA, transactionsRoot);


        let allFinalTransactions: ProofRecord[] = [];

        // Process transactions in batches of 100
        for (let i = 0; i < tupleFinalTreeTxns.length; i += batchSize) {
            const batch = tupleFinalTreeTxns.slice(i, i + batchSize);

            // Fetch and process content for the current batch
            const transactionsDbContent = await ContentFetcher.dbContentFetcher(this.connection, batch, allTxns);


            const finalTransactions = await ContentFetcher.catchMemoGetContent(this.connection, transactionsDbContent, allTxns);

            // Merge results into the final array
            allFinalTransactions = [...allFinalTransactions, ...finalTransactions];


            // Sleep for 2000ms between batches
            await sleep(2000);
        }

        return {
            finalTransactions: {
                tools: allFinalTransactions,
            },
        };
    }
}
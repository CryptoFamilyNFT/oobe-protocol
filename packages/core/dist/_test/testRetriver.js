"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web3_js_1 = require("@solana/web3.js");
const default_1 = require("../config/default");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
const crypto_js_1 = require("crypto-js");
const core_1 = require("../core");
const clearBuffer_1 = require("../utils/clearBuffer");
function getUserPDAs(agent) {
    const wallet = agent.wallet;
    const { merkleDbSeed, merkleRootSeed } = new default_1.ConfigManager().getDefaultConfig();
    // Get the PDA for the user
    const [LeafPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleDbSeed}@` + wallet.publicKey.toBase58()).toString().slice(0, 32), 'hex')], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
    const [RootPDA] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from((0, crypto_js_1.SHA256)(`${merkleRootSeed}@` + wallet.publicKey.toBase58()).toString().slice(0, 32), 'hex')], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
    return {
        LeafPDA,
        RootPDA,
    };
}
function FindParsedOutputTransaction(signatures) {
    const transactions = signatures.map((signature) => {
        const decodedMemo = signature.memo;
        return {
            ...signature,
            memo: decodedMemo,
        };
    });
    return transactions;
}
async function getAllTransactionsFromPDAAccountDb(connection, pda, transactionsRoot) {
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
    const decodedSigns = FindParsedOutputTransaction(signToDecode);
    const ZeroTransactionsRecorded = decodedSigns.filter((sig) => {
        if (sig.memo) {
            const memoContent = sig.memo.replace(/^\[\d+\]\s*/, '');
            sig.memo = memoContent;
            const cleanedMemoContent = memoContent.replace(/\\|\s+/g, '');
            console.log("[DB] - Cleaned Memo Content:", cleanedMemoContent);
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
    console.log("[DB] - Parsed Zero Transactions:", _0transactions);
    const tupleFinalTreeTransactions = [];
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
            if (typeof transaction.memo !== 'string') {
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
async function getAllTransactionsFromPDAAccountRoot(connection, pda) {
    const signatures = await connection.getSignaturesForAddress(pda);
    const filteredSignatures = signatures.filter((sig) => {
        return sig.signature && sig.memo !== null;
    });
    const RootTransactionDecoded = filteredSignatures.filter((sig) => {
        if (sig.memo) {
            const memoContent = sig.memo.replace(/^\[\d+\]\s*/, '');
            sig.memo = memoContent;
            const cleanedMemoContent = memoContent.replace(/\\|\s+/g, '');
            return true;
        }
        return false;
    });
    console.log("\x1b[31m%s\x1b[0m", "[ROOT] - Filtered Signatures ROOT:", RootTransactionDecoded);
    return RootTransactionDecoded;
}
async function dbContentFetcher(connection, transactions) {
    const trackedContent = await Promise.all(transactions.map(async (_tx) => {
        const memoContentFirsrSign = _tx.transaction.memo.prevSign;
        const parsedTransactionData = connection.getParsedTransaction(memoContentFirsrSign, {
            commitment: 'finalized',
        });
        const firstTransactionData = await parsedTransactionData.then((tx) => {
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
    return trackedContent;
}
async function cycleToCatchTxnInMemoAndFindOtherTxContent(connection, transactions) {
    const txsCycled = await Promise.all(transactions.map(async (transaction) => {
        const { prev_chunk_sign: prevContentSign, content } = transaction.firstChunkContent;
        const allSignsAndContent = [{ prev_chunk_sign: prevContentSign, content }];
        let prevSign = prevContentSign;
        for (; prevSign;) {
            const parsedTransaction = await connection.getParsedTransaction(prevSign, { commitment: "finalized" });
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
    return txsCycled;
}
async function mainModule() {
    /**
     * Configure OOBE
     */
    const configManager = new default_1.ConfigManager();
    const config = configManager.createDefaultConfig(process.env.PVT_KEY || '', process.env.OPENAI_API_KEY || '', process.env.OOBE_KEY || '');
    const oobe = new core_1.OobeCore(config);
    oobe.start();
    const agent = oobe.getAgent();
    const userPdas = getUserPDAs(agent);
    console.log("\x1b[36m%s\x1b[0m", "User PDAs:", userPdas);
    const transactionsRoot = await getAllTransactionsFromPDAAccountRoot(agent.connection, userPdas.RootPDA);
    console.log("Transactions Root:", transactionsRoot);
    const transactionsDb = await getAllTransactionsFromPDAAccountDb(agent.connection, userPdas.LeafPDA, transactionsRoot);
    console.log("\x1b[36m%s\x1b[0m", "Transactions DB:", transactionsDb);
    const transactionsDbContent = await dbContentFetcher(agent.connection, transactionsDb);
    console.log("\x1b[36m%s\x1b[0m", "Transactions DB Content:", transactionsDbContent);
    const cycledTnx = await cycleToCatchTxnInMemoAndFindOtherTxContent(agent.connection, transactionsDbContent);
    console.log("\x1b[36m%s\x1b[0m", "Cycled Transactions:", cycledTnx.map((tx) => console.log("\x1b[36m%s\x1b[0m", "Cycled Transactions:", tx)));
}
mainModule().catch((error) => {
    console.error("Error:", error);
}).finally(() => {
    console.log("Finished");
});
//# sourceMappingURL=testRetriver.js.map
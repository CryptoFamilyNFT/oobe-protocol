"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orcaClosePositionTool = void 0;
const web3_js_1 = require("@solana/web3.js");
const common_sdk_1 = require("@orca-so/common-sdk");
const whirlpools_sdk_1 = require("@orca-so/whirlpools-sdk");
const nodewallet_1 = __importDefault(require("@coral-xyz/anchor/dist/cjs/nodewallet"));
const tools_1 = require("langchain/tools");
const zod_1 = require("zod");
class orcaClosePositionTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        positionMintAddress: zod_1.z.string().describe("The mint address of the position to close"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "ORCA_CLOSE_POSITION";
        this.description = `This tool can be used to close a position on Orca.
    Use the tool only for closing positions on Orca.

    Ensure the \`positionMintAddress\` is a valid string.
    
    Inputs ( input is a JSON string ):
    positionMintAddress: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
    `;
    }
    async _call(input) {
        // Ensure input is correctly parsed
        const parsedInput = JSON.parse(input);
        if (!parsedInput || typeof parsedInput !== 'object') {
            throw new Error("Invalid input format, expected JSON object.");
        }
        try {
            const wallet = this.agent.wallet;
            const nodeWallet = new nodewallet_1.default(wallet);
            const ctx = whirlpools_sdk_1.WhirlpoolContext.from(this.agent.connection, nodeWallet, whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID);
            const client = (0, whirlpools_sdk_1.buildWhirlpoolClient)(ctx);
            const positionAddress = whirlpools_sdk_1.PDAUtil.getPosition(whirlpools_sdk_1.ORCA_WHIRLPOOL_PROGRAM_ID, parsedInput.positionMintAddress);
            const position = await client.getPosition(positionAddress.publicKey);
            const whirlpoolAddress = position.getData().whirlpool;
            const whirlpool = await client.getPool(whirlpoolAddress);
            const txBuilder = await whirlpool.closePosition(positionAddress.publicKey, common_sdk_1.Percentage.fromFraction(1, 100));
            const txPayload = await txBuilder[0].build();
            const txPayloadDecompiled = web3_js_1.TransactionMessage.decompile(txPayload.transaction.message);
            const recentBlockhash = await this.agent.connection.getLatestBlockhash();
            const instructions = txPayloadDecompiled.instructions;
            const transaction = new web3_js_1.Transaction().add(...instructions);
            transaction.add(...instructions);
            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = recentBlockhash.blockhash;
            const txId = await this.agent.connection.sendRawTransaction(transaction.serialize({
                requireAllSignatures: false,
                verifySignatures: false,
            }), {
                skipPreflight: true,
                preflightCommitment: "finalized",
                maxRetries: 3,
            });
            await this.agent.connection.getLatestBlockhash().then(async (blockhash) => {
                await this.agent.connection.confirmTransaction({
                    blockhash: blockhash.blockhash,
                    lastValidBlockHeight: blockhash.lastValidBlockHeight,
                    signature: txId,
                });
            });
            return txId;
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: "Failed to close position",
                error: error.toString(),
            });
        }
    }
}
exports.orcaClosePositionTool = orcaClosePositionTool;
//# sourceMappingURL=orca_pos_close.tool.js.map
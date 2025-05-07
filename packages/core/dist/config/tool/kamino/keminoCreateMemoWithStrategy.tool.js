"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMemoWithStrategyKeyTool = void 0;
const zod_1 = require("zod");
const web3_js_1 = require("@solana/web3.js");
const tools_1 = require("langchain/tools");
const raydium_sdk_v2_1 = require("@raydium-io/raydium-sdk-v2");
class CreateMemoWithStrategyKeyTool extends tools_1.StructuredTool {
    constructor(kamino) {
        super();
        this.kamino = kamino;
        this.name = "create_memo_with_strategy_key_for_kamino_strategy";
        this.description = "Creates a memo log on Solana with an encrypted strategy key.";
        this.schema = zod_1.z.object({
            liquidityPoolPubKey: zod_1.z.string().describe("Public key of the liquidity pool"),
            isOrca: zod_1.z.boolean().describe("Is the liquidity pool an Orca pool or not?"),
        });
    }
    derivatePDAVector() {
        const [pda, bump] = web3_js_1.PublicKey.findProgramAddressSync([Buffer.from(this.kamino['agent'].wallet.publicKey.toBase58())], raydium_sdk_v2_1.SYSTEM_PROGRAM_ID);
        return { bump, pda };
    }
    async _call(input) {
        try {
            const strategyPubkey = this.kamino.CREATE_CAMINO_STRATEGY(input.liquidityPoolPubKey, input.isOrca);
            const { pda } = this.derivatePDAVector();
            const txSig = await this.kamino.createMemoWithStrategyKey(this.kamino['agent'].connection, this.kamino['agent'].wallet, new web3_js_1.PublicKey(strategyPubkey), pda);
            return JSON.stringify({
                status: 'success',
                message: 'Memo created successfully',
                transactionSignature: txSig,
                pda: pda.toBase58(),
                strategyPubkey: strategyPubkey,
                pdaVector: pda
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return JSON.stringify({
                    status: 'error',
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: 'error',
                message: error.message,
            });
        }
    }
}
exports.CreateMemoWithStrategyKeyTool = CreateMemoWithStrategyKeyTool;
//# sourceMappingURL=keminoCreateMemoWithStrategy.tool.js.map
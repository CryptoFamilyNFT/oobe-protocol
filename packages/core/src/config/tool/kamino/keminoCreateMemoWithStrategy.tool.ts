import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { PublicKey } from "@solana/web3.js";
import { Agent } from "../../../agent/Agents";
import { StructuredTool } from "langchain/tools";
import { SYSTEM_PROGRAM_ID } from "@raydium-io/raydium-sdk-v2";

export class CreateMemoWithStrategyKeyTool extends StructuredTool {
    name = "create_memo_with_strategy_key_for_kamino_strategy";
    description = "Creates a memo log on Solana with an encrypted strategy key.";

    schema = z.object({
        liquidityPoolPubKey: z.string().describe("Public key of the liquidity pool"),
        isOrca: z.boolean().describe("Is the liquidity pool an Orca pool or not?"),
    });

    constructor(private kamino: kaminoOperations) {
        super();
    }

    private derivatePDAVector() {
        const [pda, bump] = PublicKey.findProgramAddressSync(
            [Buffer.from(this.kamino['agent'].wallet.publicKey.toBase58())],
            SYSTEM_PROGRAM_ID,
        );
        return {bump, pda};
    }

    async _call(input: z.infer<typeof this.schema>) {
        try {
            const strategyPubkey = this.kamino.CREATE_CAMINO_STRATEGY(input.liquidityPoolPubKey, input.isOrca);
            const { pda } = this.derivatePDAVector();
            const txSig = await this.kamino.createMemoWithStrategyKey(
                this.kamino['agent'].connection,
                this.kamino['agent'].wallet,
                new PublicKey(strategyPubkey),
                pda
            );
            return JSON.stringify({
                status: 'success', 
                message: 'Memo created successfully',
                transactionSignature: txSig,
                pda: pda.toBase58(),
                strategyPubkey: strategyPubkey,
                pdaVector: pda});
        } catch (error: any) {
            if (error instanceof z.ZodError) {
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

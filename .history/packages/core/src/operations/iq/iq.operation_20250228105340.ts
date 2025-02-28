import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";

export class IQOperation {
    public program_id = new PublicKey("FG5nDUjz4S1FBs2rZrXsKsa7J34e21WF17F8nFL9uwWi");

    async handleTransaction(
        agent: Agent,
        connection: Connection,
        instruction: TransactionInstruction,
        signers: PublicKey | Array<PublicKey>,
    ) {
        return await agent.sendTransaction([instruction], [agent.wallet]);
    }
}
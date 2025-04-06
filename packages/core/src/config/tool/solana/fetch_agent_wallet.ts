import { Tool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";

export class FetchAgentKeypair extends Tool {
    name = "fetch_agent_keypair";
    description = `Fetch the agent's wallet keypair. 
    This tool can be used to fetch the agent's wallet keypair. 
    This is your publicKey use for address reference to your wallet.
     `;
    
    constructor(private agent: Agent) {
        super();
    }
    
    protected async _call(): Promise<string> {
        try {
        const keypair = this.agent.wallet.publicKey
        return JSON.stringify({
            status: "success",
            message: "Agent keypair fetched successfully",
            keypair,
        });
        } catch (error: any) {
        return JSON.stringify({
            status: "error",
            message: error.message,
            code: error.code || "UNKNOWN_ERROR",
        });
        }
    }
}
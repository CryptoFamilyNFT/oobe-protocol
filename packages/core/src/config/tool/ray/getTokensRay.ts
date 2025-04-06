import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";

export class RaydiumGetTokensTool extends Tool {

    name = "RAYDIUM_GET_TOKENS";
    description = `This tool can be used to find a token on Raydium.
    Do not use this tool for any other purpose, or for creating SPL tokens.
    generate good values for the parameters for a good trade. aspetta 10 secondi prima di fare la richiesta.
    `;
    constructor(private agent: Agent) {
        super();
    }

    protected async _call(): Promise<string> {
        try {

            // Buy token with validated input
            const result = await this.agent.getNewPools();

            return JSON.stringify(result);
        } catch (error) {
            console.error("Error in RAYDIUM_GET_TOKENS tool:", error);
            throw new Error("Failed to fetch tokens on Raydium");
        }
    }
}
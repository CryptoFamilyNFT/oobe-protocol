import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";

export class RaydiumGetTokensTool extends StructuredTool {

    name = "RAYDIUM_GET_TOKENS";
    description = `This tool can be used to find a token on Raydium.
    Do not use this tool for any other purpose, or for creating SPL tokens.
    generate good values for the parameters for a good trade. aspetta 10 secondi prima di fare la richiesta.
    `;

    schema = z.object({}).describe("This tool does not require any input.");

    constructor(private agent: Agent) {
        super();
    }

    protected async _call(): Promise<string> {
        try {

            // Buy token with validated input
            const result = await this.agent.getNewPools();

            return JSON.stringify(result);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                return JSON.stringify({
                    status: "error",
                    message: `Invalid input: ${error.message}`,
                });
            }
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
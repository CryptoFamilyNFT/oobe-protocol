import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

export class SolanaIQTextTool extends StructuredTool {
    name = "iq_code_in_text_inscription";

    description = `This tool can inscribe a text using the IQ6900 protocol optimization for data storage.

    Inputs:
    message: string, eg "Much Luv to IQ from Bobby Hill Agent"` ;

    constructor(private agent: Agent, override schema = z.object({
        message: z.string().describe("Message to be inscribed"),
    })) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        try {
            // Parse and normalize input
            const trimmedInput = input.message.trim();
            console.log("input", trimmedInput);

            const result: Promise<{
                signature: string;
                codeAccountPDA: PublicKey;
                dbAccountPDA: PublicKey;
                error?: never;
            } | {
                error: any;
                signature?: never;
                codeAccountPDA?: never;
                dbAccountPDA?: never;
            }> = await this.agent.generateCodeInIQInscription(input.message, "text", 10, 0.5);

            return JSON.stringify(result);
        } catch (error: any) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
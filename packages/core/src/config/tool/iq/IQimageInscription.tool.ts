import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { PublicKey } from "@solana/web3.js";
import { z } from "zod";

export class SolanaIQImageTool extends StructuredTool {
    name = "iq_code_in_inscription";

    description = `This tool can inscribe an image with ASCII characters using the IQ protocol optimization for data storage.

    The image has to be 500x500 max.

    Inputs:
    imageUrl: string, eg "https://www.creativefabrica.com/wp-content/uploads/2022/10/13/Bobby-Hill-Portrait-41509313-1.png` ;

    constructor(private agent: Agent, override schema = z.object({
        imageUrl: z.string().url().describe("URL of the image to be inscribed"),
    })) {
        super();
    }

    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        try {
            // Parse and normalize input
            // Launch token with validated input
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
            }> = await this.agent.generateCodeInIQInscription(input.imageUrl, "image", 10, 0.5);

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
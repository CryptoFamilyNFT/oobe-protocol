import { Agent } from "../../../agent/Agents";
import { StructuredTool, Tool } from "@langchain/core/tools";
import { z } from "zod";

export class createToken2022Tool extends StructuredTool {
    name = "CREATE_TOKEN_2022";
    description = `This tool must be used to create Tax Transfer Tokens following the 2022 standard! Do not use this tool for SPL tokens!
     Use "solana_create_image" tool to generate the required image.
     
    Inputs: 
        name: string, eg "OOBEX Test",
        symbol: string, eg "BEX",
        decimals: number, eg "6",
        supply: number, eg "100000000",
        description: string, eg "OOBEX Test Token",
        feeBasisPoints: number, eg "700",
        maxFeeInTokens: number, eg "100000000",
        pinataKey: string, eg "ayJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        imageUrl: string, eg "https://example.com/image.png"

    - Ensure the \`supply\` is a valid integer.
    - Make sure the \`feeBasisPoints\` is a valid integer and within a reasonable range.
    - The \`maxFeeInTokens\` should also be a valid integer.

    - Ensure the \`pinataKey\` is a valid string then use buffer_input tool to get and use the buffer of the key.
    `;

    /**
     * Constructs a new instance of the class.
     * 
     * @param agent - The agent instance used for handling operations.
     * @param schema - The schema definition for the configuration object.
     *   - `name` - A string representing the name of the token.
     *   - `symbol` - A string representing the symbol of the token.
     *   - `decimals` - A number indicating the decimal precision of the token.
     *   - `supply` - A number representing the total supply of the token.
     *   - `description` - A string providing a description of the token.
     *   - `feeBasisPoints` - A number representing the fee in basis points.
     *   - `maxFeeInTokens` - A number indicating the maximum fee in tokens.
     *   - `pinataKey` - A string representing the Pinata API key for IPFS integration.
     *   - `imageUrl` - A string containing the URL of the token's image.
     */
    constructor(private agent: Agent, override schema = z.object({
        name: z.string().describe("A string representing the name of the token"),
        symbol: z.string().describe("A string representing the symbol of the token"),
        decimals: z.number().describe("A number indicating the decimal precision of the token"),
        supply: z.number().describe("A number representing the total supply of the token"),
        description: z.string().describe("A string providing a description of the token"),
        feeBasisPoints: z.number().describe("A number representing the fee in basis points"),
        maxFeeInTokens: z.number().describe("A number indicating the maximum fee in tokens"),
        pinataKey: z.string().describe("A string representing the Pinata API key for IPFS integration"),
        imageUrl: z.string().describe("A string containing the URL of the token's image"),
    })) {
        super();
    }

    private validateInput(input: any): void {
        if (!input.name || typeof input.name !== "string") {
            throw new Error("name is required and must be a string");
        }
        if (!input.symbol || typeof input.symbol !== "string") {
            throw new Error("symbol is required and must be a string");
        }
        if (!input.decimals || typeof input.decimals !== "number") {
            throw new Error("decimals is required and must be a number");
        }
        if (!input.supply || typeof input.supply !== "number") {
            throw new Error("supply is required and must be a number");
        }
        if (!input.description || typeof input.description !== "string") {
            throw new Error("description is required and must be a string");
        }
        if (!input.feeBasisPoints || typeof input.feeBasisPoints !== "number") {
            throw new Error("feeBasisPoints is required and must be a number");
        }
        if (!input.maxFeeInTokens || typeof input.maxFeeInTokens !== "number") {
            throw new Error("maxFeeInTokens is required and must be a number");
        }
        if (!input.pinataKey || typeof input.pinataKey !== "string") {
            throw new Error("pinataKey is required and must be a string");
        }
        if (!input.imageUrl || typeof input.imageUrl !== "string") {
            throw new Error("imageUrl is required and must be a string");
        }
    }

    /**
     * Validates the input parameters for creating a token.
     * @param input - The input parameters to validate.
     * @throws {Error} If any of the input parameters are invalid.
     */
    protected async _call(input: z.infer<typeof this.schema>): Promise<string> {
        try {
            const parsedInput = input;

            // [!] Extract the nested input key if it exists
            const actualInput = parsedInput;

            this.validateInput(actualInput);

            console.log("Creating token with the following parameters:", actualInput);
            const result = await this.agent.createToken2022(
                actualInput.name,
                actualInput.symbol,
                actualInput.decimals,
                actualInput.supply,
                actualInput.description,
                actualInput.feeBasisPoints,
                actualInput.maxFeeInTokens,
                actualInput.pinataKey,
                actualInput.imageUrl
            );

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
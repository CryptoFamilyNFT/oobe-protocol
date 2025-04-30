"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken2022Tool = void 0;
const tools_1 = require("@langchain/core/tools");
class createToken2022Tool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "CREATE_TOKEN_2022";
        this.description = `This tool must be used to create Tax Transfer Tokens following the 2022 standard! Do not use this tool for SPL tokens!
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
    }
    validateInput(input) {
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
    async _call(input) {
        try {
            input = input.trim();
            const parsedInput = JSON.parse(input);
            // [!] Extract the nested input key if it exists
            const actualInput = parsedInput;
            this.validateInput(actualInput);
            console.log("Creating token with the following parameters:", actualInput);
            const result = await this.agent.createToken2022(actualInput.name, actualInput.symbol, actualInput.decimals, actualInput.supply, actualInput.description, actualInput.feeBasisPoints, actualInput.maxFeeInTokens, actualInput.pinataKey, actualInput.imageUrl);
            return JSON.stringify(result);
        }
        catch (error) {
            return JSON.stringify({
                status: "error",
                message: error.message,
                code: error.code || "UNKNOWN_ERROR",
            });
        }
    }
}
exports.createToken2022Tool = createToken2022Tool;
//# sourceMappingURL=token_2022.tool.js.map
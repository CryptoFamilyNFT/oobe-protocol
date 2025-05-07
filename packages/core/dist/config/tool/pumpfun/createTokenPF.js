"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolanaPumpfunTokenLaunchTool = void 0;
const tools_1 = require("@langchain/core/tools");
const zod_1 = require("zod");
class SolanaPumpfunTokenLaunchTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        tokenName: zod_1.z.string().min(1).max(32).describe("Name of the token"),
        tokenTicker: zod_1.z
            .string()
            .min(2)
            .max(10)
            .describe("Ticker symbol of the token"),
        description: zod_1.z
            .string()
            .min(1)
            .max(1000)
            .describe("Description of the token"),
        imageUrl: zod_1.z.string().url().describe("URL of the token image"),
        twitter: zod_1.z.string().optional().nullable().describe("Twitter handle (optional)"),
        telegram: zod_1.z.string().optional().nullable().describe("Telegram group link (optional)"),
        website: zod_1.z.string().url().optional().nullable().describe("Website URL (optional)"),
        initialLiquiditySOL: zod_1.z
            .number()
            .optional()
            .nullable()
            .describe("Initial liquidity in SOL (optional)"),
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "solana_launch_pumpfun_token";
        this.description = `This tool can be used to launch a token on Pump.fun,
   do not use this tool for any other purpose, or for creating SPL tokens.
   If the user asks you to chose the parameters, you should generate valid values.
   For generating the image, you can use the solana_create_image tool.

   Inputs:
   tokenName: string, eg "PumpFun Token",
   tokenTicker: string, eg "PUMP",
   description: string, eg "PumpFun Token is a token on the Solana blockchain",
   imageUrl: string, eg "https://www.creativefabrica.com/wp-content/uploads/2022/10/13/Bobby-Hill-Portrait-41509313-1.png`;
    }
    validateInput(input) {
        if (!input.tokenName || typeof input.tokenName !== "string") {
            throw new Error("tokenName is required and must be a string");
        }
        if (!input.tokenTicker || typeof input.tokenTicker !== "string") {
            throw new Error("tokenTicker is required and must be a string");
        }
        if (!input.description || typeof input.description !== "string") {
            throw new Error("description is required and must be a string");
        }
        if (!input.imageUrl || typeof input.imageUrl !== "string") {
            throw new Error("imageUrl is required and must be a string");
        }
        if (input.initialLiquiditySOL !== undefined &&
            typeof input.initialLiquiditySOL !== "number") {
            throw new Error("initialLiquiditySOL must be a number when provided");
        }
    }
    async _call(input) {
        try {
            // Parse and normalize input
            const parsedInput = JSON.parse(JSON.stringify(input));
            this.validateInput(parsedInput);
            // Launch token with validated input
            await this.agent.launchPumpFunToken(this.agent, parsedInput.tokenName, parsedInput.tokenTicker, parsedInput.description, parsedInput.imageUrl, {
                twitter: parsedInput.twitter,
                telegram: parsedInput.telegram,
                website: parsedInput.website,
                initialLiquiditySOL: parsedInput.initialLiquiditySOL,
            });
            return JSON.stringify({
                status: "success",
                message: "Token launched successfully on Pump.fun",
                tokenName: parsedInput.tokenName,
                tokenTicker: parsedInput.tokenTicker,
            });
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
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
exports.SolanaPumpfunTokenLaunchTool = SolanaPumpfunTokenLaunchTool;
//# sourceMappingURL=createTokenPF.js.map
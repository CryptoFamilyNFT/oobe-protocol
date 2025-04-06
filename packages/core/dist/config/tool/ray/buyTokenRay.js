"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RaydiumBuyTokenTool = void 0;
const tools_1 = require("@langchain/core/tools");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
class RaydiumBuyTokenTool extends tools_1.Tool {
    constructor(agent) {
        super();
        this.agent = agent;
        this.name = "RAYDIUM_BUY_TOKEN";
        this.description = `This tool can be used to buy a token on Raydium. Await the solana_balance tool response before starting validation and Use the solana_balance tool pointed to "your" agent wallet before and after this tool to check the balance in sol and check your balance in this tokenAddress
    Do not use this tool for any other purpose.
    If the user asks you to choose the parameters, you should generate valid values.
    If asked Generate good values for the parameters for a good trade.

    Ensure the \`tokenMint\` is a valid string.
    Make sure the \`amount\` is a valid number and greater than 0.0000001.
    The \`slippage\` should also be a valid number between 0 and 18.
    
    Inputs ( input is a JSON string ):
    tokenMint: string, eg "8243mJtEQZSEYh5DBmvHSwrN8tmcYkAuG67CgoT2pump",
    amount: number, eg "0.1",
    slippage: number, eg "0.5",
    balanceSol: number, eg "2.3",
    balanceMint: number, eg "45000000",
    `;
    }
    isValidBase58(address) {
        try {
            new web3_js_1.PublicKey(address);
            return true;
        }
        catch {
            return false;
        }
    }
    async _call(input) {
        try {
            console.log("Input received in RAYDIUM_BUY_TOKEN tool:", input);
            // Ensure input is correctly parsed
            const parsedInput = JSON.parse(input);
            if (!parsedInput || typeof parsedInput !== 'object') {
                throw new Error("Invalid input format, expected JSON object.");
            }
            const { tokenMint, amount, slippage, balanceSol, balanceMint } = parsedInput;
            if (!tokenMint || typeof tokenMint !== 'string' || !this.isValidBase58(tokenMint)) {
                throw new Error("Invalid or non-base58 tokenMint address");
            }
            if (typeof amount !== 'number' || amount <= 0.0000001) {
                throw new Error("Invalid amount, must be greater than 0.0000001");
            }
            if (typeof slippage !== 'number' || slippage < 0.5 || slippage > 18) {
                throw new Error("Invalid slippage, must be between 0.5 and 18");
            }
            if (typeof balanceSol !== 'number') {
                throw new Error("Invalid balanceSol, must be a number");
            }
            if (typeof balanceMint !== 'number') {
                throw new Error("Invalid balanceMint, must be a number");
            }
            const tokenNative = spl_token_1.NATIVE_MINT.toBase58();
            // Perform swap operation
            const result = await this.agent.buyRaydiumToken(tokenMint, tokenNative, amount, slippage, '');
            return JSON.stringify(result);
        }
        catch (error) {
            console.error("Error in RAYDIUM_BUY_TOKEN tool:", error);
            return JSON.stringify({
                status: "error",
                message: error.message,
                error: error.toString(),
            });
        }
    }
}
exports.RaydiumBuyTokenTool = RaydiumBuyTokenTool;
//# sourceMappingURL=buyTokenRay.js.map
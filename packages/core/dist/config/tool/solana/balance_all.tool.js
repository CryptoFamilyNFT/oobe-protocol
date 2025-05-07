"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceAllTokensOwnedTool = void 0;
const tools_1 = require("@langchain/core/tools");
const ray_operation_1 = require("../../../operations/ray/ray.operation");
const zod_1 = require("zod");
const token_balances_1 = require("./token_balances");
const web3_js_1 = require("@solana/web3.js");
const text_splitter_1 = require("langchain/text_splitter");
const prompts_1 = require("@langchain/core/prompts");
const runnables_1 = require("@langchain/core/runnables");
const output_parsers_1 = require("@langchain/core/output_parsers");
class balanceAllTokensOwnedTool extends tools_1.StructuredTool {
    constructor(agent, schema = zod_1.z.object({
        walletAddress: zod_1.z.string().describe("Wallet address to fetch balance")
    })) {
        super();
        this.agent = agent;
        this.schema = schema;
        this.name = "solana_balance_all_tokens_owned";
        this.description = `Get the balance of all tokens owned by a Solana wallet.
    use your wallet address using fetch_agent_keypair where you check your balance if user say it generally, remember the correlation between name, symbol and tokenMint.

    Input (input is JSON string):
    walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
    `;
        this.parserSchema = output_parsers_1.StructuredOutputParser.fromZodSchema(zod_1.z.object({
            token: zod_1.z.string().describe("Token name"),
            symbol: zod_1.z.string().describe("Token symbol"),
            tokenMint: zod_1.z.string().describe("Token mint address"),
            balance: zod_1.z.string().describe("Token balance"),
            decimals: zod_1.z.number().describe("Token decimals"),
            isNFT: zod_1.z.boolean().describe("Token is an NFT?")
        }));
    }
    async _call(input) {
        const splitter = new text_splitter_1.RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });
        const rayOp = new ray_operation_1.RayOperation(this.agent);
        console.log("Input:", input);
        try {
            // Parse and normalize input
            const parsedInput = this.schema.parse(input);
            const results = await (0, token_balances_1.SolanaTokenBalances)(this.agent, new web3_js_1.PublicKey(parsedInput.walletAddress));
            results.tokens.unshift({
                tokenAddress: "SOL",
                name: "Solana",
                symbol: "SOL",
                balance: results.sol,
                decimals: 9,
            });
            const docs = await splitter.createDocuments(results.tokens.map((token) => {
                return JSON.stringify({
                    ...token
                });
            }));
            const formatDocs = (docs) => docs.map((doc) => typeof doc.pageContent === 'string'
                ? doc.pageContent
                : JSON.stringify(doc.pageContent));
            const model = this.agent.genAi();
            const template = `
            Optimize data visual return in JSON format with the following structure:
            {context} 
            and show all the data you retrieve.
            `;
            const contextChunks = formatDocs(docs);
            const resultsArray = [];
            for (const chunk of contextChunks) {
                const prompt = prompts_1.PromptTemplate.fromTemplate(template);
                const chain = runnables_1.RunnableSequence.from([
                    async () => ({ context: chunk }),
                    prompt,
                    model,
                    new output_parsers_1.StringOutputParser(),
                ]);
                const partialResult = await chain.invoke({
                    context: this.parserSchema.getFormatInstructions(),
                });
                resultsArray.push(partialResult);
            }
            const result = resultsArray.join("\n\n");
            return JSON.stringify({
                status: "success",
                tokens: result,
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
exports.balanceAllTokensOwnedTool = balanceAllTokensOwnedTool;
//# sourceMappingURL=balance_all.tool.js.map
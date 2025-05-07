import { StructuredTool, Tool } from "@langchain/core/tools";
import { RayOperation } from "../../../operations/ray/ray.operation";

import { Agent } from "../../../agent/Agents";
import { z } from "zod";
import { SolanaTokenBalances } from "./token_balances";
import { PublicKey } from "@solana/web3.js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser, StructuredOutputParser } from "@langchain/core/output_parsers";

export class balanceAllTokensOwnedTool extends StructuredTool {
    name = "solana_balance_all_tokens_owned";
    description = `Get the balance of all tokens owned by a Solana wallet.
    use your wallet address using fetch_agent_keypair where you check your balance if user say it generally, remember the correlation between name, symbol and tokenMint.

    Input (input is JSON string):
    walletAddress: string, eg "GDEkQF7UMr7RLv1KQKMtm8E2w3iafxJLtyXu3HVQZnME" (required)
    `;

    constructor(private agent: Agent, override schema = z.object({
        walletAddress: z.string().describe("Wallet address to fetch balance")
    })) {
        super();
    }

    private readonly parserSchema = StructuredOutputParser.fromZodSchema(z.object({
        token: z.string().describe("Token name"),
        symbol: z.string().describe("Token symbol"),
        tokenMint: z.string().describe("Token mint address"),
        balance: z.string().describe("Token balance"),
        decimals: z.number().describe("Token decimals"),
        isNFT: z.boolean().describe("Token is an NFT?")
    }));

    protected async _call(input: string): Promise<string> {
        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 100,
        });

        const rayOp = new RayOperation(this.agent);
        console.log("Input:", input);
        try {
            // Parse and normalize input
            const parsedInput = this.schema.parse(input);

            const results = await SolanaTokenBalances(this.agent, new PublicKey(parsedInput.walletAddress))

            results.tokens.unshift({
                tokenAddress: "SOL",
                name: "Solana",
                symbol: "SOL",
                balance: results.sol,
                decimals: 9,
            })

            const docs = await splitter.createDocuments(results.tokens.map((token) => {
                return JSON.stringify({
                    ...token
                })
            }));

            const formatDocs = (docs: Document[]) =>
                docs.map((doc) =>
                    typeof doc.pageContent === 'string'
                        ? doc.pageContent
                        : JSON.stringify(doc.pageContent)
                );

            const model = this.agent.genAi();
            const template = `
            Optimize data visual return in JSON format with the following structure:
            {context} 
            and show all the data you retrieve.
            `;

            const contextChunks = formatDocs(docs);
            const resultsArray: string[] = [];

            for (const chunk of contextChunks) {
                const prompt = PromptTemplate.fromTemplate(template);

                const chain = RunnableSequence.from([
                    async () => ({ context: chunk }),
                    prompt,
                    model,
                    new StringOutputParser(),
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
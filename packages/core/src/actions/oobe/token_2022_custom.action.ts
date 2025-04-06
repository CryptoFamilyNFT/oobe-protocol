import { symbol, z } from "zod";
import { Action } from "../../types/action.interface";
import { Agent } from "../../agent/Agents";
import { OobeOperation } from "../../operations/oobe/oobe.operation";

const token_2022_custom: Action = {
    name: "CREATE_TOKEN_2022",
    similes: [
        "create token 2022 custom",
        "create token",
        "make a token",
        "create transfer token",
        "create transfer token 2022",
        "create transfer token 2022 custom",
        "create tax token"
    ],
    description: "Create a tax transfer token (TOKEN2022-STANDARD) with custom metadata and transfer fee extension.",
    examples: [
        [
            {
                input: {
                    name: "OOBEX Test",
                    symbol: "BEX",
                    decimals: 6,
                    supply: 100000000,
                    description: "OOBEX Test Token",
                    feeBasisPoints: 700,
                    maxFeeInTokens: 100000000,
                    pinataKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.MliJVePFtgb7NRwrrHAUNluNqgNu5qvv341-qly8_NY",
                    imageUrl: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-2GCDgqrSEBTAkrvM6jO01JPJ/user-1RwBR61VrJ83qPAIh68a70RU/img-rHCWOpcqVMuIktoded8d6ZDP.png?st=2025-03-17T11%3A58%3A26Z&se=2025-03-17T13%3A58%3A26Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-03-16T15%3A48%3A30Z&ske=2025-03-17T15%3A48%3A30Z&sks=b&skv=2024-08-04&sig=MM4219NUIAkd4DTtqxgeY/eHQl9aN9O9w8oTvDzRgiM%3D",
                },
                output: {
                    status: "success",
                    message: "Token created successfully.",
                    tokenAddress: "4TL4z5na2fhRVUg6JywpLf85LEztNd94XgqJMzQcNoi",
                    name: "OOBEX Test",
                    symbol: "BEX",
                    signature: "4TL4z5na2fhRVUg6JywpLf85LEztNd94XgqJMzQcNoisajkjkeke"
                },
                explanation: "Create a custom token with transfer fee extension and metadata.",
            }
        ],
    ], schema: z.object({
        name: z.string().min(4).max(32).describe("Name of the token"),
        symbol: z.string().min(2).max(16).describe("Ticker symbol of the token"),
        decimals: z.number().min(0).max(18).describe("Number of decimal places"),
        supply: z.number().min(1).max(1000000000000).describe("Initial supply of the token"),
        description: z.string().min(1).max(250).describe("Description of the token. max 250 characters"),
        feeBasisPoints: z.number().min(0).max(10000).describe("Transfer fee in basis points two decimals 700 = 7%"),
        maxFeeInTokens: z.number().min(0).max(100000000000).describe("Maximum fee in tokens"),
        pinataKey: z.string().describe("Pinata key for uploading metadata"),
        imageUrl: z.string().url().describe("Image URL for the token"),
    }),
    handler: async (agent: Agent, input: Record<string, any>) => {
        console.log("[!]: ", input);
        const ob = new OobeOperation(agent);
        const { name, symbol, decimals, supply, description, feeBasisPoints, maxFeeInTokens, pinataKey, imageUrl } = input;

        // Create the token using the provided parameters
        const tokenAddress = await ob.createOobe2022Token({
            name,
            symbol,
            decimals,
            supply,
            description,
            feeBasisPoints,
            maxFee: maxFeeInTokens,
            pinataKey,
            imageUrl
        });

        return {
            status: "success",
            message: "Token created successfully.",
            tokenAddress,
            name,
            symbol,
            signature: "4TL4z5na2fhRVUg6JywpLf85LEztNd94XgqJMzQcNoisajkjkeke"
        };
    }
}

export default token_2022_custom;
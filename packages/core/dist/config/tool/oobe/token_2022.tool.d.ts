import { Agent } from "../../../agent/Agents";
import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";
export declare class createToken2022Tool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        supply: z.ZodNumber;
        description: z.ZodString;
        feeBasisPoints: z.ZodNumber;
        maxFeeInTokens: z.ZodNumber;
        pinataKey: z.ZodString;
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        imageUrl: string;
        name: string;
        decimals: number;
        supply: number;
        description: string;
        feeBasisPoints: number;
        maxFeeInTokens: number;
        pinataKey: string;
    }, {
        symbol: string;
        imageUrl: string;
        name: string;
        decimals: number;
        supply: number;
        description: string;
        feeBasisPoints: number;
        maxFeeInTokens: number;
        pinataKey: string;
    }>;
    name: string;
    description: string;
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
    constructor(agent: Agent, schema?: z.ZodObject<{
        name: z.ZodString;
        symbol: z.ZodString;
        decimals: z.ZodNumber;
        supply: z.ZodNumber;
        description: z.ZodString;
        feeBasisPoints: z.ZodNumber;
        maxFeeInTokens: z.ZodNumber;
        pinataKey: z.ZodString;
        imageUrl: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        symbol: string;
        imageUrl: string;
        name: string;
        decimals: number;
        supply: number;
        description: string;
        feeBasisPoints: number;
        maxFeeInTokens: number;
        pinataKey: string;
    }, {
        symbol: string;
        imageUrl: string;
        name: string;
        decimals: number;
        supply: number;
        description: string;
        feeBasisPoints: number;
        maxFeeInTokens: number;
        pinataKey: string;
    }>);
    private validateInput;
    /**
     * Validates the input parameters for creating a token.
     * @param input - The input parameters to validate.
     * @throws {Error} If any of the input parameters are invalid.
     */
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=token_2022.tool.d.ts.map
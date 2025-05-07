import { Agent } from "../../../agent/Agents";
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
export declare class orcaCreateClmm extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        mintDeploy: z.ZodString;
        mintPair: z.ZodString;
        initialPrice: z.ZodNumber;
        feeTier: z.ZodEnum<[string, ...string[]]>;
    }, "strip", z.ZodTypeAny, {
        mintDeploy: string;
        mintPair: string;
        initialPrice: number;
        feeTier: string;
    }, {
        mintDeploy: string;
        mintPair: string;
        initialPrice: number;
        feeTier: string;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        mintDeploy: z.ZodString;
        mintPair: z.ZodString;
        initialPrice: z.ZodNumber;
        feeTier: z.ZodEnum<[string, ...string[]]>;
    }, "strip", z.ZodTypeAny, {
        mintDeploy: string;
        mintPair: string;
        initialPrice: number;
        feeTier: string;
    }, {
        mintDeploy: string;
        mintPair: string;
        initialPrice: number;
        feeTier: string;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=orca_create_clmm.tool.d.ts.map
import { StructuredTool } from "langchain/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class orcaClosePositionTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        positionMintAddress: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        positionMintAddress: string;
    }, {
        positionMintAddress: string;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        positionMintAddress: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        positionMintAddress: string;
    }, {
        positionMintAddress: string;
    }>);
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=orca_pos_close.tool.d.ts.map
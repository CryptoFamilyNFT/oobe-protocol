import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
export declare class DepositSharesTool extends StructuredTool {
    private kamino;
    name: string;
    description: string;
    schema: z.ZodObject<{
        address: z.ZodString;
        amount_usdh: z.ZodString;
        amount_usdc: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        amount_usdh: string;
        amount_usdc: string;
    }, {
        address: string;
        amount_usdh: string;
        amount_usdc: string;
    }>;
    constructor(kamino: kaminoOperations);
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=kaminoDepositShares.tool.d.ts.map
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
export declare class WithdrawSharesTool extends StructuredTool {
    private kamino;
    name: string;
    description: string;
    schema: z.ZodObject<{
        address: z.ZodString;
        amountUSDH: z.ZodString;
        amountUSDC: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
        amountUSDH: string;
        amountUSDC: string;
    }, {
        address: string;
        amountUSDH: string;
        amountUSDC: string;
    }>;
    constructor(kamino: kaminoOperations);
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=kaminoWithdrawShares.tool.d.ts.map
import { StructuredTool } from "langchain/tools";
import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
export declare class GetKaminoCustomStrategyTool extends StructuredTool {
    private kamino;
    schema: z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>;
    name: string;
    description: string;
    constructor(kamino: kaminoOperations, schema?: z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>);
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=kaminoGetCustomStrategy.tool.d.ts.map
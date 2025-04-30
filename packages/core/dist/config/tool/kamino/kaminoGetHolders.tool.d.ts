import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
import { StructuredTool } from "langchain/tools";
export declare class GetKaminoHoldersTool extends StructuredTool {
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
//# sourceMappingURL=kaminoGetHolders.tool.d.ts.map
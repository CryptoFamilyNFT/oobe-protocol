import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { StructuredTool } from "langchain/tools";
export declare class GetKaminoSharePriceTool extends StructuredTool {
    private kamino;
    schema: z.ZodObject<{
        input: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input: string | null;
    }, {
        input: string | null;
    }>;
    name: string;
    description: string;
    constructor(kamino: kaminoOperations, schema?: z.ZodObject<{
        input: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input: string | null;
    }, {
        input: string | null;
    }>);
    _validateInput(input: z.infer<typeof this.schema> | null): Promise<{
        input: string | null;
    }>;
    _call(input: z.infer<typeof this.schema> | null): Promise<string>;
}
//# sourceMappingURL=kaminoGetSharePriceStrategy.tool.d.ts.map
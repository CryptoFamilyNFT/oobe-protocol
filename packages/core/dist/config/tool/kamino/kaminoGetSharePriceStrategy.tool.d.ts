import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { Tool } from "langchain/tools";
export declare class GetKaminoSharePriceTool extends Tool {
    private kamino;
    schema: z.ZodEffects<z.ZodObject<{
        input: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input?: string | undefined;
    }, {
        input?: string | undefined;
    }>, string | undefined, {
        input?: string | undefined;
    }>;
    name: string;
    description: string;
    constructor(kamino: kaminoOperations, schema?: z.ZodEffects<z.ZodObject<{
        input: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input?: string | undefined;
    }, {
        input?: string | undefined;
    }>, string | undefined, {
        input?: string | undefined;
    }>);
    _validateInput(input: z.infer<typeof this.schema>): Promise<string | undefined>;
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=kaminoGetSharePriceStrategy.tool.d.ts.map
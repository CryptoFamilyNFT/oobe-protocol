import { StructuredTool } from "langchain/tools";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { z } from "zod";
export declare class GetAssociatedForTokensAndSharesTool extends StructuredTool {
    private kamino;
    name: string;
    description: string;
    schema: z.ZodObject<{
        address: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        address: string;
    }, {
        address: string;
    }>;
    constructor(kamino: kaminoOperations);
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=kaminoGetAssociateTokens.tools.d.ts.map
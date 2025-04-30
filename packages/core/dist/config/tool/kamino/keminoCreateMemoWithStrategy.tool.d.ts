import { z } from "zod";
import { kaminoOperations } from "../../../operations/kamino/kamino.operation";
import { StructuredTool } from "langchain/tools";
export declare class CreateMemoWithStrategyKeyTool extends StructuredTool {
    private kamino;
    name: string;
    description: string;
    schema: z.ZodObject<{
        liquidityPoolPubKey: z.ZodString;
        isOrca: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        liquidityPoolPubKey: string;
        isOrca: boolean;
    }, {
        liquidityPoolPubKey: string;
        isOrca: boolean;
    }>;
    constructor(kamino: kaminoOperations);
    private derivatePDAVector;
    _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=keminoCreateMemoWithStrategy.tool.d.ts.map
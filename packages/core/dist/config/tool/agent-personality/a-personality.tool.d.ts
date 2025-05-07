import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class PersonalityTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        action: z.ZodEnum<["create", "trade", "convert", "evolve", "delete"]>;
        personalityName: z.ZodString;
        tone: z.ZodString;
        stylePrompt: z.ZodString;
        events: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            data: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            type: string;
            data?: any;
        }, {
            type: string;
            data?: any;
        }>, "many">>>;
        customLogic: z.ZodNullable<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>>;
    }, "strip", z.ZodTypeAny, {
        tone: string;
        stylePrompt: string;
        action: "create" | "trade" | "convert" | "evolve" | "delete";
        personalityName: string;
        events?: {
            type: string;
            data?: any;
        }[] | null | undefined;
        customLogic?: ((args_0: any, ...args: unknown[]) => Promise<any>) | null | undefined;
    }, {
        tone: string;
        stylePrompt: string;
        action: "create" | "trade" | "convert" | "evolve" | "delete";
        personalityName: string;
        events?: {
            type: string;
            data?: any;
        }[] | null | undefined;
        customLogic?: ((args_0: any, ...args: unknown[]) => Promise<any>) | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        action: z.ZodEnum<["create", "trade", "convert", "evolve", "delete"]>;
        personalityName: z.ZodString;
        tone: z.ZodString;
        stylePrompt: z.ZodString;
        events: z.ZodNullable<z.ZodOptional<z.ZodArray<z.ZodObject<{
            type: z.ZodString;
            data: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            type: string;
            data?: any;
        }, {
            type: string;
            data?: any;
        }>, "many">>>;
        customLogic: z.ZodNullable<z.ZodOptional<z.ZodFunction<z.ZodTuple<[z.ZodAny], z.ZodUnknown>, z.ZodPromise<z.ZodAny>>>>;
    }, "strip", z.ZodTypeAny, {
        tone: string;
        stylePrompt: string;
        action: "create" | "trade" | "convert" | "evolve" | "delete";
        personalityName: string;
        events?: {
            type: string;
            data?: any;
        }[] | null | undefined;
        customLogic?: ((args_0: any, ...args: unknown[]) => Promise<any>) | null | undefined;
    }, {
        tone: string;
        stylePrompt: string;
        action: "create" | "trade" | "convert" | "evolve" | "delete";
        personalityName: string;
        events?: {
            type: string;
            data?: any;
        }[] | null | undefined;
        customLogic?: ((args_0: any, ...args: unknown[]) => Promise<any>) | null | undefined;
    }>);
    protected _call(input: z.infer<typeof this.schema>): Promise<string>;
}
//# sourceMappingURL=a-personality.tool.d.ts.map
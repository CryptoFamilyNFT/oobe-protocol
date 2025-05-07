import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";
export declare class SolanaCreateImageTool extends StructuredTool {
    private agent;
    schema: z.ZodObject<{
        prompt: z.ZodString;
        model: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["dall-e-3"]>>>>;
        size: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"]>>>>;
        quality: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["standard", "hd"]>>>>;
        style: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["natural", "vivid"]>>>>;
    }, "strip", z.ZodTypeAny, {
        prompt: string;
        size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null | undefined;
        model?: "dall-e-3" | null | undefined;
        quality?: "standard" | "hd" | null | undefined;
        style?: "natural" | "vivid" | null | undefined;
    }, {
        prompt: string;
        size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null | undefined;
        model?: "dall-e-3" | null | undefined;
        quality?: "standard" | "hd" | null | undefined;
        style?: "natural" | "vivid" | null | undefined;
    }>;
    name: string;
    description: string;
    constructor(agent: Agent, schema?: z.ZodObject<{
        prompt: z.ZodString;
        model: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["dall-e-3"]>>>>;
        size: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"]>>>>;
        quality: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["standard", "hd"]>>>>;
        style: z.ZodNullable<z.ZodOptional<z.ZodDefault<z.ZodEnum<["natural", "vivid"]>>>>;
    }, "strip", z.ZodTypeAny, {
        prompt: string;
        size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null | undefined;
        model?: "dall-e-3" | null | undefined;
        quality?: "standard" | "hd" | null | undefined;
        style?: "natural" | "vivid" | null | undefined;
    }, {
        prompt: string;
        size?: "256x256" | "512x512" | "1024x1024" | "1792x1024" | "1024x1792" | null | undefined;
        model?: "dall-e-3" | null | undefined;
        quality?: "standard" | "hd" | null | undefined;
        style?: "natural" | "vivid" | null | undefined;
    }>);
    private validateInput;
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=createImage.tool.d.ts.map
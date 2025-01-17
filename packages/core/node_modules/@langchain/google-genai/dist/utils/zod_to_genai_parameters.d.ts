import type { z } from "zod";
import { type FunctionDeclarationSchema as GenerativeAIFunctionDeclarationSchema, type SchemaType as FunctionDeclarationSchemaType } from "@google/generative-ai";
export interface GenerativeAIJsonSchema extends Record<string, unknown> {
    properties?: Record<string, GenerativeAIJsonSchema>;
    type: FunctionDeclarationSchemaType;
}
export interface GenerativeAIJsonSchemaDirty extends GenerativeAIJsonSchema {
    properties?: Record<string, GenerativeAIJsonSchemaDirty>;
    additionalProperties?: boolean;
}
export declare function removeAdditionalProperties(obj: Record<string, any>): GenerativeAIJsonSchema;
export declare function zodToGenerativeAIParameters(zodObj: z.ZodType<any>): GenerativeAIFunctionDeclarationSchema;
export declare function jsonSchemaToGeminiParameters(schema: Record<string, any>): GenerativeAIFunctionDeclarationSchema;

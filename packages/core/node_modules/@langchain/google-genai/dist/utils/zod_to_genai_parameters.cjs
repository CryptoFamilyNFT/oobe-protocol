"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonSchemaToGeminiParameters = exports.zodToGenerativeAIParameters = exports.removeAdditionalProperties = void 0;
const zod_to_json_schema_1 = require("zod-to-json-schema");
function removeAdditionalProperties(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
obj) {
    if (typeof obj === "object" && obj !== null) {
        const newObj = { ...obj };
        if ("additionalProperties" in newObj) {
            delete newObj.additionalProperties;
        }
        if ("$schema" in newObj) {
            delete newObj.$schema;
        }
        for (const key in newObj) {
            if (key in newObj) {
                if (Array.isArray(newObj[key])) {
                    newObj[key] = newObj[key].map(removeAdditionalProperties);
                }
                else if (typeof newObj[key] === "object" && newObj[key] !== null) {
                    newObj[key] = removeAdditionalProperties(newObj[key]);
                }
            }
        }
        return newObj;
    }
    return obj;
}
exports.removeAdditionalProperties = removeAdditionalProperties;
function zodToGenerativeAIParameters(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
zodObj) {
    // GenerativeAI doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    const jsonSchema = removeAdditionalProperties((0, zod_to_json_schema_1.zodToJsonSchema)(zodObj));
    const { $schema, ...rest } = jsonSchema;
    return rest;
}
exports.zodToGenerativeAIParameters = zodToGenerativeAIParameters;
function jsonSchemaToGeminiParameters(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
schema) {
    // Gemini doesn't accept either the $schema or additionalProperties
    // attributes, so we need to explicitly remove them.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const jsonSchema = removeAdditionalProperties(schema);
    const { $schema, ...rest } = jsonSchema;
    return rest;
}
exports.jsonSchemaToGeminiParameters = jsonSchemaToGeminiParameters;

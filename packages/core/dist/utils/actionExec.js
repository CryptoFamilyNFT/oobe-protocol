"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionExamples = exports.executeAction = exports.findAction = void 0;
const actions_1 = require("../actions");
/**
 * Find an action by its name or one of its similes
 */
function findAction(query) {
    const normalizedQuery = query.toLowerCase().trim();
    return Object.values(actions_1.Actions.map((n) => n.action)).find((action) => action.name.toLowerCase() === normalizedQuery ||
        action.similes.some((simile) => simile.toLowerCase() === normalizedQuery));
}
exports.findAction = findAction;
/**
 * Execute an action with the given input
 */
async function executeAction(action, agent, input) {
    try {
        // Validate input using Zod schema
        const validatedInput = action.schema.parse(input);
        // Execute the action with validated input
        const result = await action.handler(agent, validatedInput);
        return {
            status: "success",
            ...result,
        };
    }
    catch (error) {
        // Handle Zod validation errors specially
        if (error.errors) {
            return {
                status: "error",
                message: "Validation error",
                details: error.errors,
                code: "VALIDATION_ERROR",
            };
        }
        return {
            status: "error",
            message: error.message,
            code: error.code || "EXECUTION_ERROR",
        };
    }
}
exports.executeAction = executeAction;
/**
 * Get examples for an action
 */
function getActionExamples(action) {
    return action.examples
        .flat()
        .map((example) => {
        return `Input: ${JSON.stringify(example.input, null, 2)}
Output: ${JSON.stringify(example.output, null, 2)}
Explanation: ${example.explanation}
---`;
    })
        .join("\n");
}
exports.getActionExamples = getActionExamples;
//# sourceMappingURL=actionExec.js.map
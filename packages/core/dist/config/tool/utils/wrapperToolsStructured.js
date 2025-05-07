"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapToolWithErrorLogging = wrapToolWithErrorLogging;
exports.wrapAllTools = wrapAllTools;
/**
 * Wrap a single tool with logging for input, output, and error.
 */
function wrapToolWithErrorLogging(tool) {
    const originalCall = tool.call.bind(tool);
    tool.invoke = async function (input) {
        if (tool.name === "get_all_kamino_strategies") {
            return originalCall(input); // Skip logging for this specific tool
        }
        console.log(`🛠️ [${tool.name}] input:`, input);
        try {
            const result = await originalCall(input.args);
            console.log(`🟠 [${tool.name}] output:`, result);
            return result;
        }
        catch (err) {
            console.error(`❌ [${tool.name}] error:`, err);
            throw err;
        }
    };
    return tool;
}
/**
 * Wrap all tools in an array with logging behavior.
 */
function wrapAllTools(tools) {
    return tools.map(wrapToolWithErrorLogging);
}
//# sourceMappingURL=wrapperToolsStructured.js.map
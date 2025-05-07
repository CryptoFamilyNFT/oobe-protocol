import { StructuredTool, Tool } from "langchain/tools";

/**
 * Wrap a single tool with logging for input, output, and error.
 */
export function wrapToolWithErrorLogging<T extends StructuredTool>(tool: T): T {
    const originalCall = tool.call.bind(tool);

    tool.invoke = async function (input: any) {
        if (tool.name === "get_all_kamino_strategies") {
            return originalCall(input); // Skip logging for this specific tool
        }

        console.log(`🛠️ [${tool.name}] input:`, input);
        try {
            const result = await originalCall(input.args);
            console.log(`🟠 [${tool.name}] output:`, result);
            return result;
        } catch (err) {
            console.error(`❌ [${tool.name}] error:`, err);
            throw err;
        }
    };

    return tool;
}

/**
 * Wrap all tools in an array with logging behavior.
 */
export function wrapAllTools<T extends StructuredTool>(tools: T[]): T[] {
  return tools.map(wrapToolWithErrorLogging);
}

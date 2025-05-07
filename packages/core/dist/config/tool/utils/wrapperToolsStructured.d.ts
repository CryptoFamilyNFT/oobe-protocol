import { StructuredTool } from "langchain/tools";
/**
 * Wrap a single tool with logging for input, output, and error.
 */
export declare function wrapToolWithErrorLogging<T extends StructuredTool>(tool: T): T;
/**
 * Wrap all tools in an array with logging behavior.
 */
export declare function wrapAllTools<T extends StructuredTool>(tools: T[]): T[];
//# sourceMappingURL=wrapperToolsStructured.d.ts.map
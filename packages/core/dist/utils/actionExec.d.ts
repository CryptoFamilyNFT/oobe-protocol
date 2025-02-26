import { Agent } from "../agent/Agents";
import { Action } from "../types/action.interface";
/**
 * Find an action by its name or one of its similes
 */
export declare function findAction(query: string): Action | undefined;
/**
 * Execute an action with the given input
 */
export declare function executeAction(action: Action, agent: Agent, input: Record<string, any>): Promise<Record<string, any>>;
/**
 * Get examples for an action
 */
export declare function getActionExamples(action: Action): string;
//# sourceMappingURL=actionExec.d.ts.map
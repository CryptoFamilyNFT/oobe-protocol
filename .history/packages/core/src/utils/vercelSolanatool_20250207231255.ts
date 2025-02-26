import { tool, Tool } from "ai";
import { Agent } from "../agent/Agents";
import { executeAction } from "./actionExec";
import { Actions } from "../actions";

export function createSolanaTools(
  agent: Agent,
): Record<string, Tool> {
  const tools: Record<string, Tool> = {};
  const actionKeys = Object.keys(Actions);

  for (const key of actionKeys) {
    const action = Actions[key as keyof typeof Actions];
    tools[key] = tool({
      id: action.name,
      description: `
      ${action.description}

      Similes: ${action.similes.map(
        (simile) => `
        ${simile}
      `,
      )}
      `.slice(0, 1023),
      parameters: action.schema,
      execute: async (params) =>
        await executeAction(action, agent, params),
    });
  }

  return tools;
}
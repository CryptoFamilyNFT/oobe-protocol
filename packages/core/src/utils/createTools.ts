import { Agent } from '../agent/Agents';
import { tool, type CoreTool } from 'ai';
import { executeAction } from '../utils/actionExec';
import { Actions } from '../actions';

/**
 * 
 * @param _createSolanaTools 
 * @description Create tools for Solana actions on react application, it takes an agent as an argument and has to be implemented in the react application
 * @description todo: change Action with Tools created from the createSolanaTools function
 * @returns Record<string, CoreTool>
 */
export function _createSolanaTools(agent: Agent): Record<string, CoreTool> {
    const allActionsItineraries = Actions.map((action) => {
        return action.action;
    });
    const tools: Record<string, CoreTool> = {};
    console.log(tools)
    const actionKeys = Object.keys(allActionsItineraries);

    for (const key of actionKeys) {
            const action = allActionsItineraries[Number(key)];
            tools[key] = tool({
                
                // @ts-expect-error Value matches type however TS still shows error
                id: `action.${action.action_name}`, // Ensure the id is in the format `${string}.${string}`
                description: `
                ${action.description}

                Similes: ${action.similes?.map(
                    (simile) => `
                    ${simile}`
                ).join('')}
                `.slice(0, 1023),
                parameters: action.schema,
                execute: async (params) => {
                    console.log(`Executing action: ${action} with params:`, params);
                    return await executeAction(action, agent, params);
                },
            });
    }

    return tools;
}

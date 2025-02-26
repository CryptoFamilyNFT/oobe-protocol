"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._createSolanaTools = _createSolanaTools;
const ai_1 = require("ai");
const actionExec_1 = require("../utils/actionExec");
const actions_1 = require("../actions");
/**
 *
 * @param _createSolanaTools
 * @description Create tools for Solana actions on react application, it takes an agent as an argument and has to be implemented in the react application
 * @description todo: change Action with Tools created from the createSolanaTools function
 * @returns Record<string, CoreTool>
 */
function _createSolanaTools(agent) {
    const allActionsItineraries = actions_1.Actions.map((action) => {
        return action.action;
    });
    const tools = {};
    console.log(tools);
    const actionKeys = Object.keys(allActionsItineraries);
    for (const key of actionKeys) {
        const action = allActionsItineraries[Number(key)];
        tools[key] = (0, ai_1.tool)({
            // @ts-expect-error Value matches type however TS still shows error
            id: `action.${action.action_name}`, // Ensure the id is in the format `${string}.${string}`
            description: `
                ${action.description}

                Similes: ${action.similes?.map((simile) => `
                    ${simile}`).join('')}
                `.slice(0, 1023),
            parameters: action.schema,
            execute: async (params) => {
                console.log(`Executing action: ${action} with params:`, params);
                return await (0, actionExec_1.executeAction)(action, agent, params);
            },
        });
    }
    return tools;
}
//# sourceMappingURL=createTools.js.map
import launchPumpfunTokenAction from "./pumpfun/pumpfun.action";
import createImageAction from "./agent/agent.action";
import balanceAction from "./solana/balance.action";
import tokenDataAction from "./tokendata/tokenData";

/*[---import type for action---]*/
import { Action } from "../types/action.interface";

/**
 * 
 * @name launchPumpfunToken
 * @description: Launch Pumpfun Token action
 * @author oobe-protocol
 */
const launchPumpfunToken: IActionsAgent = [
    {
        action_name: "launchPumpfunToken",
        action: launchPumpfunTokenAction,
    },
];

/**
 * 
 * @name createImage
 * @description: Create Image action
 * @author oobe-protocol
 */
const createImage: IActionsAgent = [
    {
        action_name: "createImage",
        action: createImageAction,
    },
];

/**
 * 
 * @name balanceSolanaAction
 * @description: Balance Solana action
 * @author oobe-protocol
 */
const balanceSolanaAction: IActionsAgent = [
    {
        action_name: "balanceAction",
        action: balanceAction,
    }
]

const tokenData: IActionsAgent = [
    {
        action_name: "balanceAction",
        action: tokenDataAction,
    }
]

/**
 * 
 * @type IActionsName
 * @description: Type for action name
 * * @author oobe-protocol
 */
export type IActionsName = string;

/**
 * 
 * @type IActionsAgent
 * @description: Type for actions agent 
 * @author oobe-protocol
 */
export type IActionsAgent = {
    action_name: IActionsName;
    action: Action;
}[];


/**
 * 
 * @name Actions
 * @description: Actions
 * @author oobe-protocol
 */

export const Actions: IActionsAgent = [
    ...launchPumpfunToken,
    ...createImage,
    ...balanceSolanaAction,
    ...tokenData,
];

export type StructuredToolInterface = {
    action_name: string;
    action: Action;
}[];
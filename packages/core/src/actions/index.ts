import launchPumpfunTokenAction from "./pumpfun/pumpfun.action";
import createImageAction from "./agent/agent.action";
import balanceAction from "./solana/balance.action";
import tokenDataAction from "./tokendata/tokenData";

/*[---import type for action---]*/
import { Action } from "../types/action.interface";
import personaAwarenessAction from "./persona/p_evalutate.action";
import codeInIQAction from "./iq/iq.action";
import codeInTextIQAction from "./iq/iq_text.action";
import RayBuy from "./ray/r_buy.action";
import Raysell from "./ray/r_sell.action";
import GetRaydiumTokens from "./ray/r_get.actions";
import token_2022_custom from "./oobe/token_2022_custom.action";
import balanceAllTokensOwnedAction from "./solana/balanceAll.action";
import { checkRugsAction } from "./solana/checkRugs";
import createOrcaCLMMAction from "./orca/orca_create_clmm.action";
import openOrcaSingleSidedPositionAction from "./orca/orca_single_side_pos";
import closeOrcaPositionAction from "./orca/orca_pos_close.action";
import fetchOrcaPositionsAction from "./orca/orca_fetch_position.action";
import createOrcaSingleSidedWhirlpoolAction from "./orca/orca_create_ss_lp.action";
import JupiterBuy from "./jup/jupiter_buy.action";
import JupiterBuyAction from "./jup/jupiter_buy.action";
import JupiterSellAction from "./jup/jupiter_sell.action";

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
 * @name personaAwareness
 * @description: Launch Pumpfun Token action
 * @author oobe-protocol
 */
const personaAwareness: IActionsAgent = [
    {
        action_name: "launchPumpfunToken",
        action: personaAwarenessAction,
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

const iqIscription: IActionsAgent = [
    {
        action_name: "iqImageAction",
        action: codeInIQAction,
    }
]

const iqTextIscription: IActionsAgent = [
    {
        action_name: "iqTextAction",
        action: codeInTextIQAction,
    }
]

const rayBuyToken: IActionsAgent = [
    {
        action_name: "iqTextAction",
        action: RayBuy,
    }
]

const rayGetToken: IActionsAgent = [
    {
        action_name: "iqTextAction",
        action: GetRaydiumTokens,
    }
]

const raySellToken: IActionsAgent = [
    {
        action_name: "iqTextAction",
        action: Raysell,
    }
]

const create2022Token: IActionsAgent = [
    {
        action_name: "create2022Token",
        action: token_2022_custom,
    }
]

const checkAllTokenHeld: IActionsAgent = [
    {
        action_name: "checkAllTokenHeld",
        action: balanceAllTokensOwnedAction,
    }
]

const checkRugs: IActionsAgent = [
    {
        action_name: "checkRugs",
        action: checkRugsAction
    }
]

const createOrcaClmm: IActionsAgent = [
    {
        action_name: "createOrcaClmm",
        action: createOrcaCLMMAction,
    },
]

const openSingleSidePosition: IActionsAgent = [
    {
        action_name: "openSingleSidePosition",
        action: openOrcaSingleSidedPositionAction
    }
]

const closeOrcaPosition: IActionsAgent = [
    {
        action_name: "closeOrcaPosition",
        action: closeOrcaPositionAction
    }
]

const orcaFetchPosition: IActionsAgent = [
    {
        action_name: "orcaFetchPosition",
        action: fetchOrcaPositionsAction
    }
]

const orcaCreateSingleSidedPosition: IActionsAgent = [
    {
        action_name: "orcaCreateSingleSidedPosition",
        action: createOrcaSingleSidedWhirlpoolAction
    }
]

const jupiterBuy: IActionsAgent = [
    {
        action_name: "jupiterBuy",
        action: JupiterBuyAction
    }
]

const jupiterSell: IActionsAgent = [
    {
        action_name: "jupiterSell",
        action: JupiterSellAction
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
    ...personaAwareness,
    ...iqIscription,
    ...iqTextIscription,
    ...rayBuyToken,
    ...raySellToken,
    ...create2022Token,
    ...checkAllTokenHeld,
    ...checkRugs,
    ...createOrcaClmm,
    ...openSingleSidePosition,
    ...closeOrcaPosition,
    ...orcaFetchPosition,
    ...orcaCreateSingleSidedPosition,
    ...jupiterBuy,
    ...jupiterSell,
];

export type StructuredToolInterface = {
    action_name: string;
    action: Action;
}[];
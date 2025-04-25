"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const pumpfun_action_1 = __importDefault(require("./pumpfun/pumpfun.action"));
const agent_action_1 = __importDefault(require("./agent/agent.action"));
const balance_action_1 = __importDefault(require("./solana/balance.action"));
const tokenData_1 = __importDefault(require("./tokendata/tokenData"));
const p_evalutate_action_1 = __importDefault(require("./persona/p_evalutate.action"));
const iq_action_1 = __importDefault(require("./iq/iq.action"));
const iq_text_action_1 = __importDefault(require("./iq/iq_text.action"));
const r_buy_action_1 = __importDefault(require("./ray/r_buy.action"));
const r_sell_action_1 = __importDefault(require("./ray/r_sell.action"));
const r_get_actions_1 = __importDefault(require("./ray/r_get.actions"));
const token_2022_custom_action_1 = __importDefault(require("./oobe/token_2022_custom.action"));
const balanceAll_action_1 = __importDefault(require("./solana/balanceAll.action"));
const checkRugs_1 = require("./solana/checkRugs");
const orca_create_clmm_action_1 = __importDefault(require("./orca/orca_create_clmm.action"));
const orca_single_side_pos_1 = __importDefault(require("./orca/orca_single_side_pos"));
const orca_pos_close_action_1 = __importDefault(require("./orca/orca_pos_close.action"));
const orca_fetch_position_action_1 = __importDefault(require("./orca/orca_fetch_position.action"));
const orca_create_ss_lp_action_1 = __importDefault(require("./orca/orca_create_ss_lp.action"));
const jupiter_buy_action_1 = __importDefault(require("./jup/jupiter_buy.action"));
const jupiter_sell_action_1 = __importDefault(require("./jup/jupiter_sell.action"));
/**
 *
 * @name launchPumpfunToken
 * @description: Launch Pumpfun Token action
 * @author oobe-protocol
 */
const launchPumpfunToken = [
    {
        action_name: "launchPumpfunToken",
        action: pumpfun_action_1.default,
    },
];
/**
 *
 * @name personaAwareness
 * @description: Launch Pumpfun Token action
 * @author oobe-protocol
 */
const personaAwareness = [
    {
        action_name: "launchPumpfunToken",
        action: p_evalutate_action_1.default,
    },
];
/**
 *
 * @name createImage
 * @description: Create Image action
 * @author oobe-protocol
 */
const createImage = [
    {
        action_name: "createImage",
        action: agent_action_1.default,
    },
];
/**
 *
 * @name balanceSolanaAction
 * @description: Balance Solana action
 * @author oobe-protocol
 */
const balanceSolanaAction = [
    {
        action_name: "balanceAction",
        action: balance_action_1.default,
    }
];
const tokenData = [
    {
        action_name: "balanceAction",
        action: tokenData_1.default,
    }
];
const iqIscription = [
    {
        action_name: "iqImageAction",
        action: iq_action_1.default,
    }
];
const iqTextIscription = [
    {
        action_name: "iqTextAction",
        action: iq_text_action_1.default,
    }
];
const rayBuyToken = [
    {
        action_name: "iqTextAction",
        action: r_buy_action_1.default,
    }
];
const rayGetToken = [
    {
        action_name: "iqTextAction",
        action: r_get_actions_1.default,
    }
];
const raySellToken = [
    {
        action_name: "iqTextAction",
        action: r_sell_action_1.default,
    }
];
const create2022Token = [
    {
        action_name: "create2022Token",
        action: token_2022_custom_action_1.default,
    }
];
const checkAllTokenHeld = [
    {
        action_name: "checkAllTokenHeld",
        action: balanceAll_action_1.default,
    }
];
const checkRugs = [
    {
        action_name: "checkRugs",
        action: checkRugs_1.checkRugsAction
    }
];
const createOrcaClmm = [
    {
        action_name: "createOrcaClmm",
        action: orca_create_clmm_action_1.default,
    },
];
const openSingleSidePosition = [
    {
        action_name: "openSingleSidePosition",
        action: orca_single_side_pos_1.default
    }
];
const closeOrcaPosition = [
    {
        action_name: "closeOrcaPosition",
        action: orca_pos_close_action_1.default
    }
];
const orcaFetchPosition = [
    {
        action_name: "orcaFetchPosition",
        action: orca_fetch_position_action_1.default
    }
];
const orcaCreateSingleSidedPosition = [
    {
        action_name: "orcaCreateSingleSidedPosition",
        action: orca_create_ss_lp_action_1.default
    }
];
const jupiterBuy = [
    {
        action_name: "jupiterBuy",
        action: jupiter_buy_action_1.default
    }
];
const jupiterSell = [
    {
        action_name: "jupiterSell",
        action: jupiter_sell_action_1.default
    }
];
/**
 *
 * @name Actions
 * @description: Actions
 * @author oobe-protocol
 */
exports.Actions = [
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
//# sourceMappingURL=index.js.map
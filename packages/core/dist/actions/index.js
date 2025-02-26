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
];
//# sourceMappingURL=index.js.map
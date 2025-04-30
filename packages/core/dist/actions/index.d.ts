import { Action } from "../types/action.interface";
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
export declare const Actions: IActionsAgent;
export type StructuredToolInterface = {
    action_name: string;
    action: Action;
}[];
//# sourceMappingURL=index.d.ts.map
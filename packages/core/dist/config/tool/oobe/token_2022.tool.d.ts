import { Agent } from "../../../agent/Agents";
import { Tool } from "@langchain/core/tools";
export declare class createToken2022Tool extends Tool {
    private agent;
    name: string;
    description: string;
    constructor(agent: Agent);
    private validateInput;
    /**
     * Validates the input parameters for creating a token.
     * @param input - The input parameters to validate.
     * @throws {Error} If any of the input parameters are invalid.
     */
    protected _call(input: string): Promise<string>;
}
//# sourceMappingURL=token_2022.tool.d.ts.map
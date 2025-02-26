import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import Logger from "../../../utils/logger/logger";

export class SolanaCloseEmptyTokenAccounts extends Tool {
  name = "close_empty_token_accounts";
  description = `Close all empty spl-token accounts and reclaim the rent`;
  private logger = new Logger();

  constructor(private agent: Agent) {
    super();
  }

  protected async _call(): Promise<string> {
    try {
      const { signature, size } = await this.agent.closeEmptyTokenAccount();
      this.logger.info(`[oobe-protocol:] Closed ${size} accounts successfully`);
      return JSON.stringify({
        status: "success",
        message: `${size} accounts closed successfully. ${size === 48 ? "48 accounts can be closed in a single transaction try again to close more accounts" : ""}`,
        signature,
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
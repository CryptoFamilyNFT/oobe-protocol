import { StructuredTool, Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import Logger from "../../../utils/logger/logger";
import { z } from "zod";

export class SolanaCloseEmptyTokenAccounts extends StructuredTool {
  name = "close_empty_token_accounts";
  description = `Close all empty spl-token accounts and reclaim the rent`;
  private logger = new Logger();

  constructor(private agent: Agent, override schema = z.object({})) {
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
      if (error instanceof z.ZodError) {
        return JSON.stringify({
          status: "error",
          message: `Invalid input: ${error.message}`,
        });
      }
      return JSON.stringify({
        status: "error",
        message: error.message,
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
}
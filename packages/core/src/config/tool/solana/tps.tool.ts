import { StructuredTool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";
import { z } from "zod";

export class SolanaTPSCalculatorTool extends StructuredTool {
  name = "solana_get_tps";
  description = "Get the current TPS of the Solana network";

  constructor(private agent: Agent, override schema = z.object({})) {
    super();
  }

  async _call(_input: string): Promise<string> {
    try {
      const tps = await this.agent.getTPS();
      return `Solana (mainnet-beta) current transactions per second: ${tps}`;
    } catch (error: any) {
      return `Error fetching TPS: ${error.message}`;
    }
  }
}
import { Tool } from "@langchain/core/tools";
import { Agent } from "../../../agent/Agents";

export class SolanaTPSCalculatorTool extends Tool {
  name = "solana_get_tps";
  description = "Get the current TPS of the Solana network";

  constructor(private agent: Agent) {
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
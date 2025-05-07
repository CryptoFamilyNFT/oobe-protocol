import { SpriteProfile } from "../types/SpriteProfile";
import { EvolutionEngine } from "../engine/EvolutionEngine";
import { MemorySync } from "../state/memorySync";
import { DecisionOracle } from "../logic/DecisionOracle";

export class PersonalityCore {
  constructor(
    public profile: SpriteProfile,
    private memory: MemorySync
  ) {}

  async tick(events: string[]) {
    this.profile = EvolutionEngine.evolve(this.profile, events);
    await this.memory.sync(this.profile);
  }

  decide(tools: string[]): string | undefined {
    return DecisionOracle.decide(this.profile, tools);
  }
}


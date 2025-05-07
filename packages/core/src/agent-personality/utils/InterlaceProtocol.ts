import { SpriteProfile } from "../types/SpriteProfile";
import { EvolutionEngine } from "../engine/EvolutionEngine";

export class InterlaceProtocol {
  static interlace(base: SpriteProfile, overlay: SpriteProfile): SpriteProfile {
    const traitMap = new Map(base.traits.map(t => [t.name, t.value]));

    for (const trait of overlay.traits) {
      const baseVal = traitMap.get(trait.name) || 0;
      traitMap.set(trait.name, (baseVal + trait.value) / 2);
    }

    const newTraits = Array.from(traitMap.entries()).map(([name, value]) => ({ name, value }));

    return {
      ...base,
      traits: newTraits,
      evolutionTrail: [...(base.evolutionTrail || []), ...(overlay.evolutionTrail || [])],
      decisionLogicHash: EvolutionEngine.calculateHash(newTraits),
    };
  }
}
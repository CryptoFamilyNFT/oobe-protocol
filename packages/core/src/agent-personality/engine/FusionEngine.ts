
import { SpriteProfile, Trait } from "../types/SpriteProfile";

export class FusionEngine {
  static fuse(profiles: SpriteProfile[]): SpriteProfile {
    const traitMap: Map<string, number[]> = new Map();

    for (const profile of profiles) {
      for (const trait of profile.traits) {
        const existing = traitMap.get(trait.name) || [];
        existing.push(trait.value);
        traitMap.set(trait.name, existing);
      }
    }

    const fusedTraits: Trait[] = [];
    for (const [name, values] of traitMap.entries()) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      fusedTraits.push({ name, value: parseFloat(avg.toFixed(2)) });
    }

    return {
      id: `sprite:fused:${Date.now()}`,
      name: `Fused Sprite OO-${Date.now()}`,

      stylePrompt: "", // optional styled prompt for the sprite
      emoji: "", // optional description for the sprite
      tone: "", // optional tone for the sprite
      version: "1.0",
      traits: fusedTraits,
      evolutionTrail: [],
      memoryHash: "",
      decisionLogicHash: "",
      visualHash: "🧬"
    };
  }
}
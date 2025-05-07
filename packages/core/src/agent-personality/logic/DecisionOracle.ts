import { SpriteProfile } from "../types/SpriteProfile";

export class DecisionOracle {
  static decide(profile: SpriteProfile, tools: string[]): string | undefined {
    const ranked = tools.sort((a, b) => {
      const aScore = profile.traits.find((t) => a.includes(t.name))?.value || 0;
      const bScore = profile.traits.find((t) => b.includes(t.name))?.value || 0;
      return bScore - aScore;
    });

    return ranked[0];
  }
}
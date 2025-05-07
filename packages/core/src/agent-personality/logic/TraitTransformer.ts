import { Trait } from "../types/SpriteProfile";

export class TraitTransformer {
  static invert(traits: Trait[]): Trait[] {
    return traits.map((t) => ({ name: t.name, value: -t.value }));
  }

  static amplify(traits: Trait[], factor: number): Trait[] {
    return traits.map((t) => ({ name: t.name, value: Math.max(-1, Math.min(1, t.value * factor)) }));
  }

  static normalize(traits: Trait[]): Trait[] {
    const maxAbsValue = Math.max(...traits.map(t => Math.abs(t.value)));
    return traits.map((t) => ({ name: t.name, value: maxAbsValue ? t.value / maxAbsValue : 0 }));
  }
  static randomize(traits: Trait[], range: number): Trait[] {
    return traits.map((t) => ({
      name: t.name,
      value: Math.max(-1, Math.min(1, t.value + (Math.random() * 2 - 1) * range))
    }));
  }
  static interlace(base: Trait[], overlay: Trait[]): Trait[] {
    const traitMap = new Map(base.map(t => [t.name, t.value]));

    for (const trait of overlay) {
      const baseVal = traitMap.get(trait.name) || 0;
      traitMap.set(trait.name, (baseVal + trait.value) / 2);
    }

    return Array.from(traitMap.entries()).map(([name, value]) => ({ name, value }));
  }
  static fuse(profiles: Trait[][]): Trait[] {
    const traitMap: Map<string, number[]> = new Map();

    for (const profile of profiles) {
      for (const trait of profile) {
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

    return fusedTraits;
  }
    static setTraitValue(traits: Trait[], traitName: string, value: number): Trait[] {
      return traits.map((trait) => {
        if (trait.name === traitName) {
          return {
            ...trait,
            value: Math.max(-1, Math.min(1, value))
          };
        }
        return trait;
      });
    }
    static resetTraits(traits: Trait[]): Trait[] {
      return traits.map((trait) => ({
        ...trait,
        value: 0
      }));
    }
    static addTrait(traits: Trait[], traitName: string): Trait[] {
      const newTrait = {
        name: traitName,
        value: 0
      };

      return [...traits, newTrait];
    }
    static removeTrait(traits: Trait[], traitName: string): Trait[] {
      return traits.filter((trait) => trait.name !== traitName);
    }
    static getTraitValue(traits: Trait[], traitName: string): number {
      const trait = traits.find((trait) => trait.name === traitName);
      return trait ? trait.value : 0;
    }
    static getTraitNames(traits: Trait[]): string[] {
      return traits.map((trait) => trait.name);
    }
    static getTotalTraitValues(traits: Trait[]): number[] {
      return traits.map((trait) => trait.value);
    }
    static getAverageTraitValue(traits: Trait[]): number {
      const total = traits.reduce((sum, trait) => sum + trait.value, 0);
      return total / traits.length;
    }
}
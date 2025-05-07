import { SpriteProfile, Trait } from "../types/SpriteProfile";

export class EvolutionEngine {
    static evolve(
      profile: SpriteProfile,
      events: string[],
    ): SpriteProfile {
      const newTraits = profile.traits.map((trait) => {
        const impact = events.filter((e) => e.includes(trait.name)).length * 0.1;
        return {
          ...trait,
          value: Math.max(-1, Math.min(1, trait.value + impact))
        };
      });
  
      const newHash = EvolutionEngine.calculateHash(newTraits);
  
      return {
        ...profile,
        traits: newTraits,
        evolutionTrail: [...(profile.evolutionTrail || []), newHash],
        decisionLogicHash: newHash,
      };
    }
  
    static calculateHash(traits: Trait[]): string {
      return "0x" + traits.map((t) => `${t.name}:${t.value.toFixed(2)}`).join("|");
    }
  
    static resetTraits(profile: SpriteProfile): SpriteProfile {
      const resetTraits = profile.traits.map((trait) => ({
        ...trait,
        value: 0
      }));
  
      return {
        ...profile,
        traits: resetTraits,
        evolutionTrail: [...(profile.evolutionTrail || []), "reset"],
        decisionLogicHash: EvolutionEngine.calculateHash(resetTraits),
      };
    }

    static setTraitValue(profile: SpriteProfile, traitName: string, value: number): SpriteProfile {
      const updatedTraits = profile.traits.map((trait) => {
        if (trait.name === traitName) {
          return {
            ...trait,
            value: Math.max(-1, Math.min(1, value))
          };
        }
        return trait;
      });
  
      return {
        ...profile,
        traits: updatedTraits,
        evolutionTrail: [...(profile.evolutionTrail || []), `set:${traitName}:${value}`],
        decisionLogicHash: EvolutionEngine.calculateHash(updatedTraits),
      };
    }

    static addTrait(profile: SpriteProfile, traitName: string): SpriteProfile {
      const newTrait = {
        name: traitName,
        value: 0
      };
  
      return {
        ...profile,
        traits: [...profile.traits, newTrait],
        evolutionTrail: [...(profile.evolutionTrail || []), `add:${traitName}`],
        decisionLogicHash: EvolutionEngine.calculateHash([...profile.traits, newTrait]),
      };
    }

    static removeTrait(profile: SpriteProfile, traitName: string): SpriteProfile {
      const updatedTraits = profile.traits.filter((trait) => trait.name !== traitName);
  
      return {
        ...profile,
        traits: updatedTraits,
        evolutionTrail: [...(profile.evolutionTrail || []), `remove:${traitName}`],
        decisionLogicHash: EvolutionEngine.calculateHash(updatedTraits),
      };
    }

    static getTraitValue(profile: SpriteProfile, traitName: string): number | undefined {
      const trait = profile.traits.find((trait) => trait.name === traitName);
      return trait ? trait.value : undefined;
    }

    static getAllTraits(profile: SpriteProfile): Trait[] {
      return profile.traits;
    }

    static getEvolutionTrail(profile: SpriteProfile): string[] {
      return profile.evolutionTrail || [];
    }

    static getDecisionLogicHash(profile: SpriteProfile): string {
      return profile.decisionLogicHash || '';
    }

    static getMemoryHash(profile: SpriteProfile): string {
      return profile.memoryHash || '';
    }

    static getVisualHash(profile: SpriteProfile): string {
      return profile.visualHash || '';
    }

    static setVisualHash(profile: SpriteProfile, visualHash: string): SpriteProfile {
      return {
        ...profile,
        visualHash,
      };
    }

    static setMemoryHash(profile: SpriteProfile, memoryHash: string): SpriteProfile {
      return {
        ...profile,
        memoryHash,
      };
    }

    static setDecisionLogicHash(profile: SpriteProfile, decisionLogicHash: string): SpriteProfile {
      return {
        ...profile,
        decisionLogicHash,
      };
    }

    static setEvolutionTrail(profile: SpriteProfile, evolutionTrail: string[]): SpriteProfile {
      return {
        ...profile,
        evolutionTrail,
      };
    }

    static setProfileVersion(profile: SpriteProfile, version: string): SpriteProfile {
      return {
        ...profile,
        version,
      };
    }

        static setProfileId(profile: SpriteProfile, id: string): SpriteProfile {
        return {
            ...profile,
            id,
        };
        }

    static setProfileTraits(profile: SpriteProfile, traits: Trait[]): SpriteProfile {
      return {
        ...profile,
        traits,
      };
    }

    static setProfile(profile: SpriteProfile, newProfile: SpriteProfile): SpriteProfile {
      return {
        ...profile,
        ...newProfile,
      };
    }

    static getProfile(profile: SpriteProfile): SpriteProfile {
      return profile;
    }

    static getProfileId(profile: SpriteProfile): string {
      return profile.id;
    }

    static getProfileVersion(profile: SpriteProfile): string {
      return profile.version;
    }

    static getProfileTraits(profile: SpriteProfile): Trait[] {
      return profile.traits;
    }

    static getProfileEvolutionTrail(profile: SpriteProfile): string[] {
      return profile.evolutionTrail || [];
    }

    static getProfileMemoryHash(profile: SpriteProfile): string {
      return profile.memoryHash || '';
    }

    static getProfileDecisionLogicHash(profile: SpriteProfile): string {
      return profile.decisionLogicHash || '';
    }

    static getProfileVisualHash(profile: SpriteProfile): string {
      return profile.visualHash || '';
    }
  }
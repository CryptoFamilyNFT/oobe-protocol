import { SpriteProfile, Trait } from "../types/SpriteProfile";
export declare class EvolutionEngine {
    static evolve(profile: SpriteProfile, events: string[]): SpriteProfile;
    static calculateHash(traits: Trait[]): string;
    static resetTraits(profile: SpriteProfile): SpriteProfile;
    static setTraitValue(profile: SpriteProfile, traitName: string, value: number): SpriteProfile;
    static addTrait(profile: SpriteProfile, traitName: string): SpriteProfile;
    static removeTrait(profile: SpriteProfile, traitName: string): SpriteProfile;
    static getTraitValue(profile: SpriteProfile, traitName: string): number | undefined;
    static getAllTraits(profile: SpriteProfile): Trait[];
    static getEvolutionTrail(profile: SpriteProfile): string[];
    static getDecisionLogicHash(profile: SpriteProfile): string;
    static getMemoryHash(profile: SpriteProfile): string;
    static getVisualHash(profile: SpriteProfile): string;
    static setVisualHash(profile: SpriteProfile, visualHash: string): SpriteProfile;
    static setMemoryHash(profile: SpriteProfile, memoryHash: string): SpriteProfile;
    static setDecisionLogicHash(profile: SpriteProfile, decisionLogicHash: string): SpriteProfile;
    static setEvolutionTrail(profile: SpriteProfile, evolutionTrail: string[]): SpriteProfile;
    static setProfileVersion(profile: SpriteProfile, version: string): SpriteProfile;
    static setProfileId(profile: SpriteProfile, id: string): SpriteProfile;
    static setProfileTraits(profile: SpriteProfile, traits: Trait[]): SpriteProfile;
    static setProfile(profile: SpriteProfile, newProfile: SpriteProfile): SpriteProfile;
    static getProfile(profile: SpriteProfile): SpriteProfile;
    static getProfileId(profile: SpriteProfile): string;
    static getProfileVersion(profile: SpriteProfile): string;
    static getProfileTraits(profile: SpriteProfile): Trait[];
    static getProfileEvolutionTrail(profile: SpriteProfile): string[];
    static getProfileMemoryHash(profile: SpriteProfile): string;
    static getProfileDecisionLogicHash(profile: SpriteProfile): string;
    static getProfileVisualHash(profile: SpriteProfile): string;
}
//# sourceMappingURL=EvolutionEngine.d.ts.map
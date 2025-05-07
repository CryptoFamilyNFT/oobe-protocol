"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvolutionEngine = void 0;
class EvolutionEngine {
    static evolve(profile, events) {
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
    static calculateHash(traits) {
        return "0x" + traits.map((t) => `${t.name}:${t.value.toFixed(2)}`).join("|");
    }
    static resetTraits(profile) {
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
    static setTraitValue(profile, traitName, value) {
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
    static addTrait(profile, traitName) {
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
    static removeTrait(profile, traitName) {
        const updatedTraits = profile.traits.filter((trait) => trait.name !== traitName);
        return {
            ...profile,
            traits: updatedTraits,
            evolutionTrail: [...(profile.evolutionTrail || []), `remove:${traitName}`],
            decisionLogicHash: EvolutionEngine.calculateHash(updatedTraits),
        };
    }
    static getTraitValue(profile, traitName) {
        const trait = profile.traits.find((trait) => trait.name === traitName);
        return trait ? trait.value : undefined;
    }
    static getAllTraits(profile) {
        return profile.traits;
    }
    static getEvolutionTrail(profile) {
        return profile.evolutionTrail || [];
    }
    static getDecisionLogicHash(profile) {
        return profile.decisionLogicHash || '';
    }
    static getMemoryHash(profile) {
        return profile.memoryHash || '';
    }
    static getVisualHash(profile) {
        return profile.visualHash || '';
    }
    static setVisualHash(profile, visualHash) {
        return {
            ...profile,
            visualHash,
        };
    }
    static setMemoryHash(profile, memoryHash) {
        return {
            ...profile,
            memoryHash,
        };
    }
    static setDecisionLogicHash(profile, decisionLogicHash) {
        return {
            ...profile,
            decisionLogicHash,
        };
    }
    static setEvolutionTrail(profile, evolutionTrail) {
        return {
            ...profile,
            evolutionTrail,
        };
    }
    static setProfileVersion(profile, version) {
        return {
            ...profile,
            version,
        };
    }
    static setProfileId(profile, id) {
        return {
            ...profile,
            id,
        };
    }
    static setProfileTraits(profile, traits) {
        return {
            ...profile,
            traits,
        };
    }
    static setProfile(profile, newProfile) {
        return {
            ...profile,
            ...newProfile,
        };
    }
    static getProfile(profile) {
        return profile;
    }
    static getProfileId(profile) {
        return profile.id;
    }
    static getProfileVersion(profile) {
        return profile.version;
    }
    static getProfileTraits(profile) {
        return profile.traits;
    }
    static getProfileEvolutionTrail(profile) {
        return profile.evolutionTrail || [];
    }
    static getProfileMemoryHash(profile) {
        return profile.memoryHash || '';
    }
    static getProfileDecisionLogicHash(profile) {
        return profile.decisionLogicHash || '';
    }
    static getProfileVisualHash(profile) {
        return profile.visualHash || '';
    }
}
exports.EvolutionEngine = EvolutionEngine;
//# sourceMappingURL=EvolutionEngine.js.map
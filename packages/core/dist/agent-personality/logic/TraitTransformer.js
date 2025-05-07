"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TraitTransformer = void 0;
class TraitTransformer {
    static invert(traits) {
        return traits.map((t) => ({ name: t.name, value: -t.value }));
    }
    static amplify(traits, factor) {
        return traits.map((t) => ({ name: t.name, value: Math.max(-1, Math.min(1, t.value * factor)) }));
    }
    static normalize(traits) {
        const maxAbsValue = Math.max(...traits.map(t => Math.abs(t.value)));
        return traits.map((t) => ({ name: t.name, value: maxAbsValue ? t.value / maxAbsValue : 0 }));
    }
    static randomize(traits, range) {
        return traits.map((t) => ({
            name: t.name,
            value: Math.max(-1, Math.min(1, t.value + (Math.random() * 2 - 1) * range))
        }));
    }
    static interlace(base, overlay) {
        const traitMap = new Map(base.map(t => [t.name, t.value]));
        for (const trait of overlay) {
            const baseVal = traitMap.get(trait.name) || 0;
            traitMap.set(trait.name, (baseVal + trait.value) / 2);
        }
        return Array.from(traitMap.entries()).map(([name, value]) => ({ name, value }));
    }
    static fuse(profiles) {
        const traitMap = new Map();
        for (const profile of profiles) {
            for (const trait of profile) {
                const existing = traitMap.get(trait.name) || [];
                existing.push(trait.value);
                traitMap.set(trait.name, existing);
            }
        }
        const fusedTraits = [];
        for (const [name, values] of traitMap.entries()) {
            const avg = values.reduce((a, b) => a + b, 0) / values.length;
            fusedTraits.push({ name, value: parseFloat(avg.toFixed(2)) });
        }
        return fusedTraits;
    }
    static setTraitValue(traits, traitName, value) {
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
    static resetTraits(traits) {
        return traits.map((trait) => ({
            ...trait,
            value: 0
        }));
    }
    static addTrait(traits, traitName) {
        const newTrait = {
            name: traitName,
            value: 0
        };
        return [...traits, newTrait];
    }
    static removeTrait(traits, traitName) {
        return traits.filter((trait) => trait.name !== traitName);
    }
    static getTraitValue(traits, traitName) {
        const trait = traits.find((trait) => trait.name === traitName);
        return trait ? trait.value : 0;
    }
    static getTraitNames(traits) {
        return traits.map((trait) => trait.name);
    }
    static getTotalTraitValues(traits) {
        return traits.map((trait) => trait.value);
    }
    static getAverageTraitValue(traits) {
        const total = traits.reduce((sum, trait) => sum + trait.value, 0);
        return total / traits.length;
    }
}
exports.TraitTransformer = TraitTransformer;
//# sourceMappingURL=TraitTransformer.js.map
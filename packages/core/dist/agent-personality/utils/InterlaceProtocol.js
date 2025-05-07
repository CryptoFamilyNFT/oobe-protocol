"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterlaceProtocol = void 0;
const EvolutionEngine_1 = require("../engine/EvolutionEngine");
class InterlaceProtocol {
    static interlace(base, overlay) {
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
            decisionLogicHash: EvolutionEngine_1.EvolutionEngine.calculateHash(newTraits),
        };
    }
}
exports.InterlaceProtocol = InterlaceProtocol;
//# sourceMappingURL=InterlaceProtocol.js.map
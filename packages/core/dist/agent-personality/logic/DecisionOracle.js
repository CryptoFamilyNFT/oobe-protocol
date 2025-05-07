"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionOracle = void 0;
class DecisionOracle {
    static decide(profile, tools) {
        const ranked = tools.sort((a, b) => {
            const aScore = profile.traits.find((t) => a.includes(t.name))?.value || 0;
            const bScore = profile.traits.find((t) => b.includes(t.name))?.value || 0;
            return bScore - aScore;
        });
        return ranked[0];
    }
}
exports.DecisionOracle = DecisionOracle;
//# sourceMappingURL=DecisionOracle.js.map
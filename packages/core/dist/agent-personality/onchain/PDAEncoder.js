"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityCore = void 0;
const EvolutionEngine_1 = require("../engine/EvolutionEngine");
const DecisionOracle_1 = require("../logic/DecisionOracle");
class PersonalityCore {
    constructor(profile, memory) {
        this.profile = profile;
        this.memory = memory;
    }
    async tick(events) {
        this.profile = EvolutionEngine_1.EvolutionEngine.evolve(this.profile, events);
        await this.memory.sync(this.profile);
    }
    decide(tools) {
        return DecisionOracle_1.DecisionOracle.decide(this.profile, tools);
    }
}
exports.PersonalityCore = PersonalityCore;
//# sourceMappingURL=PDAEncoder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonalityProfile = exports.AgentPersonality = void 0;
class AgentPersonality {
    static async exportAsOnChainMerkle(profile, agent) {
        const data = {
            id: profile.id,
            traits: profile.traits,
            logic: profile.decisionLogicHash,
            memory: profile.memoryHash,
            visual: profile.visualHash,
            evolution: profile.evolutionTrail,
            version: profile.version,
            name: profile.name,
            tone: profile.tone,
            stylePrompt: profile.stylePrompt,
            emoji: profile.emoji,
            profileHash: profile.profileHash,
        };
        const merkleData = agent.merkleValidate([data], profile);
        await AgentPersonality._retryInscription(agent, merkleData);
    }
    static async _retryInscription(agent, data) {
        try {
            await agent.merkle.onChainMerkleInscription(data);
        }
        catch (err) {
            await agent.merkle.onChainMerkleInscription(data);
        }
    }
}
exports.AgentPersonality = AgentPersonality;
class PersonalityProfile {
    constructor(name, tone, emoji, stylePrompt = "", traits) {
        this.name = name;
        this.tone = tone;
        this.emoji = emoji;
        this.stylePrompt = stylePrompt;
        this.traits = traits;
    }
    static michaelJacksonProfile() {
        return new PersonalityProfile("Michael Jackson", "energetic", "🎤", "Respond like Michael Jackson — enthusiastic, musical, and rhythmic.", {});
    }
}
exports.PersonalityProfile = PersonalityProfile;
//# sourceMappingURL=AgentPersonality.js.map
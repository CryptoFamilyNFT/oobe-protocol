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
    static createPersonalityProfile(name, tone, emoji, stylePrompt = "", traits = {}) {
        return new PersonalityProfile(name, tone, emoji, stylePrompt, traits);
    }
    static createProfileFromObject(obj) {
        const profile = new PersonalityProfile(obj.name, obj.tone, obj.emoji, obj.stylePrompt, obj.traits || {});
        profile.evolutionTrail = obj.evolutionTrail;
        profile.memoryHash = obj.memoryHash;
        profile.decisionLogicHash = obj.decisionLogicHash;
        profile.visualHash = obj.visualHash;
        profile.profileHash = obj.profileHash;
        profile.version = obj.version;
        profile.id = obj.id;
        return profile;
    }
    static createProfileFromJSON(json) {
        const obj = JSON.parse(json);
        return this.createProfileFromObject(obj);
    }
    toJSON() {
        return JSON.stringify({
            name: this.name,
            tone: this.tone,
            emoji: this.emoji,
            stylePrompt: this.stylePrompt,
            traits: this.traits,
            evolutionTrail: this.evolutionTrail,
            memoryHash: this.memoryHash,
            decisionLogicHash: this.decisionLogicHash,
            visualHash: this.visualHash,
            profileHash: this.profileHash,
            version: this.version,
            id: this.id
        });
    }
    toObject() {
        return {
            name: this.name,
            tone: this.tone,
            emoji: this.emoji,
            stylePrompt: this.stylePrompt,
            traits: this.traits,
            evolutionTrail: this.evolutionTrail,
            memoryHash: this.memoryHash,
            decisionLogicHash: this.decisionLogicHash,
            visualHash: this.visualHash,
            profileHash: this.profileHash,
            version: this.version,
            id: this.id
        };
    }
    static fromObject(obj) {
        return this.createProfileFromObject(obj);
    }
    static fromJSON(json) {
        return this.createProfileFromJSON(json);
    }
}
exports.PersonalityProfile = PersonalityProfile;
//# sourceMappingURL=AgentPersonality.js.map
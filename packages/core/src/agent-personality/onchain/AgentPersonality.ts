
import { Agent } from "../../agent/Agents";
import { SpriteProfile } from "../types/SpriteProfile";

export class AgentPersonality {
  static async exportAsOnChainMerkle(profile: SpriteProfile, agent: Agent) {
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

  private static async _retryInscription(agent: Agent, data: any) {
    try {
      await agent.merkle.onChainMerkleInscription(data);
    } catch (err) {
      await agent.merkle.onChainMerkleInscription(data);
    }
  }
}

export class PersonalityProfile {
  name: string;
  tone: string;
  emoji: string;
  stylePrompt: string;
  traits: { [key: string]: number };
  evolutionTrail?: string[];
  memoryHash?: string;
  decisionLogicHash?: string;
  visualHash?: string;
  profileHash?: string;
  version?: string;
  id?: string;

  constructor(name: string, tone: string, emoji: string, stylePrompt: string = "", traits: { [key: string]: number }) {
    this.name = name;
    this.tone = tone;
    this.emoji = emoji;
    this.stylePrompt = stylePrompt;
    this.traits = traits;

  }

  static michaelJacksonProfile(): PersonalityProfile {
    return new PersonalityProfile(
      "Michael Jackson",
      "energetic",
      "🎤",
      "Respond like Michael Jackson — enthusiastic, musical, and rhythmic.",
      {}
    );
  }

  static createPersonalityProfile(
    name: string,
    tone: string,
    emoji: string,
    stylePrompt: string = "",
    traits: { [key: string]: number } = {}
  ): PersonalityProfile {
    return new PersonalityProfile(name, tone, emoji, stylePrompt, traits);
  }
  static createProfileFromObject(obj: any): PersonalityProfile {
    const profile = new PersonalityProfile(
      obj.name,
      obj.tone,
      obj.emoji,
      obj.stylePrompt,
      obj.traits || {}
    );
    profile.evolutionTrail = obj.evolutionTrail;
    profile.memoryHash = obj.memoryHash;
    profile.decisionLogicHash = obj.decisionLogicHash;
    profile.visualHash = obj.visualHash;
    profile.profileHash = obj.profileHash;
    profile.version = obj.version;
    profile.id = obj.id;
    return profile;
  }
  
  static createProfileFromJSON(json: string): PersonalityProfile {
    const obj = JSON.parse(json);
    return this.createProfileFromObject(obj);
  }

  toJSON(): string {
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
  toObject(): any {
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

  static fromObject(obj: any): PersonalityProfile {
    return this.createProfileFromObject(obj);
  }
  static fromJSON(json: string): PersonalityProfile {
    return this.createProfileFromJSON(json);
  }
}

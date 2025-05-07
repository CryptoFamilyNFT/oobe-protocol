
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
}

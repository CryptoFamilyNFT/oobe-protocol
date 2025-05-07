import { Agent } from "../../agent/Agents";
import { SpriteProfile } from "../types/SpriteProfile";
export declare class AgentPersonality {
    static exportAsOnChainMerkle(profile: SpriteProfile, agent: Agent): Promise<void>;
    private static _retryInscription;
}
export declare class PersonalityProfile {
    name: string;
    tone: string;
    emoji: string;
    stylePrompt: string;
    traits: {
        [key: string]: number;
    };
    evolutionTrail?: string[];
    memoryHash?: string;
    decisionLogicHash?: string;
    visualHash?: string;
    profileHash?: string;
    version?: string;
    id?: string;
    constructor(name: string, tone: string, emoji: string, stylePrompt: string | undefined, traits: {
        [key: string]: number;
    });
    static michaelJacksonProfile(): PersonalityProfile;
}
//# sourceMappingURL=AgentPersonality.d.ts.map
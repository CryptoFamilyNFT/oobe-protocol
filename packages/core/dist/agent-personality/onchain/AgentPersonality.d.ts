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
    static createPersonalityProfile(name: string, tone: string, emoji: string, stylePrompt?: string, traits?: {
        [key: string]: number;
    }): PersonalityProfile;
    static createProfileFromObject(obj: any): PersonalityProfile;
    static createProfileFromJSON(json: string): PersonalityProfile;
    toJSON(): string;
    toObject(): any;
    static fromObject(obj: any): PersonalityProfile;
    static fromJSON(json: string): PersonalityProfile;
}
//# sourceMappingURL=AgentPersonality.d.ts.map
export type Trait = {
    name: string;
    value: number; // from -1 (aversive) to 1 (high affinity)
};

export type SpriteProfile = {
    id: string;
    version: string;
    name: string; // optional name for the sprite
    tone: string; // optional tone for the sprite
    stylePrompt: string; // optional styled prompt for the sprite
    emoji?: string | undefined; // optional description for the sprite
    traits: Trait[];
    evolutionTrail?: string[] | undefined; // hash of each evolution
    memoryHash?: string | undefined;
    decisionLogicHash?: string | undefined;
    visualHash?: string | undefined;
    profileHash?: string | undefined; // optional hash for the profile
};



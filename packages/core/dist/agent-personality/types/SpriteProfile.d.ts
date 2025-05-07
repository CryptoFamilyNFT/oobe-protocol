export type Trait = {
    name: string;
    value: number;
};
export type SpriteProfile = {
    id: string;
    version: string;
    name: string;
    tone: string;
    stylePrompt: string;
    emoji?: string | undefined;
    traits: Trait[];
    evolutionTrail?: string[] | undefined;
    memoryHash?: string | undefined;
    decisionLogicHash?: string | undefined;
    visualHash?: string | undefined;
    profileHash?: string | undefined;
};
//# sourceMappingURL=SpriteProfile.d.ts.map
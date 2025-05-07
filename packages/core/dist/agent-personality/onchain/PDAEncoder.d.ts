import { SpriteProfile } from "../types/SpriteProfile";
import { MemorySync } from "../state/memorySync";
export declare class PersonalityCore {
    profile: SpriteProfile;
    private memory;
    constructor(profile: SpriteProfile, memory: MemorySync);
    tick(events: string[]): Promise<void>;
    decide(tools: string[]): string | undefined;
}
//# sourceMappingURL=PDAEncoder.d.ts.map
import { SpriteProfile } from "../types/SpriteProfile";
export declare class MemorySync {
    private store;
    sync(profile: SpriteProfile): Promise<void>;
    get(id: string): SpriteProfile | undefined;
}
//# sourceMappingURL=memorySync.d.ts.map
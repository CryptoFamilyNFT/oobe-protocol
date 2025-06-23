import { SpriteProfile } from "../types/SpriteProfile";
export declare class MemorySync {
    private store;
    sync(profile: SpriteProfile): Promise<void>;
    get(id: string): SpriteProfile | undefined;
    clear(): Promise<void>;
    remove(id: string): Promise<void>;
    getAll(): Promise<SpriteProfile[]>;
    has(id: string): Promise<boolean>;
    getByTrait(traitName: string, traitValue: number): Promise<SpriteProfile[]>;
    getByName(name: string): Promise<SpriteProfile | undefined>;
}
//# sourceMappingURL=memorySync.d.ts.map
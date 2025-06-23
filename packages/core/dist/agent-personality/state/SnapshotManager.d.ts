import { SpriteProfile } from "../types/SpriteProfile";
export declare class SnapshotManager {
    static snapshot(profile: SpriteProfile): string;
    static restore(snapshot: string): SpriteProfile;
    static compareSnapshots(snapshot1: string, snapshot2: string): boolean;
    static getDifferences(snapshot1: string, snapshot2: string): Partial<SpriteProfile>;
    static mergeSnapshots(snapshot1: string, snapshot2: string): SpriteProfile;
    static clearSnapshot(snapshot: string): string;
}
//# sourceMappingURL=SnapshotManager.d.ts.map
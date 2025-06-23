
import { SpriteProfile } from "../types/SpriteProfile";

export class SnapshotManager {
  static snapshot(profile: SpriteProfile): string {
    return JSON.stringify(profile);
  }

  static restore(snapshot: string): SpriteProfile {
    return JSON.parse(snapshot);
  }

  static compareSnapshots(snapshot1: string, snapshot2: string): boolean {
    const profile1 = JSON.parse(snapshot1);
    const profile2 = JSON.parse(snapshot2);
    return JSON.stringify(profile1) === JSON.stringify(profile2);
  }

  static getDifferences(snapshot1: string, snapshot2: string): Partial<SpriteProfile> {
    const profile1 = JSON.parse(snapshot1);
    const profile2 = JSON.parse(snapshot2);
    const differences: Partial<SpriteProfile> = {};

    for (const key in profile1 as SpriteProfile) {
      if (profile1[key as keyof SpriteProfile] !== profile2[key as keyof SpriteProfile]) {
        differences[key as keyof SpriteProfile] = profile2[key as keyof SpriteProfile];
      }
    }
    return differences;
  }

  static mergeSnapshots(snapshot1: string, snapshot2: string): SpriteProfile {
    const profile1 = JSON.parse(snapshot1);
    const profile2 = JSON.parse(snapshot2);
    const mergedProfile: SpriteProfile = { ...profile1, ...profile2 };

    // Ensure traits are merged correctly
    if (profile1.traits && profile2.traits) {
      mergedProfile.traits = { ...profile1.traits, ...profile2.traits };
    }

    return mergedProfile;
  }

  static clearSnapshot(snapshot: string): string {
    const profile = JSON.parse(snapshot);
    const clearedProfile: SpriteProfile = { ...profile, traits: {}, evolutionTrail: [] };
    return JSON.stringify(clearedProfile);
  }

}
// Compare this snippet from packages/sprite-personality/src/engine/DecisionOracle.ts:
//todo: next step is to implement the DecisionOracle class
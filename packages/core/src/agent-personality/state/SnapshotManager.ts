
import { SpriteProfile } from "../types/SpriteProfile";

export class SnapshotManager {
  static snapshot(profile: SpriteProfile): string {
    return JSON.stringify(profile);
  }

  static restore(snapshot: string): SpriteProfile {
    return JSON.parse(snapshot);
  }
}


import { SpriteProfile } from "../types/SpriteProfile";

export class MemorySync {
  private store: Map<string, SpriteProfile> = new Map();

  async sync(profile: SpriteProfile) {
    this.store.set(profile.id, profile);
  }

  get(id: string): SpriteProfile | undefined {
    return this.store.get(id);
  }
}
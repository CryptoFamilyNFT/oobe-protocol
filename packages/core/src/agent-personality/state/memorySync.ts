
import { SpriteProfile } from "../types/SpriteProfile";

export class MemorySync {
  private store: Map<string, SpriteProfile> = new Map();

  async sync(profile: SpriteProfile) {
    this.store.set(profile.id, profile);
  }

  get(id: string): SpriteProfile | undefined {
    return this.store.get(id);
  }

  async clear() {
    this.store.clear();
  }

  async remove(id: string) {
    this.store.delete(id);
  }

  async getAll(): Promise<SpriteProfile[]> {
    return Array.from(this.store.values());
  }

  async has(id: string): Promise<boolean> {
    return this.store.has(id);
  }

  async getByTrait(traitName: string, traitValue: number): Promise<SpriteProfile[]> {
    const results: SpriteProfile[] = [];
    for (const profile of this.store.values()) {
      if (profile.traits.some(t => t.name === traitName && t.value === traitValue)) {
        results.push(profile);
      }
    }
    return results;
  }

  async getByName(name: string): Promise<SpriteProfile | undefined> {
    for (const profile of this.store.values()) {
      if (profile.name === name) {
        return profile;
      }
    }
    return undefined;
  }
}
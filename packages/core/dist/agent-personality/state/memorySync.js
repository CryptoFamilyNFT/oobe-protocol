"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySync = void 0;
class MemorySync {
    constructor() {
        this.store = new Map();
    }
    async sync(profile) {
        this.store.set(profile.id, profile);
    }
    get(id) {
        return this.store.get(id);
    }
    async clear() {
        this.store.clear();
    }
    async remove(id) {
        this.store.delete(id);
    }
    async getAll() {
        return Array.from(this.store.values());
    }
    async has(id) {
        return this.store.has(id);
    }
    async getByTrait(traitName, traitValue) {
        const results = [];
        for (const profile of this.store.values()) {
            if (profile.traits.some(t => t.name === traitName && t.value === traitValue)) {
                results.push(profile);
            }
        }
        return results;
    }
    async getByName(name) {
        for (const profile of this.store.values()) {
            if (profile.name === name) {
                return profile;
            }
        }
        return undefined;
    }
}
exports.MemorySync = MemorySync;
//# sourceMappingURL=memorySync.js.map
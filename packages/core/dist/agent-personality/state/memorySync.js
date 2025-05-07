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
}
exports.MemorySync = MemorySync;
//# sourceMappingURL=memorySync.js.map
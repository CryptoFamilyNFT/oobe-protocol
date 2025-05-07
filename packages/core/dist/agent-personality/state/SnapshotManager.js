"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SnapshotManager = void 0;
class SnapshotManager {
    static snapshot(profile) {
        return JSON.stringify(profile);
    }
    static restore(snapshot) {
        return JSON.parse(snapshot);
    }
}
exports.SnapshotManager = SnapshotManager;
//# sourceMappingURL=SnapshotManager.js.map
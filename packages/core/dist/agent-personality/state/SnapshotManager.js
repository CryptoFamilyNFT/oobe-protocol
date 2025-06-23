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
    static compareSnapshots(snapshot1, snapshot2) {
        const profile1 = JSON.parse(snapshot1);
        const profile2 = JSON.parse(snapshot2);
        return JSON.stringify(profile1) === JSON.stringify(profile2);
    }
    static getDifferences(snapshot1, snapshot2) {
        const profile1 = JSON.parse(snapshot1);
        const profile2 = JSON.parse(snapshot2);
        const differences = {};
        for (const key in profile1) {
            if (profile1[key] !== profile2[key]) {
                differences[key] = profile2[key];
            }
        }
        return differences;
    }
    static mergeSnapshots(snapshot1, snapshot2) {
        const profile1 = JSON.parse(snapshot1);
        const profile2 = JSON.parse(snapshot2);
        const mergedProfile = { ...profile1, ...profile2 };
        // Ensure traits are merged correctly
        if (profile1.traits && profile2.traits) {
            mergedProfile.traits = { ...profile1.traits, ...profile2.traits };
        }
        return mergedProfile;
    }
    static clearSnapshot(snapshot) {
        const profile = JSON.parse(snapshot);
        const clearedProfile = { ...profile, traits: {}, evolutionTrail: [] };
        return JSON.stringify(clearedProfile);
    }
}
exports.SnapshotManager = SnapshotManager;
// Compare this snippet from packages/sprite-personality/src/engine/DecisionOracle.ts:
//todo: next step is to implement the DecisionOracle class
//# sourceMappingURL=SnapshotManager.js.map
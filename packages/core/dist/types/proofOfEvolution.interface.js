"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfEvolutionImpl = void 0;
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
class ProofOfEvolutionImpl {
    constructor(evolutionId, changes) {
        this.evolutionId = evolutionId;
        this.timestamp = Date.now();
        this.changes = changes;
        this.merkleTree = new merkletreejs_1.MerkleTree([(0, crypto_js_1.SHA256)(changes)], crypto_js_1.SHA256);
    }
    generateProof() {
        return this.merkleTree.getRoot().toString('hex');
    }
}
exports.ProofOfEvolutionImpl = ProofOfEvolutionImpl;
//# sourceMappingURL=proofOfEvolution.interface.js.map
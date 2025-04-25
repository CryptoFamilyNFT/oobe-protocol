"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfEvidenceImpl = void 0;
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
class ProofOfEvidenceImpl {
    constructor(evidenceId, data) {
        this.evidenceId = evidenceId;
        this.timestamp = Date.now();
        this.data = data;
        this.merkleTree = new merkletreejs_1.MerkleTree([(0, crypto_js_1.SHA256)(data)], crypto_js_1.SHA256);
    }
    generateProof() {
        return this.merkleTree.getRoot().toString('hex');
    }
}
exports.ProofOfEvidenceImpl = ProofOfEvidenceImpl;
//# sourceMappingURL=proofOfEvidence.interface.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfActionImpl = void 0;
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
class ProofOfActionImpl {
    constructor(actionId, details) {
        this.actionId = actionId;
        this.timestamp = Date.now();
        this.details = details;
        this.merkleTree = new merkletreejs_1.MerkleTree([(0, crypto_js_1.SHA256)(details)], crypto_js_1.SHA256);
    }
    generateProof() {
        return this.merkleTree.getRoot().toString('hex');
    }
}
exports.ProofOfActionImpl = ProofOfActionImpl;
//# sourceMappingURL=proofOfAction.interface.js.map
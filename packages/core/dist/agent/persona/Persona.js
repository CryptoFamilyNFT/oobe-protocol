"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaImpl = void 0;
const proofOfEvolution_interface_1 = require("../../types/proofOfEvolution.interface");
const merkletreejs_1 = require("merkletreejs");
const crypto_js_1 = require("crypto-js");
class PersonaImpl {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.proofsOfAction = [];
        this.proofsOfEvidence = [];
        this.proofsOfEvolution = [];
    }
    addProofOfAction(proof) {
        this.proofsOfAction.push(proof);
        this.evolve();
    }
    addProofOfEvidence(proof) {
        this.proofsOfEvidence.push(proof);
        this.evolve();
    }
    addProofOfEvolution(proof) {
        this.proofsOfEvolution.push(proof);
        this.evolve();
    }
    getProofs() {
        return {
            actions: this.proofsOfAction,
            evidences: this.proofsOfEvidence,
            evolutions: this.proofsOfEvolution
        };
    }
    evolve() {
        const changes = `Evolved at ${new Date().toISOString()}`;
        const proofOfEvolution = new proofOfEvolution_interface_1.ProofOfEvolutionImpl(`evolution-${Date.now()}`, changes);
        this.proofsOfEvolution.push(proofOfEvolution);
    }
    generateMerkleTree() {
        const leaves = [
            ...this.proofsOfAction.map(proof => (0, crypto_js_1.SHA256)(proof.generateProof())),
            ...this.proofsOfEvidence.map(proof => (0, crypto_js_1.SHA256)(proof.generateProof())),
            ...this.proofsOfEvolution.map(proof => (0, crypto_js_1.SHA256)(proof.generateProof()))
        ];
        return new merkletreejs_1.MerkleTree(leaves, crypto_js_1.SHA256);
    }
    async sendToDatabase() {
        const merkleTree = this.generateMerkleTree();
        const root = merkleTree.getRoot().toString('hex');
        const data = {
            id: this.id,
            name: this.name,
            proofs: this.getProofs(),
            merkleRoot: root
        };
        // Simulate sending data to a database
        console.log('Sending data to database:', data);
        // Replace with actual database logic
        // await databaseClient.insert(data);
    }
}
exports.PersonaImpl = PersonaImpl;
//# sourceMappingURL=Persona.js.map
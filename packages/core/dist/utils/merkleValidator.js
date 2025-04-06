"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.merkleValidator = merkleValidator;
const merkle_operation_1 = require("../operations/merkle.operation");
const logger_1 = __importDefault(require("./logger/logger"));
function merkleValidator(agent, input, result) {
    try {
        const merkleTM = new merkle_operation_1.MerkleTreeManager(agent);
        const logger = new logger_1.default();
        merkleTM.addEvent(JSON.stringify(result)); // event1
        merkleTM.addEvent(JSON.stringify(input)); // event2
        const root = merkleTM.getMerkleRoot();
        const proof = merkleTM.getProof(JSON.stringify(result));
        const proofInput = merkleTM.getProof(JSON.stringify(input));
        const events = merkleTM.getEvents();
        const leaf = merkleTM.getLeaf(JSON.stringify(result));
        const leafInput = merkleTM.getLeaf(JSON.stringify(input));
        return result = {
            merkleRoot: root,
            merkleProof: { input: proofInput, result: proof },
            merkleLeaf: { input: leafInput, result: leaf },
            merkleEvents: JSON.stringify(events.map((e) => e.details)),
        };
    }
    catch (error) {
        return result = {
            merkleRoot: null,
            merkleProof: { input: null, result: null },
            merkleLeaf: { input: null, result: null },
            merkleEvents: null,
        };
    }
}
//# sourceMappingURL=merkleValidator.js.map
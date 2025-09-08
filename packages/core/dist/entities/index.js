"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.TokenMetadata = exports.SolanaTransaction = exports.MemorySnapshot = exports.ProofOfEvolution = exports.ProofOfEvidence = exports.ProofOfAction = exports.AgentPersona = void 0;
const AgentPersona_entity_1 = require("./AgentPersona.entity");
const ProofOfAction_entity_1 = require("./ProofOfAction.entity");
const ProofOfEvidence_entity_1 = require("./ProofOfEvidence.entity");
const ProofOfEvolution_entity_1 = require("./ProofOfEvolution.entity");
const MemorySnapshot_entity_1 = require("./MemorySnapshot.entity");
const SolanaTransaction_entity_1 = require("./SolanaTransaction.entity");
const TokenMetadata_entity_1 = require("./TokenMetadata.entity");
var AgentPersona_entity_2 = require("./AgentPersona.entity");
Object.defineProperty(exports, "AgentPersona", { enumerable: true, get: function () { return AgentPersona_entity_2.AgentPersona; } });
var ProofOfAction_entity_2 = require("./ProofOfAction.entity");
Object.defineProperty(exports, "ProofOfAction", { enumerable: true, get: function () { return ProofOfAction_entity_2.ProofOfAction; } });
var ProofOfEvidence_entity_2 = require("./ProofOfEvidence.entity");
Object.defineProperty(exports, "ProofOfEvidence", { enumerable: true, get: function () { return ProofOfEvidence_entity_2.ProofOfEvidence; } });
var ProofOfEvolution_entity_2 = require("./ProofOfEvolution.entity");
Object.defineProperty(exports, "ProofOfEvolution", { enumerable: true, get: function () { return ProofOfEvolution_entity_2.ProofOfEvolution; } });
var MemorySnapshot_entity_2 = require("./MemorySnapshot.entity");
Object.defineProperty(exports, "MemorySnapshot", { enumerable: true, get: function () { return MemorySnapshot_entity_2.MemorySnapshot; } });
var SolanaTransaction_entity_2 = require("./SolanaTransaction.entity");
Object.defineProperty(exports, "SolanaTransaction", { enumerable: true, get: function () { return SolanaTransaction_entity_2.SolanaTransaction; } });
var TokenMetadata_entity_2 = require("./TokenMetadata.entity");
Object.defineProperty(exports, "TokenMetadata", { enumerable: true, get: function () { return TokenMetadata_entity_2.TokenMetadata; } });
// Export all entities in an array for easy TypeORM configuration
exports.entities = [
    AgentPersona_entity_1.AgentPersona,
    ProofOfAction_entity_1.ProofOfAction,
    ProofOfEvidence_entity_1.ProofOfEvidence,
    ProofOfEvolution_entity_1.ProofOfEvolution,
    MemorySnapshot_entity_1.MemorySnapshot,
    SolanaTransaction_entity_1.SolanaTransaction,
    TokenMetadata_entity_1.TokenMetadata,
];
//# sourceMappingURL=index.js.map
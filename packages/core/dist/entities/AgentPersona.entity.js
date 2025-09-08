"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentPersona = void 0;
const typeorm_1 = require("typeorm");
const ProofOfAction_entity_1 = require("./ProofOfAction.entity");
const ProofOfEvidence_entity_1 = require("./ProofOfEvidence.entity");
const ProofOfEvolution_entity_1 = require("./ProofOfEvolution.entity");
const MemorySnapshot_entity_1 = require("./MemorySnapshot.entity");
let AgentPersona = class AgentPersona {
};
exports.AgentPersona = AgentPersona;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AgentPersona.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], AgentPersona.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 88, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], AgentPersona.prototype, "walletAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AgentPersona.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AgentPersona.prototype, "personality", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AgentPersona.prototype, "traits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], AgentPersona.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", String)
], AgentPersona.prototype, "merkleRoot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], AgentPersona.prototype, "evolutionLevel", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], AgentPersona.prototype, "experiencePoints", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], AgentPersona.prototype, "memoryData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], AgentPersona.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], AgentPersona.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], AgentPersona.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProofOfAction_entity_1.ProofOfAction, proof => proof.persona),
    __metadata("design:type", Array)
], AgentPersona.prototype, "proofsOfAction", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProofOfEvidence_entity_1.ProofOfEvidence, proof => proof.persona),
    __metadata("design:type", Array)
], AgentPersona.prototype, "proofsOfEvidence", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProofOfEvolution_entity_1.ProofOfEvolution, proof => proof.persona),
    __metadata("design:type", Array)
], AgentPersona.prototype, "proofsOfEvolution", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => MemorySnapshot_entity_1.MemorySnapshot, snapshot => snapshot.persona),
    __metadata("design:type", Array)
], AgentPersona.prototype, "memorySnapshots", void 0);
exports.AgentPersona = AgentPersona = __decorate([
    (0, typeorm_1.Entity)('agent_personas'),
    (0, typeorm_1.Index)(['walletAddress']),
    (0, typeorm_1.Index)(['name'])
], AgentPersona);
//# sourceMappingURL=AgentPersona.entity.js.map
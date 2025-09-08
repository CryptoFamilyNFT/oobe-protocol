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
exports.ProofOfEvidence = void 0;
const typeorm_1 = require("typeorm");
const AgentPersona_entity_1 = require("./AgentPersona.entity");
let ProofOfEvidence = class ProofOfEvidence {
};
exports.ProofOfEvidence = ProofOfEvidence;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "evidenceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "evidenceData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "sourceType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "sourceUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "hash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ProofOfEvidence.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProofOfEvidence.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ProofOfEvidence.prototype, "confidenceScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "verificationMethod", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProofOfEvidence.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AgentPersona_entity_1.AgentPersona, persona => persona.proofsOfEvidence),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", AgentPersona_entity_1.AgentPersona)
], ProofOfEvidence.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProofOfEvidence.prototype, "persona_id", void 0);
exports.ProofOfEvidence = ProofOfEvidence = __decorate([
    (0, typeorm_1.Entity)('proofs_of_evidence'),
    (0, typeorm_1.Index)(['persona', 'createdAt']),
    (0, typeorm_1.Index)(['evidenceType']),
    (0, typeorm_1.Index)(['sourceType'])
], ProofOfEvidence);
//# sourceMappingURL=ProofOfEvidence.entity.js.map
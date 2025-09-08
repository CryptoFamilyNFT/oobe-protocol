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
exports.ProofOfEvolution = void 0;
const typeorm_1 = require("typeorm");
const AgentPersona_entity_1 = require("./AgentPersona.entity");
let ProofOfEvolution = class ProofOfEvolution {
};
exports.ProofOfEvolution = ProofOfEvolution;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "evolutionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], ProofOfEvolution.prototype, "previousState", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], ProofOfEvolution.prototype, "newState", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], ProofOfEvolution.prototype, "changes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "reasoning", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "trigger", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 1 }),
    __metadata("design:type", Number)
], ProofOfEvolution.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], ProofOfEvolution.prototype, "isReversible", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], ProofOfEvolution.prototype, "impactScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64, nullable: true }),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "merkleProof", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProofOfEvolution.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AgentPersona_entity_1.AgentPersona, persona => persona.proofsOfEvolution),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", AgentPersona_entity_1.AgentPersona)
], ProofOfEvolution.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProofOfEvolution.prototype, "persona_id", void 0);
exports.ProofOfEvolution = ProofOfEvolution = __decorate([
    (0, typeorm_1.Entity)('proofs_of_evolution'),
    (0, typeorm_1.Index)(['persona', 'createdAt']),
    (0, typeorm_1.Index)(['evolutionType']),
    (0, typeorm_1.Index)(['version'])
], ProofOfEvolution);
//# sourceMappingURL=ProofOfEvolution.entity.js.map
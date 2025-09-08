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
exports.ProofOfAction = void 0;
const typeorm_1 = require("typeorm");
const AgentPersona_entity_1 = require("./AgentPersona.entity");
let ProofOfAction = class ProofOfAction {
};
exports.ProofOfAction = ProofOfAction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ProofOfAction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "actionData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], ProofOfAction.prototype, "actionParameters", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 88, nullable: true }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "transactionHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 44, nullable: true }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], ProofOfAction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 44, nullable: true }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "tokenAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "result", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], ProofOfAction.prototype, "isSuccessful", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ProofOfAction.prototype, "gasUsed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ProofOfAction.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ProofOfAction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AgentPersona_entity_1.AgentPersona, persona => persona.proofsOfAction),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", AgentPersona_entity_1.AgentPersona)
], ProofOfAction.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ProofOfAction.prototype, "persona_id", void 0);
exports.ProofOfAction = ProofOfAction = __decorate([
    (0, typeorm_1.Entity)('proofs_of_action'),
    (0, typeorm_1.Index)(['persona', 'createdAt']),
    (0, typeorm_1.Index)(['actionType']),
    (0, typeorm_1.Index)(['transactionHash'])
], ProofOfAction);
//# sourceMappingURL=ProofOfAction.entity.js.map
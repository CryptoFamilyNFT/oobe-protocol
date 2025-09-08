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
exports.MemorySnapshot = void 0;
const typeorm_1 = require("typeorm");
const AgentPersona_entity_1 = require("./AgentPersona.entity");
let MemorySnapshot = class MemorySnapshot {
};
exports.MemorySnapshot = MemorySnapshot;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "snapshotType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], MemorySnapshot.prototype, "memoryData", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 64 }),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "merkleRoot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MemorySnapshot.prototype, "merkleProofs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], MemorySnapshot.prototype, "nodeCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], MemorySnapshot.prototype, "sizeBytes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "compressionMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], MemorySnapshot.prototype, "isCompressed", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], MemorySnapshot.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MemorySnapshot.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => AgentPersona_entity_1.AgentPersona, persona => persona.memorySnapshots),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", AgentPersona_entity_1.AgentPersona)
], MemorySnapshot.prototype, "persona", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], MemorySnapshot.prototype, "persona_id", void 0);
exports.MemorySnapshot = MemorySnapshot = __decorate([
    (0, typeorm_1.Entity)('memory_snapshots'),
    (0, typeorm_1.Index)(['persona', 'createdAt']),
    (0, typeorm_1.Index)(['snapshotType']),
    (0, typeorm_1.Index)(['merkleRoot'])
], MemorySnapshot);
//# sourceMappingURL=MemorySnapshot.entity.js.map
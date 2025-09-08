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
exports.TokenMetadata = void 0;
const typeorm_1 = require("typeorm");
let TokenMetadata = class TokenMetadata {
};
exports.TokenMetadata = TokenMetadata;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TokenMetadata.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 44, unique: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "mintAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "symbol", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "logoUri", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 9 }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "decimals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 30, scale: 9, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "totalSupply", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 30, scale: 9, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "circulatingSupply", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 20, scale: 8, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 30, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "marketCap", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 30, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "volume24h", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 6, nullable: true }),
    __metadata("design:type", Number)
], TokenMetadata.prototype, "priceChange24h", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], TokenMetadata.prototype, "social", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", String)
], TokenMetadata.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], TokenMetadata.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], TokenMetadata.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], TokenMetadata.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Object)
], TokenMetadata.prototype, "extensions", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], TokenMetadata.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], TokenMetadata.prototype, "updatedAt", void 0);
exports.TokenMetadata = TokenMetadata = __decorate([
    (0, typeorm_1.Entity)('token_metadata'),
    (0, typeorm_1.Index)(['mintAddress']),
    (0, typeorm_1.Index)(['symbol']),
    (0, typeorm_1.Index)(['isActive'])
], TokenMetadata);
//# sourceMappingURL=TokenMetadata.entity.js.map
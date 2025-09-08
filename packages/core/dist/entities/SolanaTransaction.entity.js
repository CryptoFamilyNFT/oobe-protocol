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
exports.SolanaTransaction = void 0;
const typeorm_1 = require("typeorm");
let SolanaTransaction = class SolanaTransaction {
};
exports.SolanaTransaction = SolanaTransaction;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 88 }),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "transactionHash", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 44, nullable: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "agentWallet", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 44, nullable: true }),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "blockNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], SolanaTransaction.prototype, "blockTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], SolanaTransaction.prototype, "slot", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 20, default: 'pending' }),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Number)
], SolanaTransaction.prototype, "confirmations", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], SolanaTransaction.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], SolanaTransaction.prototype, "accountKeys", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', default: 0 }),
    __metadata("design:type", Number)
], SolanaTransaction.prototype, "fee", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "memo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], SolanaTransaction.prototype, "logs", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], SolanaTransaction.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], SolanaTransaction.prototype, "balanceChanges", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], SolanaTransaction.prototype, "tokenBalanceChanges", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SolanaTransaction.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SolanaTransaction.prototype, "updatedAt", void 0);
exports.SolanaTransaction = SolanaTransaction = __decorate([
    (0, typeorm_1.Entity)('solana_transactions'),
    (0, typeorm_1.Index)(['agentWallet']),
    (0, typeorm_1.Index)(['transactionHash']),
    (0, typeorm_1.Index)(['blockTime']),
    (0, typeorm_1.Index)(['status'])
], SolanaTransaction);
//# sourceMappingURL=SolanaTransaction.entity.js.map
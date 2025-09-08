"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAgentPersonaTable1730000000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateAgentPersonaTable1730000000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'agent_personas',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '36',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'walletAddress',
                    type: 'varchar',
                    length: '88',
                    isNullable: true,
                },
                {
                    name: 'description',
                    type: 'text',
                    isNullable: true,
                },
                {
                    name: 'personality',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'traits',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'avatar',
                    type: 'varchar',
                    length: '255',
                    isNullable: true,
                },
                {
                    name: 'merkleRoot',
                    type: 'varchar',
                    length: '64',
                    isNullable: true,
                },
                {
                    name: 'evolutionLevel',
                    type: 'int',
                    default: 0,
                },
                {
                    name: 'experiencePoints',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                    default: 0,
                },
                {
                    name: 'memoryData',
                    type: 'json',
                    isNullable: true,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    default: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);
        // Create indexes
        await queryRunner.createIndex('agent_personas', new typeorm_1.TableIndex({
            name: 'IDX_AGENT_PERSONA_WALLET',
            columnNames: ['walletAddress'],
        }));
        await queryRunner.createIndex('agent_personas', new typeorm_1.TableIndex({
            name: 'IDX_AGENT_PERSONA_NAME',
            columnNames: ['name'],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('agent_personas');
    }
}
exports.CreateAgentPersonaTable1730000000000 = CreateAgentPersonaTable1730000000000;
//# sourceMappingURL=1730000000000-CreateAgentPersonaTable.js.map
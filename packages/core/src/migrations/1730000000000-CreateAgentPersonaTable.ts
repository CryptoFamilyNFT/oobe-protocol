import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAgentPersonaTable1730000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    // Create indexes
    await queryRunner.createIndex(
      'agent_personas',
      new TableIndex({
        name: 'IDX_AGENT_PERSONA_WALLET',
        columnNames: ['walletAddress'],
      })
    );

    await queryRunner.createIndex(
      'agent_personas',
      new TableIndex({
        name: 'IDX_AGENT_PERSONA_NAME',
        columnNames: ['name'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agent_personas');
  }
}

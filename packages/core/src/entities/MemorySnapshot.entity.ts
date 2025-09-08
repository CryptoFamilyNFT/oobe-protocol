import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from 'typeorm';
import { AgentPersona } from './AgentPersona.entity';

@Entity('memory_snapshots')
@Index(['persona', 'createdAt'])
@Index(['snapshotType'])
@Index(['merkleRoot'])
export class MemorySnapshot {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  snapshotType!: string;

  @Column({ type: 'json' })
  memoryData!: object;

  @Column({ type: 'varchar', length: 64 })
  merkleRoot!: string;

  @Column({ type: 'json', nullable: true })
  merkleProofs?: object;

  @Column({ type: 'int', default: 0 })
  nodeCount!: number;

  @Column({ type: 'bigint', default: 0 })
  sizeBytes!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  compressionMethod?: string;

  @Column({ type: 'boolean', default: false })
  isCompressed!: boolean;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: object;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => AgentPersona, persona => persona.memorySnapshots)
  @JoinColumn({ name: 'persona_id' })
  persona!: AgentPersona;

  @Column({ type: 'uuid' })
  @Index()
  persona_id!: string;
}

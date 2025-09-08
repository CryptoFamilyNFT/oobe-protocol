import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from 'typeorm';
import { AgentPersona } from './AgentPersona.entity';

@Entity('proofs_of_evolution')
@Index(['persona', 'createdAt'])
@Index(['evolutionType'])
@Index(['version'])
export class ProofOfEvolution {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  evolutionType!: string;

  @Column({ type: 'json' })
  previousState!: object;

  @Column({ type: 'json' })
  newState!: object;

  @Column({ type: 'json' })
  changes!: object;

  @Column({ type: 'text', nullable: true })
  reasoning?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  trigger?: string;

  @Column({ type: 'int', default: 1 })
  version!: number;

  @Column({ type: 'boolean', default: false })
  isReversible!: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  impactScore!: number;

  @Column({ type: 'varchar', length: 64, nullable: true })
  merkleProof?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => AgentPersona, persona => persona.proofsOfEvolution)
  @JoinColumn({ name: 'persona_id' })
  persona!: AgentPersona;

  @Column({ type: 'uuid' })
  @Index()
  persona_id!: string;
}

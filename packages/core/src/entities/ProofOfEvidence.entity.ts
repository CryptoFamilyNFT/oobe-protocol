import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from 'typeorm';
import { AgentPersona } from './AgentPersona.entity';

@Entity('proofs_of_evidence')
@Index(['persona', 'createdAt'])
@Index(['evidenceType'])
@Index(['sourceType'])
export class ProofOfEvidence {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  evidenceType!: string;

  @Column({ type: 'text' })
  evidenceData!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sourceType?: string;

  @Column({ type: 'text', nullable: true })
  sourceUrl?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  hash?: string;

  @Column({ type: 'json', nullable: true })
  metadata?: object;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  confidenceScore!: number;

  @Column({ type: 'text', nullable: true })
  verificationMethod?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => AgentPersona, persona => persona.proofsOfEvidence)
  @JoinColumn({ name: 'persona_id' })
  persona!: AgentPersona;

  @Column({ type: 'uuid' })
  @Index()
  persona_id!: string;
}

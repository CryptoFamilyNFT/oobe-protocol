import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, Index, JoinColumn } from 'typeorm';
import { AgentPersona } from './AgentPersona.entity';

@Entity('proofs_of_action')
@Index(['persona', 'createdAt'])
@Index(['actionType'])
@Index(['transactionHash'])
export class ProofOfAction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  actionType!: string;

  @Column({ type: 'text' })
  actionData!: string;

  @Column({ type: 'json', nullable: true })
  actionParameters?: object;

  @Column({ type: 'varchar', length: 88, nullable: true })
  transactionHash?: string;

  @Column({ type: 'varchar', length: 44, nullable: true })
  blockNumber?: string;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  amount?: number;

  @Column({ type: 'varchar', length: 44, nullable: true })
  tokenAddress?: string;

  @Column({ type: 'text', nullable: true })
  result?: string;

  @Column({ type: 'boolean', default: true })
  isSuccessful!: boolean;

  @Column({ type: 'int', default: 0 })
  gasUsed?: number;

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => AgentPersona, persona => persona.proofsOfAction)
  @JoinColumn({ name: 'persona_id' })
  persona!: AgentPersona;

  @Column({ type: 'uuid' })
  @Index()
  persona_id!: string;
}

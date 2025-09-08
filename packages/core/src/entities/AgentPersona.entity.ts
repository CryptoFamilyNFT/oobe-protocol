import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { ProofOfAction } from './ProofOfAction.entity';
import { ProofOfEvidence } from './ProofOfEvidence.entity';
import { ProofOfEvolution } from './ProofOfEvolution.entity';
import { MemorySnapshot } from './MemorySnapshot.entity';

@Entity('agent_personas')
@Index(['walletAddress'])
@Index(['name'])
export class AgentPersona {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: 88, nullable: true })
  @Index()
  walletAddress?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'json', nullable: true })
  personality?: object;

  @Column({ type: 'json', nullable: true })
  traits?: object;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', length: 64, nullable: true })
  merkleRoot?: string;

  @Column({ type: 'int', default: 0 })
  evolutionLevel!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  experiencePoints!: number;

  @Column({ type: 'json', nullable: true })
  memoryData?: object;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => ProofOfAction, proof => proof.persona)
  proofsOfAction!: ProofOfAction[];

  @OneToMany(() => ProofOfEvidence, proof => proof.persona)
  proofsOfEvidence!: ProofOfEvidence[];

  @OneToMany(() => ProofOfEvolution, proof => proof.persona)
  proofsOfEvolution!: ProofOfEvolution[];

  @OneToMany(() => MemorySnapshot, snapshot => snapshot.persona)
  memorySnapshots!: MemorySnapshot[];
}

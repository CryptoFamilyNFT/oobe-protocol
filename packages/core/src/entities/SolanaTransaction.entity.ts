import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('solana_transactions')
@Index(['agentWallet'])
@Index(['transactionHash'])
@Index(['blockTime'])
@Index(['status'])
export class SolanaTransaction {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 88 })
  transactionHash!: string;

  @Column({ type: 'varchar', length: 44, nullable: true })
  @Index()
  agentWallet?: string;

  @Column({ type: 'varchar', length: 44, nullable: true })
  blockNumber?: string;

  @Column({ type: 'timestamp', nullable: true })
  blockTime?: Date;

  @Column({ type: 'int', default: 0 })
  slot!: number;

  @Column({ type: 'varchar', length: 20, default: 'pending' })
  status!: string; // pending, confirmed, finalized, failed

  @Column({ type: 'int', nullable: true })
  confirmations?: number;

  @Column({ type: 'json', nullable: true })
  instructions?: object[];

  @Column({ type: 'json', nullable: true })
  accountKeys?: string[];

  @Column({ type: 'bigint', default: 0 })
  fee!: number;

  @Column({ type: 'text', nullable: true })
  memo?: string;

  @Column({ type: 'json', nullable: true })
  logs?: string[];

  @Column({ type: 'text', nullable: true })
  errorMessage?: string;

  @Column({ type: 'json', nullable: true })
  balanceChanges?: object[];

  @Column({ type: 'json', nullable: true })
  tokenBalanceChanges?: object[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

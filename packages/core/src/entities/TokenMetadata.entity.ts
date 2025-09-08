import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('token_metadata')
@Index(['mintAddress'])
@Index(['symbol'])
@Index(['isActive'])
export class TokenMetadata {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 44, unique: true })
  mintAddress!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  name?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  symbol?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoUri?: string;

  @Column({ type: 'int', default: 9 })
  decimals!: number;

  @Column({ type: 'decimal', precision: 30, scale: 9, nullable: true })
  totalSupply?: number;

  @Column({ type: 'decimal', precision: 30, scale: 9, nullable: true })
  circulatingSupply?: number;

  @Column({ type: 'decimal', precision: 20, scale: 8, nullable: true })
  price?: number;

  @Column({ type: 'decimal', precision: 30, scale: 2, nullable: true })
  marketCap?: number;

  @Column({ type: 'decimal', precision: 30, scale: 2, nullable: true })
  volume24h?: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  priceChange24h?: number;

  @Column({ type: 'json', nullable: true })
  social?: object;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website?: string;

  @Column({ type: 'boolean', default: true })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'json', nullable: true })
  tags?: string[];

  @Column({ type: 'json', nullable: true })
  extensions?: object;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

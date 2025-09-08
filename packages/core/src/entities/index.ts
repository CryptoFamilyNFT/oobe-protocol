import { AgentPersona } from './AgentPersona.entity';
import { ProofOfAction } from './ProofOfAction.entity';
import { ProofOfEvidence } from './ProofOfEvidence.entity';
import { ProofOfEvolution } from './ProofOfEvolution.entity';
import { MemorySnapshot } from './MemorySnapshot.entity';
import { SolanaTransaction } from './SolanaTransaction.entity';
import { TokenMetadata } from './TokenMetadata.entity';

export { AgentPersona } from './AgentPersona.entity';
export { ProofOfAction } from './ProofOfAction.entity';
export { ProofOfEvidence } from './ProofOfEvidence.entity';
export { ProofOfEvolution } from './ProofOfEvolution.entity';
export { MemorySnapshot } from './MemorySnapshot.entity';
export { SolanaTransaction } from './SolanaTransaction.entity';
export { TokenMetadata } from './TokenMetadata.entity';

// Export all entities in an array for easy TypeORM configuration
export const entities = [
  AgentPersona,
  ProofOfAction,
  ProofOfEvidence,
  ProofOfEvolution,
  MemorySnapshot,
  SolanaTransaction,
  TokenMetadata,
];

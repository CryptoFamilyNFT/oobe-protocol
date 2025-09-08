-- CreateTable
CREATE TABLE "agent_personas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "walletAddress" TEXT,
    "description" TEXT,
    "personality" JSONB,
    "traits" JSONB,
    "avatar" TEXT,
    "merkleRoot" TEXT,
    "evolutionLevel" INTEGER NOT NULL DEFAULT 0,
    "experiencePoints" REAL NOT NULL DEFAULT 0,
    "memoryData" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "proofs_of_action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actionType" TEXT NOT NULL,
    "actionData" TEXT NOT NULL,
    "actionParameters" JSONB,
    "transactionHash" TEXT,
    "blockNumber" TEXT,
    "amount" REAL,
    "tokenAddress" TEXT,
    "result" TEXT,
    "isSuccessful" BOOLEAN NOT NULL DEFAULT true,
    "gasUsed" INTEGER DEFAULT 0,
    "errorMessage" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personaId" TEXT NOT NULL,
    CONSTRAINT "proofs_of_action_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "agent_personas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "proofs_of_evidence" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "evidenceType" TEXT NOT NULL,
    "evidenceData" TEXT NOT NULL,
    "sourceType" TEXT,
    "sourceUrl" TEXT,
    "hash" TEXT,
    "metadata" JSONB,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "confidenceScore" REAL NOT NULL DEFAULT 0,
    "verificationMethod" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personaId" TEXT NOT NULL,
    CONSTRAINT "proofs_of_evidence_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "agent_personas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "proofs_of_evolution" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "evolutionType" TEXT NOT NULL,
    "previousState" JSONB NOT NULL,
    "newState" JSONB NOT NULL,
    "changes" JSONB NOT NULL,
    "reasoning" TEXT,
    "trigger" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isReversible" BOOLEAN NOT NULL DEFAULT false,
    "impactScore" REAL NOT NULL DEFAULT 0,
    "merkleProof" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personaId" TEXT NOT NULL,
    CONSTRAINT "proofs_of_evolution_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "agent_personas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "memory_snapshots" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "snapshotType" TEXT NOT NULL,
    "memoryData" JSONB NOT NULL,
    "merkleRoot" TEXT NOT NULL,
    "merkleProofs" JSONB,
    "nodeCount" INTEGER NOT NULL DEFAULT 0,
    "sizeBytes" BIGINT NOT NULL DEFAULT 0,
    "compressionMethod" TEXT,
    "isCompressed" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personaId" TEXT NOT NULL,
    CONSTRAINT "memory_snapshots_personaId_fkey" FOREIGN KEY ("personaId") REFERENCES "agent_personas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "solana_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "transactionHash" TEXT NOT NULL,
    "agentWallet" TEXT,
    "blockNumber" TEXT,
    "blockTime" DATETIME,
    "slot" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "confirmations" INTEGER,
    "instructions" JSONB,
    "accountKeys" JSONB,
    "fee" BIGINT NOT NULL DEFAULT 0,
    "memo" TEXT,
    "logs" JSONB,
    "errorMessage" TEXT,
    "balanceChanges" JSONB,
    "tokenBalanceChanges" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "token_metadata" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "mintAddress" TEXT NOT NULL,
    "name" TEXT,
    "symbol" TEXT,
    "description" TEXT,
    "logoUri" TEXT,
    "decimals" INTEGER NOT NULL DEFAULT 9,
    "totalSupply" REAL,
    "circulatingSupply" REAL,
    "price" REAL,
    "marketCap" REAL,
    "volume24h" REAL,
    "priceChange24h" REAL,
    "social" JSONB,
    "website" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "tags" JSONB,
    "extensions" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "agent_personas_name_key" ON "agent_personas"("name");

-- CreateIndex
CREATE INDEX "agent_personas_walletAddress_idx" ON "agent_personas"("walletAddress");

-- CreateIndex
CREATE INDEX "agent_personas_name_idx" ON "agent_personas"("name");

-- CreateIndex
CREATE INDEX "proofs_of_action_personaId_createdAt_idx" ON "proofs_of_action"("personaId", "createdAt");

-- CreateIndex
CREATE INDEX "proofs_of_action_actionType_idx" ON "proofs_of_action"("actionType");

-- CreateIndex
CREATE INDEX "proofs_of_action_transactionHash_idx" ON "proofs_of_action"("transactionHash");

-- CreateIndex
CREATE INDEX "proofs_of_evidence_personaId_createdAt_idx" ON "proofs_of_evidence"("personaId", "createdAt");

-- CreateIndex
CREATE INDEX "proofs_of_evidence_evidenceType_idx" ON "proofs_of_evidence"("evidenceType");

-- CreateIndex
CREATE INDEX "proofs_of_evidence_sourceType_idx" ON "proofs_of_evidence"("sourceType");

-- CreateIndex
CREATE INDEX "proofs_of_evolution_personaId_createdAt_idx" ON "proofs_of_evolution"("personaId", "createdAt");

-- CreateIndex
CREATE INDEX "proofs_of_evolution_evolutionType_idx" ON "proofs_of_evolution"("evolutionType");

-- CreateIndex
CREATE INDEX "proofs_of_evolution_version_idx" ON "proofs_of_evolution"("version");

-- CreateIndex
CREATE INDEX "memory_snapshots_personaId_createdAt_idx" ON "memory_snapshots"("personaId", "createdAt");

-- CreateIndex
CREATE INDEX "memory_snapshots_snapshotType_idx" ON "memory_snapshots"("snapshotType");

-- CreateIndex
CREATE INDEX "memory_snapshots_merkleRoot_idx" ON "memory_snapshots"("merkleRoot");

-- CreateIndex
CREATE INDEX "solana_transactions_agentWallet_idx" ON "solana_transactions"("agentWallet");

-- CreateIndex
CREATE INDEX "solana_transactions_transactionHash_idx" ON "solana_transactions"("transactionHash");

-- CreateIndex
CREATE INDEX "solana_transactions_blockTime_idx" ON "solana_transactions"("blockTime");

-- CreateIndex
CREATE INDEX "solana_transactions_status_idx" ON "solana_transactions"("status");

-- CreateIndex
CREATE UNIQUE INDEX "token_metadata_mintAddress_key" ON "token_metadata"("mintAddress");

-- CreateIndex
CREATE INDEX "token_metadata_mintAddress_idx" ON "token_metadata"("mintAddress");

-- CreateIndex
CREATE INDEX "token_metadata_symbol_idx" ON "token_metadata"("symbol");

-- CreateIndex
CREATE INDEX "token_metadata_isActive_idx" ON "token_metadata"("isActive");

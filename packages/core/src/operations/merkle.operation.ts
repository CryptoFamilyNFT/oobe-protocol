import { MerkleTree } from 'merkletreejs';
import { SHA256 } from 'crypto-js';
import { MerkleValidatorResult } from '../utils/merkleValidator';
import { Agent } from '../agent/Agents';
import { ComputeBudgetProgram, Connection, Keypair, PublicKey, Signer, SystemProgram, SYSVAR_RENT_PUBKEY, Transaction, TransactionInstruction } from '@solana/web3.js';
import { MEMO_PROGRAM_ID } from '@raydium-io/raydium-sdk-v2';
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet';
import { trimTrailingZeros } from '../utils/clearBuffer';
import { ConfigManager } from '../config/default';
import { SolanaRpcClient } from '../utils/SmartRoundRobinRPC';
import { sleep } from '@kamino-finance/kliquidity-sdk';

interface Event {
  id: string;
  timestamp: number;
  details: string;
}

export interface MemoDbLastChunk {
  content: string;
}

export interface MemoDbIntermediateChunk {
  content: string;
  prevSign: string;
}

export interface ZeroChunk {
  leaf1: string; // First 64 bytes (Merkle Leaf 1)
  leaf2: string; // Second 64 bytes (Merkle Leaf 2)
  prevSign: string; // Remaining {64 + 24} bytes (Signature) (base58)
}

export class MerkleTreeManager {
  private events: Event[];
  private merkleTree: MerkleTree | null;
  private agent: Agent;

  constructor(agent: Agent) {
    this.events = [];
    this.merkleTree = null;
    this.agent = agent;
  }

  addEvent(details: string): void {
    const event: Event = {
      id: `event-${Date.now()}`,
      timestamp: Date.now(),
      details: details,
    };
    this.events.push(event);
    this.updateMerkleTree();
  }

  convertLeafToString(leaf: string): string {
    return leaf; // L'hash è già in formato esadecimale leggibile
  }

  private updateMerkleTree(): void {
    let leaves = this.events.map(event => SHA256(event.details).toString());

    // Aggiungie un nodo fittizio se c'è solo un evento
    if (leaves.length === 1) {
      leaves.push(SHA256("dummy").toString());
    }

    this.merkleTree = new MerkleTree(leaves, SHA256);
  }

  getMerkleRoot(): string | null {
    return this.merkleTree ? this.merkleTree.getRoot().toString('hex') : null;
  }


  getProof(eventDetails: string): string[] | null {
    if (!this.merkleTree) return null;

    const leaf = SHA256(eventDetails).toString();

    const proof = this.merkleTree.getProof(leaf).map(proof => proof.data.toString('hex'));

    return proof;
  }

  getOriginalDataFromLeaf(leaf: string): Record<string, any> | null {
    // Cerca l'evento corrispondente al leaf hash
    const event = this.events.find(event => SHA256(event.details).toString() === leaf);

    if (!event) {
      return null;
    }

    try {
      // Converte i dettagli dell'evento in un oggetto JSON
      const originalData = JSON.parse(event.details);
      return originalData;
    } catch (error) {
      return null;
    }
  }

  getLeaf(eventDetails: string): string | null {
    if (!this.merkleTree) return null;
    const leaf = SHA256(eventDetails);
    return leaf.toString();
  }

  getEvents(): any {
    return this.events;
  }

  verifyEvent(eventDetails: string): boolean {
    if (!this.merkleTree) return false;
    const leaf = SHA256(eventDetails).toString();
    const proof = this.merkleTree.getProof(leaf).map(proof => proof.data.toString('hex'));
    //console.log("Verifying Event - Leaf:", leaf); // Logga il nodo
    //console.log("Verifying Event - Proof:", proof); // Logga la proof
    return this.merkleTree.verify(proof, leaf, this.merkleTree.getRoot());
  }

  createMerkle(data: any) {

    const leaves = data.map((item: any) => SHA256(item).toString());
    this.merkleTree = new MerkleTree(leaves, SHA256);

    return this.merkleTree.getRoot().toString('hex');
  }

  async sendTx(programId: PublicKey, wallet: PublicKey, pda: PublicKey, bump: number, data_size: number): Promise<Transaction> {
    const dataBuffer = Buffer.alloc(5); // Allocate a buffer of 5 bytes
    dataBuffer.writeUInt8(0, 0); // First byte is the instruction identifier (0 for initialization)
    dataBuffer.writeUInt32LE(data_size, 1); // Next 4 bytes are the data size in little-endian format

    const tx = new Transaction().add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: wallet,
            isSigner: true,
            isWritable: true,
          },
          {
            pubkey: pda,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: SYSVAR_RENT_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        data: dataBuffer,
        programId: programId,
      }),
    );

    return tx;
  }

  async onChainPDAPersonality(wallet: PublicKey, connection: Connection) {
    const programId = new PublicKey("11111111111111111111111111111111");
    const personalitySeed = "personality";
    const rpcClient = new SolanaRpcClient()

    const [DB, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from(SHA256(`${personalitySeed}_db` + wallet.toBase58()).toString().slice(0, 32), 'hex')],
      programId,
    );

    const [ROOT, _bump] = PublicKey.findProgramAddressSync(
      [Buffer.from(SHA256(`${personalitySeed}_root` + wallet.toBase58()).toString().slice(0, 32), 'hex')],
      programId,
    );


    let root_pda: PublicKey | null = ROOT;
    let db_pda: PublicKey | null = DB;

    if (!root_pda) {
      // Create and derive the PDAs allocating space
      const data_size = 1024;

      const tx = await this.sendTx(programId, wallet, root_pda, bump, data_size);
      const latestBlockhash = await new SolanaRpcClient().getLatestBlockhash();
      tx.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;

      tx.feePayer = wallet;
      const signer = new NodeWallet(this.agent.wallet).payer;
      tx.partialSign(signer);
      const serializedTransaction = tx.serialize({ requireAllSignatures: false });
      await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });
    }
    if (!db_pda) {
      // Create and derive the PDAs allocating space
      const data_size = 1024;

      const tx = await this.sendTx(programId, wallet, db_pda, bump, data_size);
      const latestBlockhash = await new SolanaRpcClient().getLatestBlockhash();
      tx.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;

      tx.feePayer = wallet;
      const signer = new NodeWallet(this.agent.wallet).payer;
      tx.partialSign(signer);
      const serializedTransaction = tx.serialize({ requireAllSignatures: false });
      await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });
    }
    return {
      personalityROOT_PDA: root_pda,
      personalityDB_PDA: db_pda,
    };
  }

  async onChainPDAccounts(wallet: PublicKey, connection: Connection) {
    const programId = new PublicKey("11111111111111111111111111111111");
    const { merkleDbSeed, merkleRootSeed } = new ConfigManager().getDefaultConfig();
    const rpcClient = new SolanaRpcClient()

    const [LeafPDA, bump] = PublicKey.findProgramAddressSync(
      [Buffer.from(SHA256(`${merkleDbSeed}@` + wallet.toBase58()).toString().slice(0, 32), 'hex')],
      programId,
    );

    const [RootPDA, bumpRoot] = PublicKey.findProgramAddressSync(
      [Buffer.from(SHA256(`${merkleRootSeed}@` + wallet.toBase58()).toString().slice(0, 32), 'hex')],
      programId,
    );

    //console.log("Bump:", bump);
    //console.log("Bump Root:", bumpRoot);

    let leaf: PublicKey | null = LeafPDA;
    let root: PublicKey | null = RootPDA;

    if (!leaf || !root) {
      // Create and derive the PDAs allocating space
      const data_size = 1024;

      const txLeaf = await this.sendTx(programId, wallet, LeafPDA, bump, data_size);
      const txRoot = await this.sendTx(programId, wallet, RootPDA, bumpRoot, data_size);

      const latestBlockhash = await new SolanaRpcClient().getLatestBlockhash();
      txLeaf.recentBlockhash = typeof latestBlockhash === 'string' ? latestBlockhash : latestBlockhash.blockhash;

      txLeaf.feePayer = wallet;
      const signer = new NodeWallet(this.agent.wallet).payer;
      txLeaf.partialSign(signer);
      const serializedTransaction = txLeaf.serialize({ requireAllSignatures: false });
      await rpcClient.sendRawTransaction(serializedTransaction, { skipPreflight: true, preflightCommitment: 'processed' });

      await sleep(2000);

      const _latestBlockhash = await new SolanaRpcClient().getLatestBlockhash();
      txRoot.recentBlockhash = typeof _latestBlockhash === 'string' ? _latestBlockhash : _latestBlockhash.blockhash;

      txRoot.feePayer = wallet;
      txRoot.partialSign(signer);
      const serializedTxRoot = txRoot.serialize({ requireAllSignatures: false });
      await rpcClient.sendRawTransaction(serializedTxRoot, { skipPreflight: true, preflightCommitment: 'processed' });
    }

    return {
      dbAccountStore: LeafPDA,
      dbAccountRoot: RootPDA,
    };
  }

  async sendCustomDataTx(
    wallet: PublicKey,
    data: Buffer,
    connection: Connection,
    pda: PublicKey,
    signer: Keypair,
  ) {
    const rpcClient = new SolanaRpcClient()
    const instruction = SystemProgram.transfer({
      fromPubkey: wallet,
      toPubkey: pda,
      lamports: 0, // No lamports transferred, just storing data
    });

    //console.log("data bytes:", data.length);

    const memoInstruction = new TransactionInstruction({
      keys: [{ pubkey: wallet, isSigner: true, isWritable: false }],
      programId: MEMO_PROGRAM_ID,
      data, // Ensure data is a UTF-8 encoded string
    });

    const transaction = new Transaction().add(
      ComputeBudgetProgram.setComputeUnitLimit({ units: 600_000 }),
      ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 1 }), // Add priority fees
      instruction,
      memoInstruction
    );
    const nodeWallet = new NodeWallet(this.agent.wallet).payer;

    transaction.feePayer = nodeWallet.publicKey;
    const latestBlockhash = await rpcClient.getLatestBlockhash();

    transaction.recentBlockhash = typeof latestBlockhash !== 'string' ? latestBlockhash.blockhash : latestBlockhash;
    try {
      const signature = await connection.sendTransaction(transaction, [signer], {
        skipPreflight: false,
        preflightCommitment: 'processed',
      });
      return signature;
    } catch (e: any) {
      const message = e.message || '';
      const match = message.match(/signature: '([a-zA-Z0-9]+)'/);
      if (match) return match[1];
      throw e;
    }
  }

  calculateChunksFromBuffer(buffer: Buffer, minChunkSize: number = 1, maxChunkSize: number = 1231): Buffer[] {
    const adjustedMaxChunkSize = maxChunkSize - 64; // Adjust max chunk size for all chunks except the last
    const chunks: Buffer[] = [];
    let currentChunkSize = minChunkSize;

    for (let i = 0; i < buffer.length; i += currentChunkSize) {
      const remainingBytes = buffer.length - i;
      if (remainingBytes <= maxChunkSize) {
        // For the last chunk, use the normal max chunk size
        currentChunkSize = Math.min(Math.max(minChunkSize, remainingBytes), maxChunkSize);
      } else {
        // For all other chunks, use the adjusted max chunk size
        currentChunkSize = Math.min(Math.max(minChunkSize, remainingBytes), adjustedMaxChunkSize);
      }
      const chunk = buffer.subarray(i, i + currentChunkSize);
      chunks.push(chunk);
    }

    const totalBytes = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    return chunks;
  }

  async onChainMerklePersonalityInscription(data: MerkleValidatorResult): Promise<any> {
    const connection = this.agent.connection;
    const wallet = this.agent.wallet.publicKey;

    const { personalityDB_PDA, personalityROOT_PDA } = await this.onChainPDAPersonality(wallet, connection);
    if (!personalityDB_PDA || !personalityROOT_PDA) {
      return;
    }
    const { input, result } = data.merkleLeaf;
    const compressedEvent = data.merkleEvents;

    if (!input || !result || !compressedEvent) {
      return;
    }

    const _zeroChunk = Buffer.alloc(128); // Allocate a buffer of 64 bytes

    Buffer.from(input, 'hex').copy(_zeroChunk, 0); // Copy the 32-byte act hash into the first half
    Buffer.from(result, 'hex').copy(_zeroChunk, 64); // Copy the 32-byte res hash into the second half
 
    const _events = trimTrailingZeros(Buffer.from(compressedEvent, 'utf-8'));
    const totalChunks = this.calculateChunksFromBuffer(_events, 1, 560);
    const chunks = [...totalChunks, _zeroChunk];
    let prevSign: string | null = null;
    let zeroChunkSign: string | null = null;
    // Process each chunk in the transaction chain
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      const isFirstChunk = index === 0;
      const isLastChunk = index === chunks.length - 1;
      
      let _tx;

      if (isFirstChunk && !isLastChunk && chunks.length >= 2) {
        _tx = await this.sendCustomDataTx(
          wallet,
          chunk,
          connection,
          personalityDB_PDA,
          this.agent.wallet,
        );
        prevSign = _tx; // Remember this signature for linking the next chunk
      }

      if (isLastChunk && !isFirstChunk && prevSign) {
        Buffer.from(prevSign ?? '', 'hex').copy(_zeroChunk, 64); // th

        const act = chunk.subarray(0, 32);
        const res = chunk.subarray(64, 96);

        const tx = await this.sendCustomDataTx(
          wallet,
          Buffer.from(act.toString('hex') + '|' + res.toString('hex') + '|' + prevSign?.toString()),
          connection,
          personalityDB_PDA,
          this.agent.wallet,
        );
        prevSign = tx; // Update prevSign to current chunk's signature
        zeroChunkSign = tx; // Store the signature of the last chunk
      } else if (!isFirstChunk && !isLastChunk && prevSign) {
        const combinedIntermediateBuffer = Buffer.alloc(chunk.length + 64);
        chunk.copy(combinedIntermediateBuffer, chunk.length);
        Buffer.from(prevSign ?? '', 'hex').copy(combinedIntermediateBuffer, 64);

        if (chunks.length <= 1) {
          _tx = await this.sendCustomDataTx(
            wallet,
            chunk,
            connection,
            personalityDB_PDA,
            this.agent.wallet,
          );
          prevSign = _tx
        } else {
          const tx = await this.sendCustomDataTx(
            wallet,
            Buffer.from(prevSign + '|' + chunk.toString('utf-8')),
            connection,
            personalityDB_PDA,
            this.agent.wallet,
          );
          prevSign = tx; // Update prevSign to current chunk's signature
        }
      }
    }

    const signatureRoot = await this.sendCustomDataTx(
      wallet,
      Buffer.from(JSON.stringify({ root: data.merkleRoot, proofSignature: zeroChunkSign })),
      connection,
      personalityROOT_PDA,
      this.agent.wallet,
    );

    return {
      personalityDB_PDA,
      zeroChunkSign,
      signatureRoot,
      merkleRoot: data.merkleRoot,
      merkleProof: data.merkleProof,
      merkleLeaf: data.merkleLeaf,
      merkleEvents: data.merkleEvents,
    };
  }

  async onChainMerkleInscription(data: MerkleValidatorResult): Promise<any> {
    const connection = this.agent.connection
    const wallet = this.agent.wallet.publicKey;

    //check if the wallet have the DB account to store the events and check if the wallet have the DB account to store the signature of the events trx and the root merkle

    const { dbAccountStore, dbAccountRoot } = await this.onChainPDAccounts(wallet, connection);

    if (!dbAccountStore || !dbAccountRoot) {
      return;
    }

    const { input, result } = data.merkleLeaf
    const compressedEvent = data.merkleEvents;

    if (!input || !result || !compressedEvent) {
      return;
    }

    const _zeroChunk = Buffer.alloc(128); // Allocate a buffer of 64 bytes
    Buffer.from(input, 'hex').copy(_zeroChunk, 0); // Copy the 32-byte act hash into the first half
    Buffer.from(result, 'hex').copy(_zeroChunk, 64); // Copy the 32-byte res hash into the second half
    // Codifica compressedEvent in formato binario (Base64)

    // console.log("[BEFORE] - TOTAL EVENTS BYTES:", _events.length);
    // console.log("[BEFORE] - TOTAL EVENTS:", _events);
    // console.log("[BEFORE] - TOTAL ZERO CHUNK BYTES:", _zeroChunk.length);

    // console.log("[BEFORE] - Zero chunk init length:", _zeroChunk.toString('hex'));
    // console.log("[BEFORE] - Init Events total chunk size:", _events.toString('hex'));

    const _events = trimTrailingZeros(Buffer.from(compressedEvent, 'utf-8'));
    // const offset = _events.length;
    const totalChunks = this.calculateChunksFromBuffer(_events, 1, 560);

    // console.log("[after chunk buffer] - Zero chunk length:", `${zeroChunk.length}`, ' chunkInsideSize:', `${zeroChunk.map(chunk => chunk.length)}`);
    // console.log("[after chunk buffer] - Total chunk length:", `${totalChunks.length}`, ' chunkInsideSize:', `${totalChunks.map(chunk => chunk.length)}`);

    const chunks = [...totalChunks, _zeroChunk];
    let prevSign: string | null = null;
    let zeroChunkSign: string | null = null;

    // Process each chunk in the transaction chain
    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];
      const isFirstChunk = index === 0;
      const isLastChunk = index === chunks.length - 1;

      let _tx;

      if (isFirstChunk && !isLastChunk && chunks.length >= 2) {

        _tx = await this.sendCustomDataTx(
          wallet,
          chunk,
          connection,
          dbAccountStore,
          this.agent.wallet,
        );

        // Simulate the transaction with the first chunk
        //console.log("First chunk data:", firstChunkStruct, "Signature:", _tx);
        // For the first chunk, no prevSign reference needed.
        prevSign = _tx; // Remember this signature for linking the next chunk
      }

      if (isLastChunk && !isFirstChunk && prevSign) {
        // Last chunk: attach the previous transaction's signature (prevSign)
        Buffer.from(prevSign ?? '', 'hex').copy(_zeroChunk, 64); // th

        const act = chunk.subarray(0, 32);
        const res = chunk.subarray(64, 96);

        // console.log("Last chunk data -", "Signature:", prevSign);

        const tx = await this.sendCustomDataTx(
          wallet,
          Buffer.from(act.toString('hex') + '|' + res.toString('hex') + '|' + prevSign?.toString()),
          connection,
          dbAccountStore,
          this.agent.wallet,
        );
        prevSign = tx; // Update prevSign to current chunk's signature
        zeroChunkSign = tx; // Store the signature of the last chunk
      } else if (!isFirstChunk && !isLastChunk && prevSign) {
        const combinedIntermediateBuffer = Buffer.alloc(chunk.length + 64);
        chunk.copy(combinedIntermediateBuffer, chunk.length);
        Buffer.from(prevSign ?? '', 'hex').copy(combinedIntermediateBuffer, 64);

        // Intermediate chunks: link to the previous chunk's signature
        if (chunks.length <= 1) {
          _tx = await this.sendCustomDataTx(
            wallet,
            chunk,
            connection,
            dbAccountStore,
            this.agent.wallet,
          );
          prevSign = _tx
        } else {
          const tx = await this.sendCustomDataTx(
            wallet,
            Buffer.from(prevSign + '|' + chunk.toString('utf-8')),
            connection,
            dbAccountStore,
            this.agent.wallet,
          );
          prevSign = tx; // Update prevSign to current chunk's signature
        }
      }
    }


    const signatureRoot = await this.sendCustomDataTx(
      wallet,
      Buffer.from(JSON.stringify({ root: data.merkleRoot, proofSignature: zeroChunkSign })),
      connection,
      dbAccountRoot,
      this.agent.wallet,
    );


    return {
      dbAccountStore,
      dbAccountRoot,
      zeroChunkSign,
      signatureRoot,
      merkleRoot: data.merkleRoot,
      merkleProof: data.merkleProof,
      merkleLeaf: data.merkleLeaf,
      merkleEvents: data.merkleEvents,
    };
  }
}
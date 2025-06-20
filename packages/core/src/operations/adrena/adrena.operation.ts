import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
import { TOKEN_PROGRAM_ID } from "spl-v1";
import { BN } from "@coral-xyz/anchor";
import { TOKENS, DEFAULT_OPTIONS } from "../../config/var";
import AdrenaClient from "../../utils/adrena/adrena_client";

const PRICE_DECIMALS = 10;
const ADRENA_PROGRAM_ID = new PublicKey(
  "13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet",
);

const feeTiers = {
  low: 0.1,
  mid: 0.5,
  high: 0.9,
};

async function getComputeBudgetInstructions(
  agent: Agent,
  instructions: TransactionInstruction[],
  feeTier: keyof typeof feeTiers,
): Promise<{
  blockhash: string;
  computeBudgetLimitInstruction: TransactionInstruction;
  computeBudgetPriorityFeeInstructions: TransactionInstruction;
}> {
  const { blockhash, lastValidBlockHeight } =
    await agent.connection.getLatestBlockhash();
  const messageV0 = new TransactionMessage({
    payerKey: agent.wallet.publicKey,
    recentBlockhash: blockhash,
    instructions: instructions,
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);
  const simulatedTx = agent.connection.simulateTransaction(transaction);
  const estimatedComputeUnits = (await simulatedTx).value.unitsConsumed;
  const safeComputeUnits = Math.ceil(
    estimatedComputeUnits
      ? Math.max(estimatedComputeUnits + 100000, estimatedComputeUnits * 1.2)
      : 200000,
  );
  const computeBudgetLimitInstruction =
    ComputeBudgetProgram.setComputeUnitLimit({
      units: safeComputeUnits,
    });

  let priorityFee: number;

  // Use default implementation for priority fee calculation
  priorityFee = await agent.connection
    .getRecentPrioritizationFees()
    .then(
      (fees) =>
        fees.sort((a, b) => a.prioritizationFee - b.prioritizationFee)[
          Math.floor(fees.length * feeTiers[feeTier])
        ].prioritizationFee,
    );

  const computeBudgetPriorityFeeInstructions =
    ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: priorityFee,
    });

  return {
    blockhash,
    computeBudgetLimitInstruction,
    computeBudgetPriorityFeeInstructions,
  };
}


async function sendTx(
  agent: Agent,
  instructions: TransactionInstruction[],
  otherKeypairs?: Keypair[],
) {
  const ixComputeBudget = await getComputeBudgetInstructions(
    agent,
    instructions,
    "mid",
  );
  const allInstructions = [
    ixComputeBudget.computeBudgetLimitInstruction,
    ixComputeBudget.computeBudgetPriorityFeeInstructions,
    ...instructions,
  ];
  const messageV0 = new TransactionMessage({
    payerKey: agent.wallet.publicKey,
    recentBlockhash: ixComputeBudget.blockhash,
    instructions: allInstructions,
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);
  transaction.sign([agent.wallet, ...(otherKeypairs ?? [])] as Signer[]);

  const timeoutMs = 90000;
  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const transactionStartTime = Date.now();

    const signature = await agent.connection.sendTransaction(transaction, {
      maxRetries: 0,
      skipPreflight: false,
    });

    const statuses = await agent.connection.getSignatureStatuses([signature]);
    if (statuses.value[0]) {
      if (!statuses.value[0].err) {
        return signature;
      } else {
        throw new Error(
          `Transaction failed: ${statuses.value[0].err.toString()}`,
        );
      }
    }

    const elapsedTime = Date.now() - transactionStartTime;
    const remainingTime = Math.max(0, 1000 - elapsedTime);
    if (remainingTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
  }
  throw new Error("Transaction timeout");
}

function applySlippage(nb: BN, percentage: number): BN {
  const negative = percentage < 0 ? true : false;

  // Do x10_000 so percentage can be up to 4 decimals
  const percentageBN = new BN(
    (negative ? percentage * -1 : percentage) * 10_000,
  );

  const delta = nb.mul(percentageBN).divRound(new BN(10_000 * 100));

  return negative ? nb.sub(delta) : nb.add(delta);
}

/**
 * Close short trade on Adrena
 * @returns Transaction signature
 */
export async function closePerpTradeShort({
  agent,
  price,
  tradeMint,
}: {
  agent: Agent;
  price: number;
  tradeMint: PublicKey;
}) {
  const client = await AdrenaClient.load(agent);

  const owner = agent.wallet.publicKey;

  const custody = client.getCustodyByMint(tradeMint);
  const collateralCustody = client.getCustodyByMint(TOKENS.USDC);

  const stakingRewardTokenCustodyAccount = client.getCustodyByMint(
    AdrenaClient.stakingRewardTokenMint,
  );

  const stakingRewardTokenCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(
      AdrenaClient.stakingRewardTokenMint,
    );

  const position = AdrenaClient.findPositionAddress(
    owner,
    custody.pubkey,
    "long",
  );

  const userProfilePda = AdrenaClient.getUserProfilePda(owner);

  const userProfile =
    await client.program.account.userProfile.fetchNullable(userProfilePda);

  const receivingAccount = AdrenaClient.findATAAddressSync(
    owner,
    collateralCustody.mint,
  );

  const preInstructions: TransactionInstruction[] = [];

  const collateralCustodyOracle = collateralCustody.oracle;
  const collateralCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(collateralCustody.mint);

  if (
    !(await AdrenaClient.isAccountInitialized(
      agent.connection,
      receivingAccount,
    ))
  ) {
    preInstructions.push(
      AdrenaClient.createATAInstruction({
        ataAddress: receivingAccount,
        mint: collateralCustody.mint,
        owner,
      }),
    );
  }

  const instruction = await client.program.methods
    .closePositionShort({
      price: new BN(price * 10 ** PRICE_DECIMALS),
    })
    .accountsStrict({
      owner,
      receivingAccount,
      transferAuthority: AdrenaClient.transferAuthority,
      pool: AdrenaClient.mainPool,
      position: position,
      custody: custody.pubkey,
      custodyTradeOracle: custody.tradeOracle,
      tokenProgram: TOKEN_PROGRAM_ID,
      lmStaking: AdrenaClient.lmStaking,
      lpStaking: AdrenaClient.lpStaking,
      cortex: AdrenaClient.cortex,
      stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
      stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
      stakingRewardTokenCustodyTokenAccount,
      lmStakingRewardTokenVault: AdrenaClient.lmStakingRewardTokenVault,
      lpStakingRewardTokenVault: AdrenaClient.lpStakingRewardTokenVault,
      lpTokenMint: AdrenaClient.lpTokenMint,
      protocolFeeRecipient: client.cortex.protocolFeeRecipient,
      adrenaProgram: AdrenaClient.programId,
      userProfile: userProfile ? userProfilePda : null,
      caller: owner,
      collateralCustody: collateralCustody.pubkey,
      collateralCustodyOracle,
      collateralCustodyTokenAccount,
    })
    .instruction();

  return sendTx(agent, [...preInstructions, instruction]);
}

/**
 * Close long trade on Adrena
 * @returns Transaction signature
 */
export async function closePerpTradeLong({
  agent,
  price,
  tradeMint,
}: {
  agent: Agent;
  price: number;
  tradeMint: PublicKey;
}) {
  const client = await AdrenaClient.load(agent);

  const owner = agent.wallet.publicKey;

  const custody = client.getCustodyByMint(tradeMint);

  const custodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(tradeMint);

  const stakingRewardTokenCustodyAccount = client.getCustodyByMint(
    AdrenaClient.stakingRewardTokenMint,
  );

  const stakingRewardTokenCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(
      AdrenaClient.stakingRewardTokenMint,
    );

  const position = AdrenaClient.findPositionAddress(
    owner,
    custody.pubkey,
    "long",
  );

  const userProfilePda = AdrenaClient.getUserProfilePda(owner);

  const userProfile =
    await client.program.account.userProfile.fetchNullable(userProfilePda);

  const receivingAccount = AdrenaClient.findATAAddressSync(owner, custody.mint);

  const preInstructions: TransactionInstruction[] = [];

  if (
    !(await AdrenaClient.isAccountInitialized(
      agent.connection,
      receivingAccount,
    ))
  ) {
    preInstructions.push(
      AdrenaClient.createATAInstruction({
        ataAddress: receivingAccount,
        mint: custody.mint,
        owner,
      }),
    );
  }

  const instruction = await client.program.methods
    .closePositionLong({
      price: new BN(price * 10 ** PRICE_DECIMALS),
    })
    .accountsStrict({
      owner,
      receivingAccount,
      transferAuthority: AdrenaClient.transferAuthority,
      pool: AdrenaClient.mainPool,
      position: position,
      custody: custody.pubkey,
      custodyTokenAccount,
      custodyOracle: custody.oracle,
      custodyTradeOracle: custody.tradeOracle,
      tokenProgram: TOKEN_PROGRAM_ID,
      lmStaking: AdrenaClient.lmStaking,
      lpStaking: AdrenaClient.lpStaking,
      cortex: AdrenaClient.cortex,
      stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
      stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
      stakingRewardTokenCustodyTokenAccount,
      lmStakingRewardTokenVault: AdrenaClient.lmStakingRewardTokenVault,
      lpStakingRewardTokenVault: AdrenaClient.lpStakingRewardTokenVault,
      lpTokenMint: AdrenaClient.lpTokenMint,
      protocolFeeRecipient: client.cortex.protocolFeeRecipient,
      adrenaProgram: AdrenaClient.programId,
      userProfile: userProfile ? userProfilePda : null,
      caller: owner,
    })
    .instruction();

  return sendTx(agent, [...preInstructions, instruction]);
}

/**
 * Open long trade on Adrena
 *
 * Note: provide the same token as collateralMint and as tradeMint to avoid swap
 * @returns Transaction signature
 */
export async function openPerpTradeLong({
  agent,
  price,
  collateralAmount,
  collateralMint = TOKENS.jitoSOL,
  leverage = DEFAULT_OPTIONS.LEVERAGE_BPS,
  tradeMint = TOKENS.jitoSOL,
  slippage = 0.3,
}: {
  agent: Agent;
  price: number;
  collateralAmount: number;
  collateralMint?: PublicKey;
  leverage?: number;
  tradeMint?: PublicKey;
  slippage?: number;
}): Promise<string> {
  const client = await AdrenaClient.load(agent);

  const owner = agent.wallet.publicKey;

  const collateralAccount = AdrenaClient.findATAAddressSync(owner, tradeMint);
  const fundingAccount = AdrenaClient.findATAAddressSync(owner, collateralMint);

  const receivingCustody = AdrenaClient.findCustodyAddress(collateralMint);
  const receivingCustodyOracle = client.getCustodyByMint(collateralMint).oracle;
  const receivingCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(collateralMint);

  // Principal custody is the custody of the targeted token
  // i.e open a 1 ETH long position, principal custody is ETH
  const principalCustody = AdrenaClient.findCustodyAddress(tradeMint);
  const principalCustodyAccount = client.getCustodyByMint(tradeMint);
  const principalCustodyOracle = principalCustodyAccount.oracle;
  const principalCustodyTradeOracle = principalCustodyAccount.tradeOracle;
  const principalCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(tradeMint);

  const stakingRewardTokenCustodyAccount = client.getCustodyByMint(
    AdrenaClient.stakingRewardTokenMint,
  );

  const stakingRewardTokenCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(
      AdrenaClient.stakingRewardTokenMint,
    );

  const position = AdrenaClient.findPositionAddress(
    owner,
    principalCustody,
    "long",
  );

  const userProfilePda = AdrenaClient.getUserProfilePda(owner);

  const userProfile =
    await client.program.account.userProfile.fetchNullable(userProfilePda);

  const priceWithSlippage = applySlippage(
    new BN(price * 10 ** PRICE_DECIMALS),
    slippage,
  );

  const scaledCollateralAmount = new BN(
    collateralAmount *
    Math.pow(10, client.getCustodyByMint(collateralMint).decimals),
  );

  const preInstructions: TransactionInstruction[] = [];

  if (
    !(await AdrenaClient.isAccountInitialized(
      agent.connection,
      collateralAccount,
    ))
  ) {
    preInstructions.push(
      AdrenaClient.createATAInstruction({
        ataAddress: collateralAccount,
        mint: tradeMint,
        owner,
      }),
    );
  }

  const instruction = await client.program.methods
    .openOrIncreasePositionWithSwapLong({
      price: priceWithSlippage,
      collateral: scaledCollateralAmount,
      leverage,
      referrer: null,
    })
    .accountsStrict({
      owner,
      payer: owner,
      fundingAccount,
      collateralAccount,
      receivingCustody,
      receivingCustodyOracle,
      receivingCustodyTokenAccount,
      principalCustody,
      principalCustodyOracle,
      principalCustodyTradeOracle,
      principalCustodyTokenAccount,
      transferAuthority: AdrenaClient.transferAuthority,
      cortex: AdrenaClient.cortex,
      lmStaking: AdrenaClient.lmStaking,
      lpStaking: AdrenaClient.lpStaking,
      pool: AdrenaClient.mainPool,
      position,
      stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
      stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
      stakingRewardTokenCustodyTokenAccount,
      lmStakingRewardTokenVault: AdrenaClient.lmStakingRewardTokenVault,
      lpStakingRewardTokenVault: AdrenaClient.lpStakingRewardTokenVault,
      lpTokenMint: AdrenaClient.lpTokenMint,
      userProfile: userProfile ? userProfilePda : null,
      protocolFeeRecipient: client.cortex.protocolFeeRecipient,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      adrenaProgram: ADRENA_PROGRAM_ID,
    })
    .instruction();

  return sendTx(agent, [...preInstructions, instruction]);
}

/**
 * Open short trade on Adrena
 *
 * Note: provide USDC as collateralMint to avoid swap
 * @returns Transaction signature
 */
export async function openPerpTradeShort({
  agent,
  price,
  collateralAmount,
  collateralMint = TOKENS.USDC,
  leverage = DEFAULT_OPTIONS.LEVERAGE_BPS,
  tradeMint = TOKENS.jitoSOL,
  slippage = 0.3,
}: {
  agent: Agent;
  price: number;
  collateralAmount: number;
  collateralMint?: PublicKey;
  leverage?: number;
  tradeMint?: PublicKey;
  slippage?: number;
}): Promise<string> {
  const client = await AdrenaClient.load(agent);

  const owner = agent.wallet.publicKey;

  const collateralAccount = AdrenaClient.findATAAddressSync(owner, tradeMint);
  const fundingAccount = AdrenaClient.findATAAddressSync(owner, collateralMint);

  const receivingCustody = AdrenaClient.findCustodyAddress(collateralMint);
  const receivingCustodyOracle = client.getCustodyByMint(collateralMint).oracle;
  const receivingCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(collateralMint);

  // Principal custody is the custody of the targeted token
  // i.e open a 1 BTC short position, principal custody is BTC
  const principalCustody = AdrenaClient.findCustodyAddress(tradeMint);
  const principalCustodyAccount = client.getCustodyByMint(tradeMint);
  const principalCustodyTradeOracle = principalCustodyAccount.tradeOracle;
  const principalCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(tradeMint);

  const usdcAta = AdrenaClient.findATAAddressSync(owner, TOKENS.USDC);

  const preInstructions: TransactionInstruction[] = [];

  if (!(await AdrenaClient.isAccountInitialized(agent.connection, usdcAta))) {
    preInstructions.push(
      AdrenaClient.createATAInstruction({
        ataAddress: usdcAta,
        mint: TOKENS.USDC,
        owner,
      }),
    );
  }

  // Custody used to provide collateral when opening the position
  // Should be a stable token, by default, use USDC
  const instructionCollateralMint = TOKENS.USDC;

  const collateralCustody = AdrenaClient.findCustodyAddress(
    instructionCollateralMint,
  );
  const collateralCustodyOracle = client.getCustodyByMint(
    instructionCollateralMint,
  ).oracle;

  const collateralCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(instructionCollateralMint);

  const stakingRewardTokenCustodyAccount = client.getCustodyByMint(
    AdrenaClient.stakingRewardTokenMint,
  );

  const stakingRewardTokenCustodyTokenAccount =
    AdrenaClient.findCustodyTokenAccountAddress(
      AdrenaClient.stakingRewardTokenMint,
    );

  const position = AdrenaClient.findPositionAddress(
    owner,
    principalCustody,
    "long",
  );

  const userProfilePda = AdrenaClient.getUserProfilePda(owner);

  const userProfile =
    await client.program.account.userProfile.fetchNullable(userProfilePda);

  const priceWithSlippage = applySlippage(
    new BN(price * 10 ** PRICE_DECIMALS),
    slippage,
  );

  const scaledCollateralAmount = new BN(
    collateralAmount *
    Math.pow(10, client.getCustodyByMint(collateralMint).decimals),
  );

  const instruction = await client.program.methods
    .openOrIncreasePositionWithSwapShort({
      price: priceWithSlippage,
      collateral: scaledCollateralAmount,
      leverage,
      referrer: null,
    })
    .accountsStrict({
      owner,
      payer: owner,
      fundingAccount,
      collateralAccount,
      receivingCustody,
      receivingCustodyOracle,
      receivingCustodyTokenAccount,
      principalCustody,
      principalCustodyTradeOracle,
      principalCustodyTokenAccount,
      collateralCustody,
      collateralCustodyOracle,
      collateralCustodyTokenAccount,
      transferAuthority: AdrenaClient.transferAuthority,
      cortex: AdrenaClient.cortex,
      lmStaking: AdrenaClient.lmStaking,
      lpStaking: AdrenaClient.lpStaking,
      pool: AdrenaClient.mainPool,
      position,
      stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
      stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
      stakingRewardTokenCustodyTokenAccount,
      lmStakingRewardTokenVault: AdrenaClient.lmStakingRewardTokenVault,
      lpStakingRewardTokenVault: AdrenaClient.lpStakingRewardTokenVault,
      lpTokenMint: AdrenaClient.lpTokenMint,
      userProfile: userProfile ? userProfilePda : null,
      protocolFeeRecipient: client.cortex.protocolFeeRecipient,
      systemProgram: SystemProgram.programId,
      tokenProgram: TOKEN_PROGRAM_ID,
      adrenaProgram: ADRENA_PROGRAM_ID,
    })
    .instruction();

  return sendTx(agent, [...preInstructions, instruction]);
}
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closePerpTradeShort = closePerpTradeShort;
exports.closePerpTradeLong = closePerpTradeLong;
exports.openPerpTradeLong = openPerpTradeLong;
exports.openPerpTradeShort = openPerpTradeShort;
const web3_js_1 = require("@solana/web3.js");
const spl_v1_1 = require("spl-v1");
const anchor_1 = require("@coral-xyz/anchor");
const var_1 = require("../../config/var");
const adrena_client_1 = __importDefault(require("../../utils/adrena/adrena_client"));
const PRICE_DECIMALS = 10;
const ADRENA_PROGRAM_ID = new web3_js_1.PublicKey("13gDzEXCdocbj8iAiqrScGo47NiSuYENGsRqi3SEAwet");
const feeTiers = {
    low: 0.1,
    mid: 0.5,
    high: 0.9,
};
async function getComputeBudgetInstructions(agent, instructions, feeTier) {
    const { blockhash, lastValidBlockHeight } = await agent.connection.getLatestBlockhash();
    const messageV0 = new web3_js_1.TransactionMessage({
        payerKey: agent.wallet.publicKey,
        recentBlockhash: blockhash,
        instructions: instructions,
    }).compileToV0Message();
    const transaction = new web3_js_1.VersionedTransaction(messageV0);
    const simulatedTx = agent.connection.simulateTransaction(transaction);
    const estimatedComputeUnits = (await simulatedTx).value.unitsConsumed;
    const safeComputeUnits = Math.ceil(estimatedComputeUnits
        ? Math.max(estimatedComputeUnits + 100000, estimatedComputeUnits * 1.2)
        : 200000);
    const computeBudgetLimitInstruction = web3_js_1.ComputeBudgetProgram.setComputeUnitLimit({
        units: safeComputeUnits,
    });
    let priorityFee;
    // Use default implementation for priority fee calculation
    priorityFee = await agent.connection
        .getRecentPrioritizationFees()
        .then((fees) => fees.sort((a, b) => a.prioritizationFee - b.prioritizationFee)[Math.floor(fees.length * feeTiers[feeTier])].prioritizationFee);
    const computeBudgetPriorityFeeInstructions = web3_js_1.ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: priorityFee,
    });
    return {
        blockhash,
        computeBudgetLimitInstruction,
        computeBudgetPriorityFeeInstructions,
    };
}
async function sendTx(agent, instructions, otherKeypairs) {
    const ixComputeBudget = await getComputeBudgetInstructions(agent, instructions, "mid");
    const allInstructions = [
        ixComputeBudget.computeBudgetLimitInstruction,
        ixComputeBudget.computeBudgetPriorityFeeInstructions,
        ...instructions,
    ];
    const messageV0 = new web3_js_1.TransactionMessage({
        payerKey: agent.wallet.publicKey,
        recentBlockhash: ixComputeBudget.blockhash,
        instructions: allInstructions,
    }).compileToV0Message();
    const transaction = new web3_js_1.VersionedTransaction(messageV0);
    transaction.sign([agent.wallet, ...(otherKeypairs ?? [])]);
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
            }
            else {
                throw new Error(`Transaction failed: ${statuses.value[0].err.toString()}`);
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
function applySlippage(nb, percentage) {
    const negative = percentage < 0 ? true : false;
    // Do x10_000 so percentage can be up to 4 decimals
    const percentageBN = new anchor_1.BN((negative ? percentage * -1 : percentage) * 10000);
    const delta = nb.mul(percentageBN).divRound(new anchor_1.BN(10000 * 100));
    return negative ? nb.sub(delta) : nb.add(delta);
}
/**
 * Close short trade on Adrena
 * @returns Transaction signature
 */
async function closePerpTradeShort({ agent, price, tradeMint, }) {
    const client = await adrena_client_1.default.load(agent);
    const owner = agent.wallet.publicKey;
    const custody = client.getCustodyByMint(tradeMint);
    const collateralCustody = client.getCustodyByMint(var_1.TOKENS.USDC);
    const stakingRewardTokenCustodyAccount = client.getCustodyByMint(adrena_client_1.default.stakingRewardTokenMint);
    const stakingRewardTokenCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(adrena_client_1.default.stakingRewardTokenMint);
    const position = adrena_client_1.default.findPositionAddress(owner, custody.pubkey, "long");
    const userProfilePda = adrena_client_1.default.getUserProfilePda(owner);
    const userProfile = await client.program.account.userProfile.fetchNullable(userProfilePda);
    const receivingAccount = adrena_client_1.default.findATAAddressSync(owner, collateralCustody.mint);
    const preInstructions = [];
    const collateralCustodyOracle = collateralCustody.oracle;
    const collateralCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(collateralCustody.mint);
    if (!(await adrena_client_1.default.isAccountInitialized(agent.connection, receivingAccount))) {
        preInstructions.push(adrena_client_1.default.createATAInstruction({
            ataAddress: receivingAccount,
            mint: collateralCustody.mint,
            owner,
        }));
    }
    const instruction = await client.program.methods
        .closePositionShort({
        price: new anchor_1.BN(price * 10 ** PRICE_DECIMALS),
    })
        .accountsStrict({
        owner,
        receivingAccount,
        transferAuthority: adrena_client_1.default.transferAuthority,
        pool: adrena_client_1.default.mainPool,
        position: position,
        custody: custody.pubkey,
        custodyTradeOracle: custody.tradeOracle,
        tokenProgram: spl_v1_1.TOKEN_PROGRAM_ID,
        lmStaking: adrena_client_1.default.lmStaking,
        lpStaking: adrena_client_1.default.lpStaking,
        cortex: adrena_client_1.default.cortex,
        stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
        stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
        stakingRewardTokenCustodyTokenAccount,
        lmStakingRewardTokenVault: adrena_client_1.default.lmStakingRewardTokenVault,
        lpStakingRewardTokenVault: adrena_client_1.default.lpStakingRewardTokenVault,
        lpTokenMint: adrena_client_1.default.lpTokenMint,
        protocolFeeRecipient: client.cortex.protocolFeeRecipient,
        adrenaProgram: adrena_client_1.default.programId,
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
async function closePerpTradeLong({ agent, price, tradeMint, }) {
    const client = await adrena_client_1.default.load(agent);
    const owner = agent.wallet.publicKey;
    const custody = client.getCustodyByMint(tradeMint);
    const custodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(tradeMint);
    const stakingRewardTokenCustodyAccount = client.getCustodyByMint(adrena_client_1.default.stakingRewardTokenMint);
    const stakingRewardTokenCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(adrena_client_1.default.stakingRewardTokenMint);
    const position = adrena_client_1.default.findPositionAddress(owner, custody.pubkey, "long");
    const userProfilePda = adrena_client_1.default.getUserProfilePda(owner);
    const userProfile = await client.program.account.userProfile.fetchNullable(userProfilePda);
    const receivingAccount = adrena_client_1.default.findATAAddressSync(owner, custody.mint);
    const preInstructions = [];
    if (!(await adrena_client_1.default.isAccountInitialized(agent.connection, receivingAccount))) {
        preInstructions.push(adrena_client_1.default.createATAInstruction({
            ataAddress: receivingAccount,
            mint: custody.mint,
            owner,
        }));
    }
    const instruction = await client.program.methods
        .closePositionLong({
        price: new anchor_1.BN(price * 10 ** PRICE_DECIMALS),
    })
        .accountsStrict({
        owner,
        receivingAccount,
        transferAuthority: adrena_client_1.default.transferAuthority,
        pool: adrena_client_1.default.mainPool,
        position: position,
        custody: custody.pubkey,
        custodyTokenAccount,
        custodyOracle: custody.oracle,
        custodyTradeOracle: custody.tradeOracle,
        tokenProgram: spl_v1_1.TOKEN_PROGRAM_ID,
        lmStaking: adrena_client_1.default.lmStaking,
        lpStaking: adrena_client_1.default.lpStaking,
        cortex: adrena_client_1.default.cortex,
        stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
        stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
        stakingRewardTokenCustodyTokenAccount,
        lmStakingRewardTokenVault: adrena_client_1.default.lmStakingRewardTokenVault,
        lpStakingRewardTokenVault: adrena_client_1.default.lpStakingRewardTokenVault,
        lpTokenMint: adrena_client_1.default.lpTokenMint,
        protocolFeeRecipient: client.cortex.protocolFeeRecipient,
        adrenaProgram: adrena_client_1.default.programId,
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
async function openPerpTradeLong({ agent, price, collateralAmount, collateralMint = var_1.TOKENS.jitoSOL, leverage = var_1.DEFAULT_OPTIONS.LEVERAGE_BPS, tradeMint = var_1.TOKENS.jitoSOL, slippage = 0.3, }) {
    const client = await adrena_client_1.default.load(agent);
    const owner = agent.wallet.publicKey;
    const collateralAccount = adrena_client_1.default.findATAAddressSync(owner, tradeMint);
    const fundingAccount = adrena_client_1.default.findATAAddressSync(owner, collateralMint);
    const receivingCustody = adrena_client_1.default.findCustodyAddress(collateralMint);
    const receivingCustodyOracle = client.getCustodyByMint(collateralMint).oracle;
    const receivingCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(collateralMint);
    // Principal custody is the custody of the targeted token
    // i.e open a 1 ETH long position, principal custody is ETH
    const principalCustody = adrena_client_1.default.findCustodyAddress(tradeMint);
    const principalCustodyAccount = client.getCustodyByMint(tradeMint);
    const principalCustodyOracle = principalCustodyAccount.oracle;
    const principalCustodyTradeOracle = principalCustodyAccount.tradeOracle;
    const principalCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(tradeMint);
    const stakingRewardTokenCustodyAccount = client.getCustodyByMint(adrena_client_1.default.stakingRewardTokenMint);
    const stakingRewardTokenCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(adrena_client_1.default.stakingRewardTokenMint);
    const position = adrena_client_1.default.findPositionAddress(owner, principalCustody, "long");
    const userProfilePda = adrena_client_1.default.getUserProfilePda(owner);
    const userProfile = await client.program.account.userProfile.fetchNullable(userProfilePda);
    const priceWithSlippage = applySlippage(new anchor_1.BN(price * 10 ** PRICE_DECIMALS), slippage);
    const scaledCollateralAmount = new anchor_1.BN(collateralAmount *
        Math.pow(10, client.getCustodyByMint(collateralMint).decimals));
    const preInstructions = [];
    if (!(await adrena_client_1.default.isAccountInitialized(agent.connection, collateralAccount))) {
        preInstructions.push(adrena_client_1.default.createATAInstruction({
            ataAddress: collateralAccount,
            mint: tradeMint,
            owner,
        }));
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
        transferAuthority: adrena_client_1.default.transferAuthority,
        cortex: adrena_client_1.default.cortex,
        lmStaking: adrena_client_1.default.lmStaking,
        lpStaking: adrena_client_1.default.lpStaking,
        pool: adrena_client_1.default.mainPool,
        position,
        stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
        stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
        stakingRewardTokenCustodyTokenAccount,
        lmStakingRewardTokenVault: adrena_client_1.default.lmStakingRewardTokenVault,
        lpStakingRewardTokenVault: adrena_client_1.default.lpStakingRewardTokenVault,
        lpTokenMint: adrena_client_1.default.lpTokenMint,
        userProfile: userProfile ? userProfilePda : null,
        protocolFeeRecipient: client.cortex.protocolFeeRecipient,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_v1_1.TOKEN_PROGRAM_ID,
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
async function openPerpTradeShort({ agent, price, collateralAmount, collateralMint = var_1.TOKENS.USDC, leverage = var_1.DEFAULT_OPTIONS.LEVERAGE_BPS, tradeMint = var_1.TOKENS.jitoSOL, slippage = 0.3, }) {
    const client = await adrena_client_1.default.load(agent);
    const owner = agent.wallet.publicKey;
    const collateralAccount = adrena_client_1.default.findATAAddressSync(owner, tradeMint);
    const fundingAccount = adrena_client_1.default.findATAAddressSync(owner, collateralMint);
    const receivingCustody = adrena_client_1.default.findCustodyAddress(collateralMint);
    const receivingCustodyOracle = client.getCustodyByMint(collateralMint).oracle;
    const receivingCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(collateralMint);
    // Principal custody is the custody of the targeted token
    // i.e open a 1 BTC short position, principal custody is BTC
    const principalCustody = adrena_client_1.default.findCustodyAddress(tradeMint);
    const principalCustodyAccount = client.getCustodyByMint(tradeMint);
    const principalCustodyTradeOracle = principalCustodyAccount.tradeOracle;
    const principalCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(tradeMint);
    const usdcAta = adrena_client_1.default.findATAAddressSync(owner, var_1.TOKENS.USDC);
    const preInstructions = [];
    if (!(await adrena_client_1.default.isAccountInitialized(agent.connection, usdcAta))) {
        preInstructions.push(adrena_client_1.default.createATAInstruction({
            ataAddress: usdcAta,
            mint: var_1.TOKENS.USDC,
            owner,
        }));
    }
    // Custody used to provide collateral when opening the position
    // Should be a stable token, by default, use USDC
    const instructionCollateralMint = var_1.TOKENS.USDC;
    const collateralCustody = adrena_client_1.default.findCustodyAddress(instructionCollateralMint);
    const collateralCustodyOracle = client.getCustodyByMint(instructionCollateralMint).oracle;
    const collateralCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(instructionCollateralMint);
    const stakingRewardTokenCustodyAccount = client.getCustodyByMint(adrena_client_1.default.stakingRewardTokenMint);
    const stakingRewardTokenCustodyTokenAccount = adrena_client_1.default.findCustodyTokenAccountAddress(adrena_client_1.default.stakingRewardTokenMint);
    const position = adrena_client_1.default.findPositionAddress(owner, principalCustody, "long");
    const userProfilePda = adrena_client_1.default.getUserProfilePda(owner);
    const userProfile = await client.program.account.userProfile.fetchNullable(userProfilePda);
    const priceWithSlippage = applySlippage(new anchor_1.BN(price * 10 ** PRICE_DECIMALS), slippage);
    const scaledCollateralAmount = new anchor_1.BN(collateralAmount *
        Math.pow(10, client.getCustodyByMint(collateralMint).decimals));
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
        transferAuthority: adrena_client_1.default.transferAuthority,
        cortex: adrena_client_1.default.cortex,
        lmStaking: adrena_client_1.default.lmStaking,
        lpStaking: adrena_client_1.default.lpStaking,
        pool: adrena_client_1.default.mainPool,
        position,
        stakingRewardTokenCustody: stakingRewardTokenCustodyAccount.pubkey,
        stakingRewardTokenCustodyOracle: stakingRewardTokenCustodyAccount.oracle,
        stakingRewardTokenCustodyTokenAccount,
        lmStakingRewardTokenVault: adrena_client_1.default.lmStakingRewardTokenVault,
        lpStakingRewardTokenVault: adrena_client_1.default.lpStakingRewardTokenVault,
        lpTokenMint: adrena_client_1.default.lpTokenMint,
        userProfile: userProfile ? userProfilePda : null,
        protocolFeeRecipient: client.cortex.protocolFeeRecipient,
        systemProgram: web3_js_1.SystemProgram.programId,
        tokenProgram: spl_v1_1.TOKEN_PROGRAM_ID,
        adrenaProgram: ADRENA_PROGRAM_ID,
    })
        .instruction();
    return sendTx(agent, [...preInstructions, instruction]);
}
//# sourceMappingURL=adrena.operation.js.map
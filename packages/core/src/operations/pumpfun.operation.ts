import { Connection, PublicKey, Transaction, SystemProgram, Keypair, VersionedTransaction } from '@solana/web3.js';
import { PumpfunLaunchResponse, PumpFunTokenOptions } from '../types/index.interfaces';
import { Agent } from '../agent/Agents';

export class PumpfunOperation {

    async uploadMetadata(
        tokenName: string,
        tokenTicker: string,
        description: string,
        imageUrl: string,
        options?: PumpFunTokenOptions,
    ): Promise<any> {
        const formData = new URLSearchParams();
        formData.append("name", tokenName);
        formData.append("symbol", tokenTicker);
        formData.append("description", description);
        formData.append("showName", "true");

        if (options?.twitter) {
            formData.append("twitter", options.twitter);
        }
        if (options?.telegram) {
            formData.append("telegram", options.telegram);
        }
        if (options?.website) {
            formData.append("website", options.website);
        }

        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        const files = {
            file: new File([imageBlob], "token_image.png", { type: "image/png" }),
        };

        const finalFormData = new FormData();
        for (const [key, value] of formData.entries()) {
            finalFormData.append(key, value);
        }
        if (files?.file) {
            finalFormData.append("file", files.file);
        }

        const metadataResponse = await fetch("https://pump.fun/api/ipfs", {
            method: "POST",
            body: finalFormData,
        });

        if (!metadataResponse.ok) {
            throw new Error(`Metadata upload failed: ${metadataResponse.statusText}`);
        }

        return await metadataResponse.json();
    }

    async createTokenTransaction(
        agent: Agent,
        mintKeypair: Keypair,
        metadataResponse: any,
        options?: PumpFunTokenOptions,
    ) {
        const payload = {
            publicKey: agent.wallet_address,
            action: "create",
            tokenMetadata: {
                name: metadataResponse.metadata.name,
                symbol: metadataResponse.metadata.symbol,
                uri: metadataResponse.metadataUri,
            },
            mint: mintKeypair.publicKey.toBase58(),
            denominatedInSol: "true",
            amount: options?.initialLiquiditySOL || 0.0001,
            slippage: options?.slippageBps || 5,
            priorityFee: options?.priorityFee || 0.00005,
            pool: "pump",
        };

        const response = await fetch("https://pumpportal.fun/api/trade-local", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Transaction creation failed: ${response.status} - ${errorText}`);
        }

        return response;
    }

    async signAndSendTransaction(
        kit: Agent,
        tx: VersionedTransaction,
        mintKeypair: Keypair,
    ) {
        if (kit.connection === null || kit.wallet === null) {
            throw new Error("Agent not initialized: wallet and connection required");
        }
        try {
            const { blockhash, lastValidBlockHeight } = await kit.connection!.getLatestBlockhash();
            tx.message.recentBlockhash = blockhash;
            tx.sign([mintKeypair, kit.wallet!]);

            const signature = await kit.connection!.sendTransaction(tx, {
                skipPreflight: false,
                preflightCommitment: "confirmed",
                maxRetries: 5,
            });

            const confirmation = await kit.connection!.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight,
            });

            if (confirmation.value.err) {
                throw new Error(`Transaction failed: ${confirmation.value.err}`);
            }

            return signature;
        } catch (error) {
            console.error("Transaction send error:", error);
            if (error instanceof Error && "logs" in error) {
                console.error("Transaction logs:", error.logs);
            }
            throw error;
        }
    }

    async launchPumpFunToken(
        agent: Agent,
        tokenName: string,
        tokenTicker: string,
        description: string,
        imageUrl: string,
        options?: PumpFunTokenOptions,
    ): Promise<PumpfunLaunchResponse> {
        try {
            const mintKeypair = Keypair.generate();
            const metadataResponse = await this.uploadMetadata(
                tokenName,
                tokenTicker,
                description,
                imageUrl,
                options,
            );
            const response = await this.createTokenTransaction(
                agent,
                mintKeypair,
                metadataResponse,
                options,
            );
            const transactionData = await response.arrayBuffer();
            const tx = VersionedTransaction.deserialize(
                new Uint8Array(transactionData),
            );
            const signature = await this.signAndSendTransaction(agent, tx, mintKeypair);

            return {
                signature,
                mint: mintKeypair.publicKey.toBase58(),
                metadataUri: metadataResponse.metadataUri,
            };
        } catch (error) {
            console.error("Error in launchPumpFunToken:", error);
            if (error instanceof Error && "logs" in error) {
                console.error("Transaction logs:", (error as any).logs);
            }
            throw error;
        }
    }
}
import { Keypair, VersionedTransaction } from '@solana/web3.js';
import { PumpfunLaunchResponse, PumpFunTokenOptions } from '../types/index.interfaces';
import { Agent } from '../agent/Agents';
import Logger from '../utils/logger/logger';

export class PumpfunOperation {
    private logger: Logger = new Logger();

    async uploadMetadata(
        tokenName: string,
        tokenTicker: string,
        description: string,
        imageUrl: string,
        options?: PumpFunTokenOptions,
    ): Promise<any> {
        // Create metadata object
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

        console.log("[oobe-protocol] - Form Data: ", formData);
        const imageResponse = await fetch(imageUrl);
        const imageBlob = await imageResponse.blob();
        const arrayBuffer = await imageBlob.arrayBuffer();
        console.log("[oobe-protocol] - arrayBuffer: ", arrayBuffer);
        const imageFile = new Blob([arrayBuffer], { type: imageBlob.type });

        // Create form data with both metadata and file
        const finalFormData = new FormData();
        // Add all metadata fields
        for (const [key, value] of formData.entries()) {
            finalFormData.append(key, value);
        }
        finalFormData.append("file", imageFile, "image.png");

        const metadataResponse = await fetch("https://pump.fun/api/ipfs", {
            method: "POST",
            body: finalFormData,
        });

        if (!metadataResponse.ok) {
            this.logger.error(`Metadata upload failed: ${metadataResponse.statusText}`);
            //throw new Error(`Metadata upload failed: ${metadataResponse.statusText}`);
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
            publicKey: agent.walletAddress,
            action: "create",
            tokenMetadata: {
                name: metadataResponse.metadata.name,
                symbol: metadataResponse.metadata.symbol,
                uri: metadataResponse.metadataUri,
            },
            mint: mintKeypair.publicKey.toBase58(),
            denominatedInSol: "true",
            amount: options?.initialLiquiditySOL || 0.03,
            slippage: options?.slippageBps || 5,
            priorityFee: options?.priorityFee || 0.008,
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
            this.logger.error(`Transaction creation failed: ${response.status} - ${errorText}`);
        }

        return response;
    }

    async signAndSendTransaction(
        kit: Agent,
        tx: VersionedTransaction,
        mintKeypair: Keypair,
    ): Promise<string | undefined> {
        if (kit.connection === null || kit.wallet === null) {
            this.logger.error(`Agent initialization failed: wallet and connection required`);
        }
        try {
            let { blockhash, lastValidBlockHeight } = await kit.connection!.getLatestBlockhash();
            ({ blockhash, lastValidBlockHeight } = await kit.connection!.getLatestBlockhash());
            tx.message.recentBlockhash = blockhash;
            tx.sign([mintKeypair, kit.wallet]);

            let signature = await kit.connection!.sendTransaction(tx, {
                skipPreflight: false,
                preflightCommitment: "confirmed",
                maxRetries: 2,
            });

            let status = await kit.connection!.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight,
            }, 'processed'); // Using 'processed' for minimum confirmation

            this.logger.info(`Transaction Signed and Confirmed: ${signature}`)
            return signature;
        } catch (error:any) {
            console.error("Transaction send error:", error);
            if (error instanceof Error && "logs" in error) {
                this.logger.error((error as any).logs);
                console.error("Transaction logs:", (error as any).logs);
                return undefined;
            }
            return undefined;
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
                signature: signature ?? '',
                mint: mintKeypair.publicKey.toBase58(),
                metadataUri: metadataResponse.metadataUri,
            };
        } catch (error: any) {
            console.error("Error in launchPumpFunToken:", error);
            if (error instanceof Error && "logs" in error) {
                this.logger.error((error as any).logs);
                console.error("Transaction logs:", (error as any).logs);
            }
            this.logger.error(error);
            throw error;
        }
    }
}
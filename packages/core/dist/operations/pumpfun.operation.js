"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumpfunOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const logger_1 = __importDefault(require("../utils/logger/logger"));
class PumpfunOperation {
    constructor() {
        this.logger = new logger_1.default();
    }
    async uploadMetadata(tokenName, tokenTicker, description, imageUrl, options) {
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
    async createTokenTransaction(agent, mintKeypair, metadataResponse, options) {
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
    async signAndSendTransaction(kit, tx, mintKeypair) {
        if (kit.connection === null || kit.wallet === null) {
            this.logger.error(`Agent initialization failed: wallet and connection required`);
        }
        try {
            let { blockhash, lastValidBlockHeight } = await kit.connection.getLatestBlockhash();
            ({ blockhash, lastValidBlockHeight } = await kit.connection.getLatestBlockhash());
            tx.message.recentBlockhash = blockhash;
            tx.sign([mintKeypair, kit.wallet]);
            let signature = await kit.connection.sendTransaction(tx, {
                skipPreflight: false,
                preflightCommitment: "confirmed",
                maxRetries: 2,
            });
            let status = await kit.connection.confirmTransaction({
                signature,
                blockhash,
                lastValidBlockHeight,
            }, 'processed'); // Using 'processed' for minimum confirmation
            this.logger.info(`Transaction Signed and Confirmed: ${signature}`);
            return signature;
        }
        catch (error) {
            console.error("Transaction send error:", error);
            if (error instanceof Error && "logs" in error) {
                this.logger.error(error.logs);
                console.error("Transaction logs:", error.logs);
                return undefined;
            }
            return undefined;
        }
    }
    async launchPumpFunToken(agent, tokenName, tokenTicker, description, imageUrl, options) {
        try {
            const mintKeypair = web3_js_1.Keypair.generate();
            const metadataResponse = await this.uploadMetadata(tokenName, tokenTicker, description, imageUrl, options);
            const response = await this.createTokenTransaction(agent, mintKeypair, metadataResponse, options);
            const transactionData = await response.arrayBuffer();
            const tx = web3_js_1.VersionedTransaction.deserialize(new Uint8Array(transactionData));
            const signature = await this.signAndSendTransaction(agent, tx, mintKeypair);
            return {
                signature: signature ?? '',
                mint: mintKeypair.publicKey.toBase58(),
                metadataUri: metadataResponse.metadataUri,
            };
        }
        catch (error) {
            console.error("Error in launchPumpFunToken:", error);
            if (error instanceof Error && "logs" in error) {
                this.logger.error(error.logs);
                console.error("Transaction logs:", error.logs);
            }
            this.logger.error(error);
            throw error;
        }
    }
}
exports.PumpfunOperation = PumpfunOperation;
//# sourceMappingURL=pumpfun.operation.js.map
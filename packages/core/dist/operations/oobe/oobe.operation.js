"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OobeOperation = void 0;
const web3_js_1 = require("@solana/web3.js");
const spl_v1_1 = require("spl-v1");
const axios_1 = __importDefault(require("axios"));
const spl_token_metadata_1 = require("@solana/spl-token-metadata");
class OobeOperation {
    constructor(_agent) {
        this.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        this.agent = _agent;
    }
    async authPinataIPFS(pinataKey) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${pinataKey}`
            }
        };
        fetch('https://api.pinata.cloud/data/testAuthentication', options)
            .then(response => response.json())
            .then(response => {
            console.log(response);
            return response;
        })
            .catch(err => console.error(err));
    }
    async uploadToPinata({ name, symbol, description, image }, pinataKey) {
        const formData = new FormData();
        formData.append('file', new Blob([JSON.stringify({
                name,
                symbol,
                description,
                image,
            })], { type: 'application/json' }), 'metadata.json');
        formData.append('pinataMetadata', JSON.stringify({
            name: 'metadata.json',
        }));
        formData.append('pinataOptions', JSON.stringify({
            cidVersion: 1,
        }));
        const options = {
            method: 'POST',
            url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
            headers: {
                Authorization: `Bearer ${pinataKey}`,
                'Content-Type': 'multipart/form-data'
            },
            data: formData,
            timeout: 60000 // Imposta il timeout a 60 secondi
        };
        try {
            const response = await (0, axios_1.default)(options);
            return response.data.IpfsHash;
        }
        catch (error) {
            console.error("Failed to upload to Pinata:", error);
            return undefined; // Restituisci un CID di default o un valore appropriato
        }
    }
    async IpfsMetadataUpload(mint, name, symbol, additionalMetadata, pinataKey) {
        const metadata = {
            mint,
            name,
            symbol,
            uri: '',
            additionalMetadata,
        };
        await this.authPinataIPFS(pinataKey);
    }
    async generateOobeKeypair(ends = 'obe') {
        let keypair;
        do {
            keypair = web3_js_1.Keypair.generate();
        } while (!keypair.publicKey.toBase58().endsWith(ends));
        console.log("Generated [x]-OBE keypair:", keypair.publicKey.toBase58());
        return keypair;
    }
    async createOobe2022Token({ name, symbol, decimals, supply, feeBasisPoints, maxFee, pinataKey, imageUrl, description, }) {
        console.log("Creating OOBE 2022 token...");
        const l_supply = BigInt(supply) * BigInt(Math.pow(10, decimals));
        const l_feeBasisPoints = feeBasisPoints;
        const l_maxFee = BigInt(maxFee * 10 ** decimals);
        const image = imageUrl;
        await this.authPinataIPFS(pinataKey);
        console.log("Pinata authenticated successfully.");
        console.log("Uploading metadata to Pinata...");
        const oobeKeyPair = await this.generateOobeKeypair();
        const cid = await this.uploadToPinata({
            name,
            symbol,
            description,
            image
        }, pinataKey);
        console.log("Metadata uploaded to Pinata successfully. CID:", cid);
        if (!cid) {
            throw new Error("Failed to upload metadata to Pinata");
        }
        const metadataUri = `ipfs: ${cid}`;
        const metadata = {
            mint: oobeKeyPair.publicKey,
            name,
            symbol,
            uri: metadataUri,
            additionalMetadata: [["new-field", "new-value"]],
        };
        console.log("Metadata Token created:", metadata);
        const extensions = [spl_v1_1.ExtensionType.TransferFeeConfig, spl_v1_1.ExtensionType.MetadataPointer];
        const mintLength = (0, spl_v1_1.getMintLen)(extensions);
        const metadataLen = spl_v1_1.TYPE_SIZE + spl_v1_1.LENGTH_SIZE + (0, spl_token_metadata_1.pack)(metadata).length;
        const rentExemptionLamports = await this.agent.connection.getMinimumBalanceForRentExemption(mintLength + metadataLen);
        console.log("Rent exemption:", rentExemptionLamports / 1e9, " SOL");
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: this.agent.wallet.publicKey,
            newAccountPubkey: oobeKeyPair.publicKey,
            space: mintLength,
            lamports: rentExemptionLamports,
            programId: spl_v1_1.TOKEN_2022_PROGRAM_ID,
        }), (0, spl_v1_1.createInitializeMetadataPointerInstruction)(oobeKeyPair.publicKey, this.agent.wallet.publicKey, oobeKeyPair.publicKey, spl_v1_1.TOKEN_2022_PROGRAM_ID), (0, spl_v1_1.createInitializeTransferFeeConfigInstruction)(oobeKeyPair.publicKey, this.agent.wallet.publicKey, this.agent.wallet.publicKey, l_feeBasisPoints, l_maxFee, spl_v1_1.TOKEN_2022_PROGRAM_ID), (0, spl_v1_1.createInitializeMintInstruction)(oobeKeyPair.publicKey, decimals, this.agent.wallet.publicKey, null, spl_v1_1.TOKEN_2022_PROGRAM_ID), (0, spl_v1_1.createInitializeInstruction)({
            programId: spl_v1_1.TOKEN_2022_PROGRAM_ID,
            mint: oobeKeyPair.publicKey,
            metadata: oobeKeyPair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority: this.agent.wallet.publicKey,
            updateAuthority: this.agent.wallet.publicKey,
        }));
        await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, transaction, [this.agent.wallet, oobeKeyPair], {
            skipPreflight: true,
        });
        console.log("Token created with transfer fee extension!", oobeKeyPair.publicKey.toBase58());
        // Step 2: Mint Initial Supply
        const recipientTokenAccount = await (0, spl_v1_1.getOrCreateAssociatedTokenAccount)(this.agent.connection, this.agent.wallet, oobeKeyPair.publicKey, this.agent.wallet.publicKey, true, "confirmed", undefined, spl_v1_1.TOKEN_2022_PROGRAM_ID);
        const mintToTransaction = new web3_js_1.Transaction().add((0, spl_v1_1.createMintToInstruction)(oobeKeyPair.publicKey, recipientTokenAccount.address, this.agent.wallet.publicKey, l_supply, [], spl_v1_1.TOKEN_2022_PROGRAM_ID));
        await (0, web3_js_1.sendAndConfirmTransaction)(this.agent.connection, mintToTransaction, [this.agent.wallet], {
            skipPreflight: true,
        });
        console.log("Initial supply minted!", oobeKeyPair.publicKey.toBase58());
        console.log("Token created successfully!", oobeKeyPair.publicKey.toBase58());
        console.log("Token name:", name);
        console.log("Token symbol:", symbol);
        console.log("Token supply:", supply);
        console.log("Token decimals:", decimals);
        return {
            signature: mintToTransaction.signature?.toString('utf8'),
            name: name,
            symbol: symbol,
            supply: supply,
            decimals: decimals,
            feeBasisPoints: feeBasisPoints * 100,
            maxFee: maxFee,
            description: description,
            mint: oobeKeyPair.publicKey.toBase58(),
            metadataUri,
        };
    }
}
exports.OobeOperation = OobeOperation;
//# sourceMappingURL=oobe.operation.js.map
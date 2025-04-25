import {
    Keypair,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import {
    TOKEN_2022_PROGRAM_ID,
    createInitializeMintInstruction,
    getMintLen,
    ExtensionType,
    createInitializeInstruction,
    createInitializeTransferFeeConfigInstruction,
    createMintToInstruction,
    getOrCreateAssociatedTokenAccount,
    createInitializeMetadataPointerInstruction,
    TYPE_SIZE,
    LENGTH_SIZE,
} from "spl-v1";
import axios from "axios";
import { Agent } from "../../agent/Agents";
import { TokenMetadata, pack } from "@solana/spl-token-metadata";

interface DataPinata {
    pinataContent: {
        name: string;
        symbol: string;
        description: string;
        image: string;
    },
    pinataMetadata: {
        name: string;
    }
}

export class OobeOperation {
    private agent: Agent;

    constructor(_agent: Agent) {
        this.agent = _agent;
    }

    async authPinataIPFS(pinataKey: string) {
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${pinataKey}`
            }
        };

        fetch('https://api.pinata.cloud/data/testAuthentication', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                return response;
            })
            .catch(err => console.error(err));
    }

    sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


    async uploadToPinata(
        { name, symbol, description, image }: { name: string, symbol: string, description: string, image: string },
        pinataKey: string,
    ) {
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
            const response = await axios(options);
            return response.data.IpfsHash;
        } catch (error) {
            console.error("Failed to upload to Pinata:", error);
            return undefined; // Restituisci un CID di default o un valore appropriato
        }
    }

    async IpfsMetadataUpload(
        mint: string,
        name: string,
        symbol: string,
        additionalMetadata: Array<[string, string]>,
        pinataKey: string,
    ) {
        const metadata = {
            mint,
            name,
            symbol,
            uri: '',
            additionalMetadata,
        }

        await this.authPinataIPFS(pinataKey);

    }

    async generateOobeKeypair(
        ends: string = 'obe',
    ) {
        let keypair: Keypair;
        do {
            keypair = Keypair.generate();
        } while (!keypair.publicKey.toBase58().endsWith(ends));
        console.log("Generated [x]-OBE keypair:", keypair.publicKey.toBase58());
        return keypair;
    }

    async createOobe2022Token({
        name,
        symbol,
        decimals,
        supply,
        feeBasisPoints,
        maxFee,
        pinataKey,
        imageUrl,
        description,
    }: {
        name: string,
        symbol: string,
        decimals: number,
        supply: number,
        feeBasisPoints: number,
        maxFee: number,
        pinataKey: string,
        imageUrl: string,
        description: string,
    }) {
        console.log("Creating OOBE 2022 token...");
        const l_supply = BigInt(supply) * BigInt(Math.pow(10, decimals));
        const l_feeBasisPoints = feeBasisPoints;
        const l_maxFee = BigInt(maxFee * 10 ** decimals);

        const image = imageUrl
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

        const metadata: TokenMetadata = {
            mint: oobeKeyPair.publicKey,
            name,
            symbol,
            uri: metadataUri,
            additionalMetadata: [["new-field", "new-value"]],
        }

        console.log("Metadata Token created:", metadata);

        const extensions = [ExtensionType.TransferFeeConfig, ExtensionType.MetadataPointer];
        const mintLength = getMintLen(extensions);
        const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

        const rentExemptionLamports = await this.agent.connection.getMinimumBalanceForRentExemption(mintLength + metadataLen);

        console.log("Rent exemption:", rentExemptionLamports / 1e9, " SOL");

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: this.agent.wallet.publicKey,
                newAccountPubkey: oobeKeyPair.publicKey,
                space: mintLength,
                lamports: rentExemptionLamports,
                programId: TOKEN_2022_PROGRAM_ID,
            }),
            createInitializeMetadataPointerInstruction(oobeKeyPair.publicKey, this.agent.wallet.publicKey, oobeKeyPair.publicKey, TOKEN_2022_PROGRAM_ID),
            createInitializeTransferFeeConfigInstruction(
                oobeKeyPair.publicKey,
                this.agent.wallet.publicKey,
                this.agent.wallet.publicKey,
                l_feeBasisPoints,
                l_maxFee,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeMintInstruction(
                oobeKeyPair.publicKey,
                decimals,
                this.agent.wallet.publicKey,
                null,
                TOKEN_2022_PROGRAM_ID
            ),
            createInitializeInstruction({
                programId: TOKEN_2022_PROGRAM_ID,
                mint: oobeKeyPair.publicKey,
                metadata: oobeKeyPair.publicKey,
                name: metadata.name,
                symbol: metadata.symbol,
                uri: metadata.uri,
                mintAuthority: this.agent.wallet.publicKey,
                updateAuthority: this.agent.wallet.publicKey,

            })
        );

        await sendAndConfirmTransaction(this.agent.connection, transaction, [this.agent.wallet, oobeKeyPair], {
            skipPreflight: true,
        });

        console.log("Token created with transfer fee extension!", oobeKeyPair.publicKey.toBase58());

        // Step 2: Mint Initial Supply
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.agent.connection,
            this.agent.wallet,
            oobeKeyPair.publicKey,
            this.agent.wallet.publicKey,
            true,
            "confirmed",
            undefined,
            TOKEN_2022_PROGRAM_ID
        );



        const mintToTransaction = new Transaction().add(
            createMintToInstruction(
                oobeKeyPair.publicKey,
                recipientTokenAccount.address,
                this.agent.wallet.publicKey,
                l_supply,
                [],
                TOKEN_2022_PROGRAM_ID
            )
        );


        await sendAndConfirmTransaction(this.agent.connection, mintToTransaction, [this.agent.wallet],{
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
        }
    }
}
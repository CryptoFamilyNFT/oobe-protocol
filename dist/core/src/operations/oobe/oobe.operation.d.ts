import { Keypair } from "@solana/web3.js";
import { Agent } from "../../agent/Agents";
export declare class OobeOperation {
    private agent;
    constructor(_agent: Agent);
    authPinataIPFS(pinataKey: string): Promise<void>;
    sleep: (ms: number) => Promise<unknown>;
    uploadToPinata({ name, symbol, description, image }: {
        name: string;
        symbol: string;
        description: string;
        image: string;
    }, pinataKey: string): Promise<any>;
    IpfsMetadataUpload(mint: string, name: string, symbol: string, additionalMetadata: Array<[string, string]>, pinataKey: string): Promise<void>;
    generateOobeKeypair(ends?: string): Promise<Keypair>;
    createOobe2022Token({ name, symbol, decimals, supply, feeBasisPoints, maxFee, pinataKey, imageUrl, description, }: {
        name: string;
        symbol: string;
        decimals: number;
        supply: number;
        feeBasisPoints: number;
        maxFee: number;
        pinataKey: string;
        imageUrl: string;
        description: string;
    }): Promise<{
        signature: string | undefined;
        name: string;
        symbol: string;
        supply: number;
        decimals: number;
        feeBasisPoints: number;
        maxFee: number;
        description: string;
        mint: string;
        metadataUri: string;
    }>;
}
//# sourceMappingURL=oobe.operation.d.ts.map
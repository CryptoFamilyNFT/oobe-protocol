import { Connection, PublicKey } from "@solana/web3.js";
export declare function getTokenMetadata(connection: Connection, metadataPDA: PublicKey, mint: PublicKey): Promise<{
    name: string | null;
    symbol: string | null;
    uri: string | null;
    sellerFeeBasisPoints: number;
    creators: {
        address: PublicKey;
        verified: boolean;
        share: number;
    }[] | null;
    decimals: number;
} | null | undefined>;
//# sourceMappingURL=tokenMetadata.d.ts.map
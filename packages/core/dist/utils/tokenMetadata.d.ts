import { Connection, PublicKey } from "@solana/web3.js";
export declare function getTokenMetadata(connection: Connection, tokenMint: string): Promise<{
    name: string | null;
    symbol: string | null;
    uri: string | null;
    sellerFeeBasisPoints: number;
    creators: {
        address: PublicKey;
        verified: boolean;
        share: number;
    }[] | null;
}>;
//# sourceMappingURL=tokenMetadata.d.ts.map
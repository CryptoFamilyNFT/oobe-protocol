interface IModeStart {
    auto: boolean;
}
interface PumpFunTokenOptions {
    twitter?: string;
    telegram?: string;
    website?: string;
    initialLiquiditySOL?: number;
    slippageBps?: number;
    priorityFee?: number;
}
interface PumpfunLaunchResponse {
    signature: string;
    mint: string;
    metadataUri?: string;
    error?: string;
}
interface JupiterTokenData {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    tags: string[];
    logoURI: string;
    daily_volume: number;
    freeze_authority: string | null;
    mint_authority: string | null;
    permanent_delegate: string | null;
    extensions: {
        coingeckoId?: string;
    };
}
interface FetchPriceResponse {
    status: "success" | "error";
    tokenId?: string;
    priceInUSDC?: string;
    message?: string;
    code?: string;
}
export { IModeStart, PumpFunTokenOptions, PumpfunLaunchResponse, JupiterTokenData, FetchPriceResponse };
//# sourceMappingURL=index.interfaces.d.ts.map
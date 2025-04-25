export interface SwapCompute {
    id: string;
    success: true;
    version: 'V0' | 'V1';
    openTime?: undefined;
    msg: undefined;
    data: {
        swapType: 'BaseIn' | 'BaseOut';
        inputMint: string;
        inputAmount: string;
        outputMint: string;
        outputAmount: string;
        otherAmountThreshold: string;
        slippageBps: number;
        priceImpactPct: number;
        routePlan: {
            poolId: string;
            inputMint: string;
            outputMint: string;
            feeMint: string;
            feeRate: number;
            feeAmount: string;
        }[];
    };
}
//# sourceMappingURL=ray.interface.d.ts.map
export type TokenDetails = {
    url: string;
    chainId: string;
    tokenAddress: string;
    icon: string;
    header: string;
    openGraph: string;
    description: string;
    links?: {
        label?: string;
        type?: string;
        url: string;
    }[];
    totalAmount: number;
};

export interface Pair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        symbol: string;
    };
    priceNative: string;
    priceUsd?: string;
    txns: {
        m5: {
            buys: number;
            sells: number;
        };
        h1: {
            buys: number;
            sells: number;
        };
        h6: {
            buys: number;
            sells: number;
        };
        h24: {
            buys: number;
            sells: number;
        };
    };
    volume: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    priceChange: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    liquidity?: {
        usd?: number;
        base: number;
        quote: number;
    };
    fdv?: number;
    pairCreatedAt?: number;
}

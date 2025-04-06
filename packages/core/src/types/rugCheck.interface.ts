export interface RugCheck {
    mint: string;
    tokenProgram: string;
    creator: string;
    token: {
        mintAuthority: string | null;
        supply: number;
        decimals: number;
        isInitialized: boolean;
        freezeAuthority: string | null;
    };
    token_extensions: string | null;
    tokenMeta: {
        name: string;
        symbol: string;
        uri: string;
        mutable: boolean;
        updateAuthority: string;
    };
    topHolders: Holder[];
    freezeAuthority: string | null;
    mintAuthority: string | null;
    risks: {
        name: string;
        value: string;
        description: string;
        score: number;
        level: string;
    }[];
    score: number;
    score_normalised: number;
    fileMeta: {
        description: string;
        name: string;
        symbol: string;
        image: string;
    };
    lockerOwners: Record<string, boolean>;
    lockers: Record<string, unknown>;
    markets: {
        pubkey: string;
        marketType: string;
        mintA: string;
        mintB: string;
        mintLP: string;
        liquidityA: string;
        liquidityB: string;
        mintAAccount: {
            mintAuthority: string | null;
            supply: number;
            decimals: number;
            isInitialized: boolean;
            freezeAuthority: string | null;
        };
        mintBAccount: {
            mintAuthority: string | null;
            supply: number;
            decimals: number;
            isInitialized: boolean;
            freezeAuthority: string | null;
        };
        mintLPAccount: {
            mintAuthority: string | null;
            supply: number;
            decimals: number;
            isInitialized: boolean;
            freezeAuthority: string | null;
        };
        liquidityAAccount: {
            mint: string;
            owner: string;
            amount: number;
            delegate: string | null;
            state: number;
            delegatedAmount: number;
            closeAuthority: string | null;
        };
        liquidityBAccount: {
            mint: string;
            owner: string;
            amount: number;
            delegate: string | null;
            state: number;
            delegatedAmount: number;
            closeAuthority: string | null;
        };
        lp: {
            baseMint: string;
            quoteMint: string;
            lpMint: string;
            quotePrice: number;
            basePrice: number;
            base: number;
            quote: number;
            reserveSupply: number;
            currentSupply: number;
            quoteUSD: number;
            baseUSD: number;
            pctReserve: number;
            pctSupply: number;
            holders: unknown | null;
            totalTokensUnlocked: number;
            tokenSupply: number;
            lpLocked: number;
            lpUnlocked: number;
            lpLockedPct: number;
            lpLockedUSD: number;
            lpMaxSupply: number;
            lpCurrentSupply: number;
            lpTotalSupply: number;
        };
    }[];
    totalMarketLiquidity: number;
    totalLPProviders: number;
    totalHolders: number;
    price: number;
    rugged: boolean;
    tokenType: string;
    transferFee: {
        pct: number;
        maxAmount: number;
        authority: string;
    };
    knownAccounts: Record<string, { name: string; type: string }>;
    events: unknown[];
    verification: unknown | null;
    graphInsidersDetected: number;
    insiderNetworks: unknown | null;
    detectedAt: string;
    creatorTokens: unknown | null;
}

export type RugCheckResponse = {
    status: string;
    message: RugCheck;
    type: 'rugCheck';
};

export type GenericResponse = {
    status: string;
    message: any;
    type: 'generic';
};

export interface Holder {
    address: string;
    amount: number;
    decimals: number;
    pct: number;
    uiAmount: number;
    uiAmountString: string;
    owner: string;
    insider: boolean;
}

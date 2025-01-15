
interface IUnofficialEndpoints {
    name: string,
    rpc: string,
    isActive: string
}

interface ISolanaEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

const ENDPOINTS_CONFIG = {
    official: "https://api.mainnet-beta.solana.com",
    unOfficial: [
        {
            name: "Solana Beach",
            rpc: "https://solana-api.projectserum.com",
            isActive: "false"
        },
        {
            name: "Solana Explorer",
            rpc: "https://solana-api.projectserum.com",
            isActive: "false"
        },
        {
            name: "Solscan",
            rpc: "https://solana-api.projectserum.com",
            isActive: "false"
        }
    ]
}

export const DEFAULT_CONFIG = {
    solanaEndpoint: ENDPOINTS_CONFIG.official,
    memoryType: "mongodb", // Opzioni: 'redis', 'mongodb', ecc.
};


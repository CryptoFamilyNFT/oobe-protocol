import { ISolanaEndpoint } from "./types/config.types";
import { IUnofficialEndpoints } from "./types/config.types";

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
    solanaUnofficialEndpoints: ENDPOINTS_CONFIG.unOfficial,
    solanaExplorer: "https://explorer.solana.com",
    memoryType: "mongodb", // Opzioni: 'redis', 'mongodb', ecc.
};


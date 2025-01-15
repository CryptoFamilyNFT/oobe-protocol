import { ISolanaEndpoint } from "./types/config.types";
import { IUnofficialEndpoints } from "./types/config.types";

let ENDPOINTS_CONFIG = {
    official: "https://api.mainnet-beta.solana.com",
    unOfficial: [
        {
            name: "GenesysGo",
            rpc: "https://ssc-dao.genesysgo.net",
        },
        {
            name: "Project Serum",
            rpc: "https://solana-api.projectserum.com",
        },
        {
            name: "Triton",
            rpc: "https://rpc.triton.one",
        }
    ]
}

export const DEFAULT_CONFIG = {
    solanaEndpoint: ENDPOINTS_CONFIG.official,
    solanaUnofficialEndpoints: ENDPOINTS_CONFIG.unOfficial,
    solanaExplorer: "https://explorer.solana.com",
    memoryType: "mongodb", // Opzioni: 'redis', 'mongodb', ecc.
};


import { IConfiguration, IOfficialEndpoint, ISolanaEndpoint, IUnofficialEndpoints } from "./types/config.types";



let ENDPOINTS_CONFIG: ISolanaEndpoint  = {
    official: {
        rpc: "https://api.mainnet-beta.solana.com"
        },
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

export const DEFAULT_CONFIG: IConfiguration = {
        solanaEndpoint: ENDPOINTS_CONFIG.official as IOfficialEndpoint,
        solanaUnofficialEndpoints: ENDPOINTS_CONFIG.unOfficial as IUnofficialEndpoints[],
        solanaExplorer: "https://explorer.solana.com",
        memoryType: "mongodb", // todo: implement more memory types
        dbConfig: {
            host: "localhost",
            port: 3333,
            username: "root",
            password: "root",
            database: "oobe",
            synchronize: true,
        },
        private_key: "private"
    };


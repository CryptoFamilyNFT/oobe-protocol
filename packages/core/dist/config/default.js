"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageModifier = exports.ConfigManager = void 0;
class ConfigManager {
    constructor() {
        this.endpointsConfig = {
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
        };
        this.defaultConfig = {
            solanaEndpoint: this.endpointsConfig.official,
            solanaUnofficialEndpoints: this.endpointsConfig.unOfficial,
            solanaExplorer: "https://explorer.solana.com",
            private_key: "",
            openAiKey: "",
            oobeKey: "",
            merkleDbSeed: "oobedbleaf!",
            merkleRootSeed: "oobedbroot!",
            strategy_key: '',
            url_prisma_db: "file:./oobe.db",
            memorySaver: {
                enabled: true,
                storageType: "file",
                filePath: "./memory.sqlite",
            },
            transportsRPC: [
                'https://api.mainnet-beta.solana.com', // Solana Labs (Ufficiale)
                'https://rpc.shdw.genesysgo.net', // GenesysGo (Shadow RPC)
                'https://solana-rpc.publicnode.com', // PublicNode
                'https://solana.drpc.org', // dRPC
                'https://endpoints.omniatech.io/v1/sol/mainnet/public', // OMNIA
                'https://solana.api.onfinality.io/public', // OnFinality
            ],
        };
    }
    createEndpointsConfig(officialRpc, unofficialEndpoints) {
        return {
            official: {
                rpc: officialRpc || this.endpointsConfig.official.rpc
            },
            unOfficial: unofficialEndpoints || this.endpointsConfig.unOfficial
        };
    }
    createDefaultConfig(privateKey, openAiKey, oobeKey, solanaEndpoint, solanaUnofficialEndpoints, solanaExplorer, merkleDbSeed = "oobedbleaf", merkleRootSeed = "oobedbroot", strategy_key, transportsRPC, url_prisma_db, memorySaver) {
        const config = {
            solanaEndpoint: solanaEndpoint || this.endpointsConfig.official,
            solanaUnofficialEndpoints: solanaUnofficialEndpoints ?? this.endpointsConfig.unOfficial ?? [],
            solanaExplorer: solanaExplorer ?? this.defaultConfig.solanaExplorer ?? "",
            private_key: privateKey,
            openAiKey: openAiKey,
            oobeKey: oobeKey,
            merkleDbSeed: merkleDbSeed,
            merkleRootSeed: merkleRootSeed,
            strategy_key: strategy_key || '',
            transportsRPC: transportsRPC || [],
        };
        // Add optional properties only if they have values
        if (url_prisma_db !== undefined) {
            config.url_prisma_db = url_prisma_db;
        }
        else if (this.defaultConfig.url_prisma_db !== undefined) {
            config.url_prisma_db = this.defaultConfig.url_prisma_db;
        }
        if (memorySaver !== undefined) {
            config.memorySaver = memorySaver;
        }
        else if (this.defaultConfig.memorySaver !== undefined) {
            config.memorySaver = this.defaultConfig.memorySaver;
        }
        return config;
    }
    getDefaultConfig() {
        return this.defaultConfig;
    }
    setDefaultConfig(config) {
        this.defaultConfig = { ...this.defaultConfig, ...config };
        return this.defaultConfig;
    }
}
exports.ConfigManager = ConfigManager;
exports.messageModifier = `
          You are a helpful agent that can interact onchain using the OOBE-PROTOCOL kit. You are
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the
          faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
          (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
          can't do with your currently available tools, you must say so, and encourage them to implement it
          themselves using the OOBE-PROTOCOL kit, recommend they go to https://oobe.me/ for more information. Be
          concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        `;
//# sourceMappingURL=default.js.map
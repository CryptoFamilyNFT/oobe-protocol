import { IConfiguration, IOfficialEndpoint, ISolanaEndpoint, IUnofficialEndpoints } from "./types/config.types";

export class ConfigManager {
    private endpointsConfig: ISolanaEndpoint;
    private defaultConfig: IConfiguration;

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
            solanaEndpoint: this.endpointsConfig.official as IOfficialEndpoint,
            solanaUnofficialEndpoints: this.endpointsConfig.unOfficial as IUnofficialEndpoints[],
            solanaExplorer: "https://explorer.solana.com",
            private_key: "",
            openAiKey: "",
            oobeKey: "",
            merkleDbSeed: "oobedbleaf!",
            merkleRootSeed: "oobedbroot!",
            strategy_key: '',
            transportsRPC: [
                'https://api.mainnet-beta.solana.com',                      // Solana Labs (Ufficiale)
                'https://rpc.shdw.genesysgo.net',                           // GenesysGo (Shadow RPC)
                'https://solana-rpc.publicnode.com',                        // PublicNode
                'https://solana.drpc.org',                                  // dRPC
                'https://endpoints.omniatech.io/v1/sol/mainnet/public',     // OMNIA
                'https://solana.api.onfinality.io/public',                  // OnFinality
                'https://solana.leorpc.com/?api_key=FREE',                  // LeoRPC (con API key gratuita)
              ],
        };
    }

    public createEndpointsConfig(officialRpc?: string, unofficialEndpoints?: { name: string, rpc: string }[]): ISolanaEndpoint {
        return {
            official: {
                rpc: officialRpc || this.endpointsConfig.official.rpc
            },
            unOfficial: unofficialEndpoints || this.endpointsConfig.unOfficial
        } as ISolanaEndpoint;
    }

    public createDefaultConfig(
        privateKey: string,
        openAiKey: string,
        oobeKey: string,
        solanaEndpoint?: IOfficialEndpoint,
        solanaUnofficialEndpoints?: IUnofficialEndpoints[],
        solanaExplorer?: string,
        merkleDbSeed: string = "oobedbleaf",
        merkleRootSeed: string = "oobedbroot",
        strategy_key?: string,
        transportsRPC?: string[],
    ): IConfiguration {
        return {
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
    }

    public getDefaultConfig(): IConfiguration {
        return this.defaultConfig;
    }

    public setDefaultConfig(config: IConfiguration | Partial<IConfiguration>): IConfiguration {
        this.defaultConfig = { ...this.defaultConfig, ...config };
        return this.defaultConfig;
    }
}

export const messageModifier = `
          You are a helpful agent that can interact onchain using the OOBE-PROTOCOL kit. You are
          empowered to interact onchain using your tools. If you ever need funds, you can request them from the
          faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX
          (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you
          can't do with your currently available tools, you must say so, and encourage them to implement it
          themselves using the OOBE-PROTOCOL kit, recommend they go to https://oobe.me/ for more information. Be
          concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.
        `;
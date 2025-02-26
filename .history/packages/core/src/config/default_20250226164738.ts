import { IConfiguration, IOfficialEndpoint, ISolanaEndpoint, IUnofficialEndpoints } from "./types/config.types";

class ConfigManager {
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
            private_key: process.env.PRIVATE_KEY ?? "",
            openAiKey: process.env.OPENAI_KEY ?? "",
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
        solanaEndpoint?: IOfficialEndpoint,
        solanaUnofficialEndpoints?: IUnofficialEndpoints[],
        solanaExplorer?: string,
    ): IConfiguration {
        return {
            solanaEndpoint: solanaEndpoint || this.endpointsConfig.official,
            solanaUnofficialEndpoints: solanaUnofficialEndpoints ?? this.endpointsConfig.unOfficial ?? [],
            solanaExplorer: solanaExplorer ?? this.defaultConfig.solanaExplorer ?? "",
            private_key: privateKey,
            openAiKey: openAiKey,
        };
    }

    public getDefaultConfig(): IConfiguration {
        return this.defaultConfig;
    }

    public setDefaultConfig(config: IConfiguration): void {
        this.defaultConfig = config;
    }
}
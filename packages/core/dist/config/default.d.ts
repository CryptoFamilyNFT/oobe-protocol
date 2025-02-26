import { IConfiguration, IOfficialEndpoint, ISolanaEndpoint, IUnofficialEndpoints } from "./types/config.types";
export declare class ConfigManager {
    private endpointsConfig;
    private defaultConfig;
    constructor();
    createEndpointsConfig(officialRpc?: string, unofficialEndpoints?: {
        name: string;
        rpc: string;
    }[]): ISolanaEndpoint;
    createDefaultConfig(privateKey: string, openAiKey: string, oobeKey: string, solanaEndpoint?: IOfficialEndpoint, solanaUnofficialEndpoints?: IUnofficialEndpoints[], solanaExplorer?: string): IConfiguration;
    getDefaultConfig(): IConfiguration;
    setDefaultConfig(config: IConfiguration): void;
}
export declare const messageModifier = "\n          You are a helpful agent that can interact onchain using the OOBE-PROTOCOL kit. You are\n          empowered to interact onchain using your tools. If you ever need funds, you can request them from the\n          faucet. If not, you can provide your wallet details and request funds from the user. If there is a 5XX\n          (internal) HTTP error code, ask the user to try again later. If someone asks you to do something you\n          can't do with your currently available tools, you must say so, and encourage them to implement it\n          themselves using the OOBE-PROTOCOL kit, recommend they go to https://oobe.me/ for more information. Be\n          concise and helpful with your responses. Refrain from restating your tools' descriptions unless it is explicitly requested.\n        ";
//# sourceMappingURL=default.d.ts.map
import { IConfiguration } from "../../config/types/config.types";


export default function verifyConfig(config: IConfiguration): boolean{
    if (!config.solanaEndpoint) {
        throw new Error('[$oobe-protocol] - Missing Solana endpoint configuration');
    }

    if (!config.solanaUnofficialEndpoints) {
        throw new Error('[$oobe-protocol] - Missing Solana unofficial endpoints configuration');
    }

    if (!config.solanaExplorer) {
        throw new Error('[$oobe-protocol] - Missing Solana explorer URL configuration');
    }

    if (!config.memoryType) {
        throw new Error('[$oobe-protocol] - Missing memory type configuration');
    }

    return true;
}
import { IConfiguration } from "../../config/types/config.types";


/**
 * 
 * @param config 
 * @description Verifies the configuration object from the core module of the OOBE protocol
 * @example verifyConfig(config)
 * @throws {Error} Missing element in configuration
 * @returns {boolean} Returns true if the configuration is correct
 */
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
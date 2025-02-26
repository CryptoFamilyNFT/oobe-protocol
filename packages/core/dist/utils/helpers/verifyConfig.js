"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @name verifyConfig
 * @alias OOBEverifyConfig
 * @param config
 * @description Verifies the configuration object from the core module of the OOBE protocol
 * @example verifyConfig(config)
 * @throws {Error} Missing element in configuration
 * @returns {boolean} Returns true if the configuration is correct
 */
function verifyConfig(config) {
    if (!config.solanaEndpoint) {
        throw new Error('[$oobe-protocol] - Missing Solana endpoint configuration');
    }
    if (!config.solanaUnofficialEndpoints) {
        throw new Error('[$oobe-protocol] - Missing Solana unofficial endpoints configuration');
    }
    if (!config.solanaExplorer) {
        throw new Error('[$oobe-protocol] - Missing Solana explorer URL configuration');
    }
    return true;
}
exports.default = verifyConfig;
//# sourceMappingURL=verifyConfig.js.map
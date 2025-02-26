import { IDatabaseConfig } from "../../types/db.interface"

/**
 * @name IUnofficialEndpoints
 * @description Interface for the unofficial endpoints object
 * @property {string} name - Name of the endpoint
 * @property {string} rpc - RPC URL of the endpoint
 */
export interface IUnofficialEndpoints {
    name: string,
    rpc: string,
}

/**
 * @name IOfficialEndpoint
 * @description Interface for the official endpoint object
 * @property {string} rpc - RPC URL of the endpoint
 */
export interface IOfficialEndpoint {
    rpc: string,
}

/**
 * @name ISolanaEndpoint
 * @description Interface for the Solana endpoint object
 * @property {IOfficialEndpoint} official - Official Solana endpoint
 * @property {IUnofficialEndpoints[]} unOfficial - Unofficial Solana endpoints
 */
export interface ISolanaEndpoint {
    official: IOfficialEndpoint,
    unOfficial: IUnofficialEndpoints[]
}


/**
 * @name IConfiguration
 * @description Interface for the configuration object on the core module
 * @property {IOfficialEndpoint} solanaEndpoint - Official Solana endpoint
 * @property {IUnofficialEndpoints[]} solanaUnofficialEndpoints - Unofficial Solana endpoints
 * @property {string} solanaExplorer - Solana explorer URL
 * @property {string} memoryType - Memory type for the core module
 */
export interface IConfiguration {
    solanaEndpoint: IOfficialEndpoint,
    solanaUnofficialEndpoints: IUnofficialEndpoints[],
    solanaExplorer: string,
    memoryType: string,
    dbConfig: IDatabaseConfig,
    private_key: string,
    googleApiKey: string,
    pollinationsApiUrl: string,
}

/**
 * 
 * @name IResImageContent
 * @description Interface for the response object from the image content API
 * @property {string} content - Content of the image
 * @property {string} image - Image URL
 */
export interface IResImageContent {
    url: string,
    image: Buffer
}
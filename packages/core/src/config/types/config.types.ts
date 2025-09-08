import { CoreTool } from "ai"
import { IDatabaseConfig } from "../../types/db.interface"
import { StructuredTool } from "langchain/tools"

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
    unOfficial?: IUnofficialEndpoints[]
}


/**
 * @name IConfiguration
 * @description Interface for the configuration object on the core module
 * @property {IOfficialEndpoint} solanaEndpoint - Official Solana endpoint
 * @property {IUnofficialEndpoints[]} solanaUnofficialEndpoints - Unofficial Solana endpoints
 * @property {string} solanaExplorer - Solana explorer URL
 * @property {string} memoryType - Memory type for the core module
 * @property {IDatabaseConfig} dbConfig - Database configuration (legacy TypeORM)
 * @property {string} url_prisma_db - Prisma database URL connection string
 * @property {object} memorySaver - MemorySaver configuration for LangGraph state persistence
 * @property {boolean} memorySaver.enabled - Enable/disable memory saving
 * @property {string} memorySaver.storageType - Storage type: memory, file, or redis
 * @property {string} memorySaver.filePath - File path for file-based storage
 * @property {string} memorySaver.redisUrl - Redis URL for redis-based storage
 */
export interface IConfiguration {
    solanaEndpoint: IOfficialEndpoint,
    solanaUnofficialEndpoints?: IUnofficialEndpoints[],
    solanaExplorer?: string,
    memoryType?: string,
    dbConfig?: IDatabaseConfig,
    url_prisma_db?: string,
    memorySaver?: {
        enabled?: boolean,
        storageType?: 'memory' | 'file' | 'redis',
        filePath?: string,
        redisUrl?: string,
    },
    strategy_key: string,
    private_key: string,
    GOOGLE_API_KEY?: string,
    pollinationsApiUrl?: string,
    openAiKey: string,
    oobeKey: string,
    merkleDbSeed: string,
    merkleRootSeed: string,
    transportsRPC?: string[],
}

/**
 * 
 * extend Record<string, CoreTool> for SolanaTools
 */
export interface ISolanaTools extends Record<string, StructuredTool> {}

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
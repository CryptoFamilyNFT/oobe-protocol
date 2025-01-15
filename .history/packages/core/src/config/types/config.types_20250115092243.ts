export interface IUnofficialEndpoints {
    name: string,
    rpc: string,
}

export interface IOfficialEndpoint {
    rpc: string,
}

export interface ISolanaEndpoint {
    official: IOfficialEndpoint,
    unOfficial: IUnofficialEndpoints[]
}

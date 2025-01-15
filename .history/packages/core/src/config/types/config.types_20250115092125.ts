export interface IUnofficialEndpoints {
    name: string,
    rpc: string,
}

export interface IOfficialEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

export interface ISolanaEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

export interface IUnofficialEndpoints {
    name: string,
    rpc: string,
    isActive: string
}

export interface ISolanaEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

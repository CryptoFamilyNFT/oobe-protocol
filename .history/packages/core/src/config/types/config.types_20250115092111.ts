export interface IUnofficialEndpoints {
    name: string,
    rpc: string,
}

export interface ISolanaEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

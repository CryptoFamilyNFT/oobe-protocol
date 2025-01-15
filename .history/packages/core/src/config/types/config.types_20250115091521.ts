interface IUnofficialEndpoints {
    name: string,
    rpc: string,
    isActive: string
}

interface ISolanaEndpoint {
    official: string,
    unOfficial: IUnofficialEndpoints[]
}

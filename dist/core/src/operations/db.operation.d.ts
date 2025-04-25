export declare class DBOperations {
    private dataSource;
    constructor(host: string, port: number, database: string, username: string, password: string, synchronize: boolean);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    getRepository(entity: any): import("typeorm").Repository<import("typeorm").ObjectLiteral>;
}
//# sourceMappingURL=db.operation.d.ts.map
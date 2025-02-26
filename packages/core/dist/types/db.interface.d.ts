export interface IDatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
    logging?: boolean;
    entities?: any[];
    migrations?: any[];
    subscribers?: any[];
    cli?: {
        entitiesDir: string;
        migrationsDir: string;
        subscribersDir: string;
    };
}
//# sourceMappingURL=db.interface.d.ts.map
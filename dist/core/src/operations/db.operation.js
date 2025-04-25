"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBOperations = void 0;
const typeorm_1 = require("typeorm");
class DBOperations {
    constructor(host, port, database, username, password, synchronize) {
        this.dataSource = new typeorm_1.DataSource({
            type: "mysql",
            host: host,
            port: port,
            username: username,
            password: password,
            database: database,
            synchronize: synchronize,
            logging: true,
            entities: [__dirname + "../config/db/models/*.ts"],
        });
    }
    // Metodo per iniziare la connessione
    async connect() {
        try {
            await this.dataSource.initialize();
            console.log("Data Source has been initialized!");
        }
        catch (err) {
            console.error("Error during Data Source initialization:", err);
        }
    }
    // Metodo per chiudere la connessione
    async disconnect() {
        try {
            await this.dataSource.destroy();
            console.log("Data Source has been destroyed!");
        }
        catch (err) {
            console.error("Error during Data Source destruction:", err);
        }
    }
    // Metodo per ottenere un repository
    getRepository(entity) {
        return this.dataSource.getRepository(entity);
    }
}
exports.DBOperations = DBOperations;
//# sourceMappingURL=db.operation.js.map
import { DataSource } from "typeorm";
import { Logger } from "typeorm";

export class DBOperations {
  private dataSource: DataSource;

  constructor(
    host: string,
    port: number,
    database: string,
    username: string,
    password: string,
    synchronize: boolean
  ) {
    this.dataSource = new DataSource({
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
    } catch (err) {
      console.error("Error during Data Source initialization:", err);
    }
  }

  // Metodo per chiudere la connessione
  async disconnect() {
    try {
      await this.dataSource.destroy();
      console.log("Data Source has been destroyed!");
    } catch (err) {
      console.error("Error during Data Source destruction:", err);
    }
  }

  // Metodo per ottenere un repository
  getRepository(entity: any) {
    return this.dataSource.getRepository(entity);
  }
}
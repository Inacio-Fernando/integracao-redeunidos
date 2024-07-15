import { DataSource } from "typeorm";
import Connection from "./Connection";


export default class MssqlTypeOrmAdapter implements Connection<DataSource> {
	dataSource: DataSource;
  
  getConnection(): DataSource {
    return this.dataSource;
  }

  async connect(): Promise<void> {
    try {
      const connection = new DataSource({
        type: 'mssql',
        dropSchema: false,
        migrationsRun: false,
        entities: [`${__dirname}/mapping/*.{js,ts}`],
        host: process.env.MSSQL_HOST,
        port: process.env.MSSQL_PORT ? Number(process.env.MSSQL_PORT) : 5000,
        username: process.env.MSSQL_USER || "universo digital",
        password: process.env.MSSQL_PASS || 'universo!@#',
        database: process.env.MSSQL_NAME || 'Solidcon',
      });
      this.dataSource = await connection.initialize();
    } catch (error) {
      console.error('error');
      throw error
      // throw new DatabaseConnectionException();
    }
  }
}

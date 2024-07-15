import { DataSource } from "typeorm";
import Connection from "./Connection";

export default class MysqlTypeOrmAdapter implements Connection<DataSource> {
	dataSource: DataSource;

	getConnection(): DataSource {
		return this.dataSource;
	}

	async connect(): Promise<void> {
		try {
			const connection = new DataSource({
				type: 'mysql',
				logging: process.env.STAGE === 'dev',
				dropSchema: false,
				migrationsRun: false,
				entities: [`${__dirname}/mapping/*.{js,ts}`],
				host: '172.19.0.1' || process.env.DB_HOST,
				port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
				username: 'root' || process.env.DB_USER,
				password: 'root' || process.env.DB_PASS,
				database: 'cf_teste' || process.env.DB_NAME,
				bigNumberStrings: false,
				supportBigNumbers: true,
			});
			this.dataSource = await connection.initialize();

		} catch (error) {
			console.error(error);
			throw new Error();
			// throw new DatabaseConnectionException();
		}
	}

	
}
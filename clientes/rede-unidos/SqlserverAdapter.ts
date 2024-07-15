import { DataSource } from 'typeorm';
import * as sql from 'mssql'
import Connection from './Connection';

export default class SqlserverAdapter implements Connection<any> {
	private dataSource;
  
  getConnection(): sql.ConnectionPool {
    return this.dataSource;
  }

  async connect(): Promise<void> {
    try {
      // const { srcAddr, srcPort } = await createSSHTunnel();
      const config = {
        user: "universo digital",
        password: "universo!@#",
        server: "187.63.79.22",
        database: "Solidcon",
        port: 5000,
        options: {
            encrypt: false,
            enableArithAbort: true,
        }
    };
      await sql.connect(config);

      
    } catch (error) {
      console.error('error');
      throw error
    }
  }
}

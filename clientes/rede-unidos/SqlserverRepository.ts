import { ConnectionPool } from "mssql";

export default class SqlserverRepository {
  constructor(readonly connection: ConnectionPool) {}

  async getAllProducts(): Promise<any> {
    const date = new Date().toISOString().split('T')[0];
    const result = await this.connection.query(`
            SELECT TOP 10 * FROM VW_DIGITAL_PRODUTO
            `);

    return result;
  }
}

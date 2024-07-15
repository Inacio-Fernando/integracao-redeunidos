import CreateProducts from "./application/CreateProducts";
import MssqlTypeOrmAdapter from "./infra/MssqlTypeOrmAdapter";
import MysqlTypeOrmAdapter from "./infra/MysqlTypeOrmAdapter ";
import ProductRepositoryMssql from "./infra/ProductRepositoryMssql";
import ProductRepositoryMysql from "./infra/ProductRepositoryMysql";


const createAll = async () => {
  const mysql = new MysqlTypeOrmAdapter()
  const mssql = new MssqlTypeOrmAdapter()
  await Promise.all(
    [mysql.connect(), mssql.connect()]
  )
  const mysqlRepo = new ProductRepositoryMysql(mysql.getConnection());
  const mssqlRepo = new ProductRepositoryMssql(mssql.getConnection())
  const createProducts = new CreateProducts( mssqlRepo, mysqlRepo)
  createProducts.execute();
};

export { createAll };

import MysqlTypeOrmAdapter from '../shared/infra/database/MysqlTypeOrmAdapter ';
import CreateProductsUsecase from './application/usecase/CreateProductsUsecase';
import CreatePricesUsecase from './application/usecase/CreatePricesUsecase';
import SqlserverTypeOrmAdapter from './infra/database/SqlserverTypeOrmAdapter';
import ProductRepositoryMssql from './infra/repository/ProductRepositoryMssql';
import ProductRepositoryMysql from './infra/repository/ProductRepositoryMysql';
import SqlserverRepository from './infra/repository/SqlserverRepository';
import * as sql from 'mssql'
import CreateProducts from './CreateProducts';
import SqlserverAdapter from './infra/database/SqlserverAdapter';


const createAll = async () => {
//   const config = {
//     user: "universo digital",
//     password: "universo!@#",
//     server: "187.63.79.22",
//     database: "Solidcon",
//     port: 5000,
//     options: {
//         encrypt: false,
//         enableArithAbort: true,
//     }
// };
   
//   await sql.connect(config);
  const db = new SqlserverAdapter();
  await db.connect();
  const repo = new SqlserverRepository(db.getConnection())
 
  // const cfProductRepository = new ProductRepositoryMysql(
    //   mysqlConnection.getConnection(),
    // );
    
    const createProductsUsecase = new CreateProducts(
      repo,
      // cfProductRepository,
    );
    createProductsUsecase.execute();
  // createPricesUsecase.execute();
};

export { createAll };

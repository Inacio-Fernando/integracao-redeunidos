
import CreateProducts from './CreateProducts';
import SqlserverAdapter from './SqlserverAdapter';
import SqlserverRepository from './SqlserverRepository';


const createAll = async () => {

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
    await createProductsUsecase.execute();
  // createPricesUsecase.execute();
};

export { createAll };

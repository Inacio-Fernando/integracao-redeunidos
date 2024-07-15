import { DataSource,Repository } from 'typeorm';
import { ProductEntity } from './mapping/product';

export default class ProductRepositoryMssql {
  private repository: Repository<ProductEntity>;

  constructor(readonly connection: DataSource) {
    this.repository = this.connection.getRepository(ProductEntity);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    const entities = await this.repository.createQueryBuilder('product')
      .where('TRUNC(product.dtUltimaAlteracao) >= :date', {
        date: new Date().toISOString().split('T')[0],
      })
      .getMany();

    return entities;
  }
  
}

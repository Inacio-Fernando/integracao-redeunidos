import { DataSource, In, MoreThanOrEqual, Repository } from 'typeorm';
import Product from '../domain/entity/Product';
import { CfProdutoEntity } from './mapping/CfProduto';
import { CfValorEntity } from './mapping/CfValor';
import Price from '../domain/entity/Price';

export default class ProductRepositoryMysql {
  private repository: Repository<CfProdutoEntity>;
  private pricesRepository: Repository<CfValorEntity>;

  constructor(readonly connection: DataSource) {
    this.repository = this.connection.getRepository(CfProdutoEntity);
    this.pricesRepository = this.connection.getRepository(CfValorEntity);
  }

  
  // async insert(input: Product[]): Promise<void> {
  //   try {
  //     await this.repository.createQueryBuilder().insert().values(input.map((product)=>{
  //       return {
  //         prodId: product.getState().id.toString(),
  //         prodNome: product.getState().name,
  //         prodDesc: product.getState().description,
  //         prodProporcao: product.getState().proportion,
  //         prodSessao: product.getState().session,
  //         prodGrupo: product.getState().group,
  //         prodSubgrupo: product.getState().subgroup,
  //         prodEmpresa: product.getState().company,
  //         prodFilial: product.getState().establishment,
  //         prodSku: product.getState().sku,
  //         prodFlag100g: product.getState().flag100g,
  //       }
  //     })).execute()
  //   } catch (error) {
  //     throw error
  //   }
    
  // }

  // async update(input: Product[]): Promise<void> {
  //   try {
  //     const entities = this.repository.create(input.map((product)=>{
  //       return {
  //         prodId: product.getState().id.toString(),
  //         prodNome: product.getState().name,
  //         prodDesc: product.getState().description,
  //         prodProporcao: product.getState().proportion,
  //         prodSessao: product.getState().session,
  //         prodGrupo: product.getState().group,
  //         prodSubgrupo: product.getState().subgroup,
  //         prodEmpresa: product.getState().company,
  //         prodFilial: product.getState().establishment,
  //         prodSku: product.getState().sku,
  //         prodFlag100g: product.getState().flag100g,
  //       }
  //     }))
  //     await this.repository.save(entities)
  //   } catch (error) {
  //     throw error
  //   }
    
  // }


  async save(input: Product[]): Promise<void> {
    try {
      const entities = this.repository.create(input.map((product)=>{
        return {
          prodId: product.getState().id.toString(),
          prodNome: product.getState().name,
          prodDesc: product.getState().description,
          prodProporcao: product.getState().proportion,
          prodSessao: product.getState().session,
          prodGrupo: product.getState().group,
          prodSubgrupo: product.getState().subgroup,
          prodEmpresa: product.getState().company,
          prodFilial: product.getState().establishment,
          prodSku: product.getState().sku,
          prodFlag100g: product.getState().flag100g,
        }
      }))
      await this.repository.save(entities)
    } catch (error) {
      throw error
    }
    
  }

  async getProductsByCode(input: number[]): Promise<{
    [key: number]: Product;
  }> {
    const entities = await this.repository.createQueryBuilder('product')
    .leftJoinAndMapMany('product.prices' ,CfValorEntity, 'valores', 'product.prodId = valores.vlrProduto')
    .where(`product.prodCod IN (${input})`)
    .getMany()
    console.log(entities[0])
    const indexedEntities = entities.reduce((arr, e) => {
      arr[e.prodCod] = new Product({
        id: Number(e.prodId),
        code: Number(e.prodCod),
        name: e.prodNome,
        description: e.prodDesc,
        proportion: e.prodProporcao,
        session: e.prodSessao,
        group: e.prodGrupo,
        subgroup: e.prodSubgrupo,
        sku: e.prodSku,
      });
      return arr;
    }, Array());
    return indexedEntities;
    
  }
  async savePrices(input: Price[]): Promise<void> {
    const entities = this.pricesRepository.create(input.map((e) => {
      return {
        vlrId: e.getState().id,
        vlrProduto: e.getState().productId,
        vlrIdcomercial: e.getState().dynamic,
        vlrFilial: e.getState().filial,
        vlrDataDe: e.getState().startDate,
        vlrDataAte: e.getState().endDate,
        vlrValores: e.getState().price,
        vlrHora: e.getState().hour,
        vlrEmpresa: e.getState().company,
        vlrUsuario: e.getState().user,
      };
    }));
    await this.pricesRepository.save(entities);
  }
}

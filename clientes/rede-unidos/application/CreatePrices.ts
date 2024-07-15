import Price from "../domain/entity/Price";
import ProductRepositoryMssql from "../infra/ProductRepositoryMssql";
import ProductRepositoryMysql from "../infra/ProductRepositoryMysql";
import { Usecase } from "./Usecase";

export default class CreatePrices implements Usecase {
    constructor(
        readonly clientProductRepository: ProductRepositoryMssql,
        readonly cfProductRepository: ProductRepositoryMysql
    ){}
    
    async execute(): Promise<any> {
        const productEntities = await this.clientProductRepository.getAllProducts();
        const codes = productEntities
          .map((e) => e.plu)
          .filter((e) => e != undefined);
          console.log(codes)
        const products = await this.cfProductRepository.getProductsByCode(codes);
        const prices: Price[] = [];
        for (const priceEntity of productEntities) {
            const product = products[priceEntity.plu];
            const [price, dynamic] = this.getValueAndDynamic({
                cluster: priceEntity.vlrCluster || 0,
                promotional: priceEntity.vlrPromocao || 0,
                base: priceEntity.vlrProduto || 0,
              })
              const existingPrice = product.getState().prices.filter(p=>{
                p.getState().dynamic == dynamic && p.getState().filial == priceEntity.idLoja
              })
            price.push(
                Price.createPrice({
                    id: existingPrice[0].getState().id || undefined,
                    productId: product.getState().id,
                    filial: priceEntity.idLoja,
                    startDate: priceEntity.dtUltimaAlteracao,
                    endDate: priceEntity.dtUltimaAlteracao,
                    hour: new Date(),
                    price: price,
                    dynamic: dynamic
              })
            )
        }
       
        await this.cfProductRepository.savePrices(prices);
    }

    private getValueAndDynamic(values){
        const price = values.promotional > 0
        ? values.promotional.toString()
        : values.base.toString();
      const dynamic = 1;
      return [price, dynamic]
    }
}


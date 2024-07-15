import { Usecase } from "./application/usecase/Usecase";
import Product from "./domain/entity/Product";

export default class CreatePrices implements Usecase {
    constructor(
        readonly clientProductRepository,
        // readonly cfProductRepository
    ){}
    
    async execute(): Promise<any> {
        const productEntities = await this.clientProductRepository.getAllProducts();
        const codes = productEntities
          .map((e) => e.plu)
          .filter((e) => e != undefined);
          console.log(codes)
        // const products = await this.cfProductRepository.getProductsByCode(codes);
        // const prices: Price[] = [];
        // for (const price of productEntities) {
        //     const product = products[price.plu][price.idLoja];
        //     prices.push(
        //         new Price({
        //             productId: product.getState().id,
        //             filial: price.idLoja,
        //             startDate: price.dtUltimaAlteracao,
        //             endDate: price.dtUltimaAlteracao,
        //             hour: new Date(),
        //             values: {
        //               cluster: price.vlrCluster || 0,
        //               promotional: price.vlrPromocao || 0,
        //               base: price.vlrProduto || 0,
        //             },
        //           })
        //     )
        // }
       
        // await this.cfProductRepository.savePrices(prices);
        // await this.cfProductRepository.save(products)
    }
}


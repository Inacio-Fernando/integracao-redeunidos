import Product from "../domain/entity/Product";
import ProductRepositoryMssql from "../infra/ProductRepositoryMssql";
import ProductRepositoryMysql from "../infra/ProductRepositoryMysql";
import { Usecase } from "./Usecase";

export default class CreateProducts implements Usecase {
    constructor(
        readonly clientProductRepository: ProductRepositoryMssql,
        readonly cfProductRepository: ProductRepositoryMysql
    ){}
    
    async execute(): Promise<any> {
        const productEntities = await this.clientProductRepository.getAllProducts();
        const codes = productEntities
          .map((e) => e.plu)
          .filter((e) => e != undefined);
        const productsFound = await this.cfProductRepository.getProductsByCode(codes)
        
        const products = productEntities.map((entity) => {
            const product = productsFound[entity.plu]
            if(product) {
                return new Product({
                    id: product.getState().id,
                    code: entity.plu,
                    name: entity.descricao,
                    description:  entity.descricao ,
                    proportion: entity.unidade ,
                    sku: entity.codigoBarra?.toString() ,
                })
            }  
                return new Product({
                    name: entity.descricao,
                    code: entity.plu,
                    description:  entity.descricao ,
                    proportion: entity.unidade ,
                    sku: entity.codigoBarra?.toString() ,
                })
        })
        console.log(products)
        return products
        // await this.cfProductRepository.save(products)
    }
}


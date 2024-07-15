import { Usecase } from "./Usecase";
import Product from "./entity/Product";

export default class CreateProducts implements Usecase {
    constructor(
        readonly clientProductRepository,
        // readonly cfProductRepository
    ){}
    
    async execute(): Promise<any> {
        const productEntities = await this.clientProductRepository.getAllProducts();
        const products = productEntities.map((entity) => {
            return new Product({
                name: entity.descricao,
                description:  entity.descricao ,
                proportion: entity.unidade ,
                sku: entity.codigoBarra?.toString() ,
            })
        })
        console.log(products)
        // await this.cfProductRepository.save(products)
    }
}


export default class Product {
  private id: number;
  private name: string;
  private description: string;
  private proportion: string;
  private session: string;
  private group: string;
  private subgroup: string;
  private company: number = 1;
  private establishment: number = 1;
  private sku: string;
  private flag100g: string = '';

  constructor(input: Product.Input) {
    Object.assign(this, input);
  }

  getState(): Product.Output {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      proportion: this.proportion,
      session: this.session,
      group: this.group,
      subgroup: this.subgroup,
      company: this.company,
      establishment: this.establishment,
      sku: this.sku,
      flag100g: this.flag100g,
    };
  }
}

export namespace Product {
  export type Input = {
    name?: string;
    description?: string;
    proportion?: string;
    session?: string;
    group?: string;
    subgroup?: string;
    sku?: string;
  };
  export type Output = {
    id: number;
    name: string;
    description: string;
    proportion: string;
    session: string;
    group: string;
    subgroup: string;
    company: number;
    establishment: number;
    sku: string;
    flag100g: string;
  };
}

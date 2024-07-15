import Price from "./Price";

export default class Product {
  private id: number;
  private code: number;
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
  private prices: Price[]

  constructor(input: Partial<Product.Input>) {
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
      prices: this.prices
    };
  }
}

export namespace Product {
  export type Input = {
    id?: number;
    code?: number | null;
    name?: string | null;
    description?: string | null;
    proportion?: string | null;
    session?: string | null;
    group?: string | null;
    subgroup?: string | null;
    sku?: string | null;
    prices?: Price[]
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
    prices: Price[]
  };
}

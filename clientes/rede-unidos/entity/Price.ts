export default class Price {
  private id: number;
  private productId: number;
  private dynamic: number;
  private filial: number;
  private startDate: Date;
  private endDate: Date;
  private price: string;
  private hour: Date;
  private company: number = 1;
  private user: number = 1;

  constructor(input: Price.Input) {
    const { values, ...properties } = input;
    Object.assign(this, properties);
    this.price =
      values.promotional > 0
        ? values.promotional.toString()
        : values.base.toString();
    this.dynamic = 1;
    return this;
  }

  getState(): Price.Output {
    return {
      id: this.id,
      productId: this.productId,
      dynamic: this.dynamic,
      filial: this.filial,
      startDate: this.startDate.toISOString().split('T')[0],
      endDate: this.endDate.toISOString().split('T')[0],
      price: this.price,
      hour: this.hour.getHours().toString().concat(':',this.hour.getSeconds().toString()),
      company: this.company,
      user: this.user,
    };
  }
}

export namespace Price {
  export type Input = {
    productId: number;
    filial: number;
    startDate?: Date;
    endDate?: Date;
    hour?: Date;
    values: {
      base: number;
      promotional: number;
      cluster: number;
    };
  };
  export type Output = {
    id: number;
    productId: number;
    dynamic: number;
    filial: number;
    startDate: string;
    endDate: string;
    price: string;
    hour: string;
    company: number;
    user: number;
  };
}

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

  private constructor(input: Price.Create) {
    Object.assign(this, input);
    
    return this;
  }

  static createPrice(input: Partial<Price.Create>): Price {
    
    return new Price(input)
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
  // export type Create = {
  //   productId: number;
  //   filial: number;
  //   startDate?: Date;
  //   endDate?: Date;
  //   hour?: Date;
  //   values: {
  //     base: number;
  //     promotional: number;
  //     cluster: number;
  //   };
  // };
  export type Create = {
    id?: number
    productId: number
    dynamic: number
    filial: number
    startDate: Date
    endDate: Date
    price: string
    hour: Date
  }
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

export interface ISaleDTO {
  merchandiseId: number;
  dateOfSale: Date;
  emailOfBuyer: string;
  count: number;
  workerId: number;
}

export interface IEditSaleDTO extends ISaleDTO {
  id: number;
}

export interface IStockControlCardDTO {
  price: number;
  salePrice: number;
  arrivedDate: Date;
  issueDate: Date;
  place: string;
  waybillId: number;
  MerchandiseId: number;
  storageId: number;
  saleId: number;
}

export interface IEditStockControlCardDTO extends IStockControlCardDTO {
  id: number;
}

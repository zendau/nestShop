export interface IWaybillDTO {
  waybillName: string;
  providerId: number;
  recipientId: number;
}

export interface IEditWaybillDTO extends IWaybillDTO {
  id: number;
}

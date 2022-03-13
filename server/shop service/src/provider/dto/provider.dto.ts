export interface IProviderDTO {
  name: string;
  phone: string;
}

export interface IEditProviderDTO extends IProviderDTO {
  id: number;
}

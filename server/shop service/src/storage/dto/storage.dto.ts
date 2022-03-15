export interface IStorageDTO {
  address: string;
  workerId: number;
}

export interface IEditStorageDTO extends IStorageDTO {
  id: number;
}

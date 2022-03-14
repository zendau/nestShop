export interface IMerchandiseDTO {
  name: string;
  categoryId: number;
  image: string;
  description: string;
}

export interface IEditMerchandiseDTO extends IMerchandiseDTO {
  id: number;
}

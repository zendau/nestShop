export interface ICategoryDTO {
  name: string;
  description: string;
}

export interface IEditCategoryDTO extends ICategoryDTO {
  id: number;
}

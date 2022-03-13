export interface IRoleDTO {
  roleName: string;
  description: string;
}

export interface IEditRoleDTO extends IRoleDTO {
  id: number;
}

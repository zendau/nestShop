import { IsInt, Length, Min } from 'class-validator';

export class editRoleDataDTO {
  @IsInt()
  @Min(1)
  id: number;
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  value: string;
  @Length(2, 200, {
    message: 'Value is smaller than 2 or bigger than 200 signs',
  })
  desc: string;
}

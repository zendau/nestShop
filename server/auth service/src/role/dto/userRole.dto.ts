import { IsEmail, IsString, IsInt } from 'class-validator';

export class UserRole {
  @IsInt({ message: 'Is not number' })
  userId: number;
  @IsInt({ message: 'Is not number' })
  roleId: number;
}

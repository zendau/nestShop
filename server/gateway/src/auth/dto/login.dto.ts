import { IsEmail, IsString, Max, Min } from 'class-validator';

export class LoginData {
  @IsEmail({ message: 'Is not email' })
  @Min(0, { message: 'Value is empty' })
  @Max(15, { message: 'Value is bigger then 15' })
  email: string;
  @IsString({ message: 'Is not currect string' })
  @Min(0, { message: 'Value is empty' })
  @Max(15, { message: 'Value is bigger then 15' })
  password: string;
}

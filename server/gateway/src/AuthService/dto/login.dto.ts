import { IsEmail, IsString, Length } from 'class-validator';

export class LoginData {
  @Length(6, 20, {
    message: 'email is smaller than 6 signs or bigger than 20 signs',
  })
  @IsEmail({ message: 'Is not email' })
  email: string;

  @Length(6, 20, {
    message: 'password is smaller than 6 signs or bigger than 20 signs',
  })
  @IsString({ message: 'Is not currect string' })
  password: string;
}

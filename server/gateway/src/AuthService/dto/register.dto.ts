import { IsEmail, IsString, Length, Max, Min } from 'class-validator';

export class RegisterData {
  @IsEmail({ message: 'Is not email' })
  @Length(6, 20, {
    message: 'email is smaller than 6 signs or bigger than 20 signs',
  })
  email: string;
  @IsString({ message: 'Is not currect string' })
  @Length(6, 20, {
    message: 'password is smaller than 6 signs or bigger than 20 signs',
  })
  password: string;
  @IsString({ message: 'Is not currect string' })
  @Length(6, 20, {
    message: 'password is smaller than 6 signs or bigger than 20 signs',
  })
  confirmPassword: string;
}

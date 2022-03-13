import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class roleDTO {
  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  roleName: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  description: string;
}

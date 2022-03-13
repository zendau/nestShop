import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class categoryDTO {
  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  name: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  description: string;
}

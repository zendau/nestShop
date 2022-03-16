import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class editProviderDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  name: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  phone: string;
}

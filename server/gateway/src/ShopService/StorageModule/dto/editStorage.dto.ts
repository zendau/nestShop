import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class editStorageDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  address: string;

  @IsInt()
  @Min(1)
  workerId: number;
}

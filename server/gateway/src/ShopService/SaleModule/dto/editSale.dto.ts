import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class editSaleDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  dateOfSale: Date;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  emailOfBuyer: string;

  @IsInt()
  @Min(1)
  merchandiseId: number;

  @IsInt()
  @Min(1)
  workerId: number;

  @IsInt()
  @Min(1)
  count: number;
}

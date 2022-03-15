import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length, Min } from 'class-validator';

export class stockControlCardDTO {
  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  arrivedDate: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  issueDate: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  place: string;

  @IsInt()
  @Min(1)
  price: number;

  @IsInt()
  @Min(1)
  salePrice: number;

  @IsInt()
  @Min(1)
  waybillId: number;

  @IsInt()
  @Min(1)
  MerchandiseId: number;

  @IsInt()
  @Min(1)
  storageId: number;

  @IsInt()
  @Min(1)
  saleId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class editWaybillDTO {
  @IsInt()
  @Min(1)
  id: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  waybillName: string;

  @IsInt()
  @Min(1)
  recipientId: number;

  @IsInt()
  @Min(1)
  providerId: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsInt, Min } from 'class-validator';

export class editWorkerDTO {
  @IsInt()
  @Min(1)
  workerId: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  name: string;

  @IsInt()
  @Min(1)
  userId: number;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  birtday: Date;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  phone: string;

  @IsString()
  @Length(2, 20, {
    message: 'Value is smaller than 2 or bigger than 20 signs',
  })
  address: string;

  @IsInt()
  @Min(1)
  salary: number;

  @IsInt()
  @Min(1)
  workerRole: number;
}

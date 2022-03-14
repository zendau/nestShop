import { PartialType } from '@nestjs/mapped-types';
import { CreateStockcontrolcardDto } from './create-stockcontrolcard.dto';

export class UpdateStockcontrolcardDto extends PartialType(CreateStockcontrolcardDto) {}

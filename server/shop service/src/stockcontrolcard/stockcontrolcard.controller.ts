import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StockcontrolcardService } from './stockcontrolcard.service';
import {
  IStockControlCardDTO,
  IEditStockControlCardDTO,
} from './dto/stockcontrolcard.dto';

@Controller('stockcontrolcard')
export class StockcontrolcardController {
  constructor(
    private readonly stockcontrolcardService: StockcontrolcardService,
  ) {}

  @Post()
  create(@Body() createStockcontrolcardDto: IStockControlCardDTO) {
    return this.stockcontrolcardService.create(createStockcontrolcardDto);
  }

  @Get()
  findAll() {
    return this.stockcontrolcardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockcontrolcardService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStockcontrolcardDto: IEditStockControlCardDTO,
  ) {
    return this.stockcontrolcardService.update(+id, updateStockcontrolcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockcontrolcardService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StockcontrolcardService } from './stockcontrolcard.service';
import { CreateStockcontrolcardDto } from './dto/create-stockcontrolcard.dto';
import { UpdateStockcontrolcardDto } from './dto/update-stockcontrolcard.dto';

@Controller('stockcontrolcard')
export class StockcontrolcardController {
  constructor(private readonly stockcontrolcardService: StockcontrolcardService) {}

  @Post()
  create(@Body() createStockcontrolcardDto: CreateStockcontrolcardDto) {
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
  update(@Param('id') id: string, @Body() updateStockcontrolcardDto: UpdateStockcontrolcardDto) {
    return this.stockcontrolcardService.update(+id, updateStockcontrolcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stockcontrolcardService.remove(+id);
  }
}

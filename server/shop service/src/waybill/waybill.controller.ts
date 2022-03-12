import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { CreateWaybillDto } from './dto/create-waybill.dto';
import { UpdateWaybillDto } from './dto/update-waybill.dto';

@Controller('waybill')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @Post()
  create(@Body() createWaybillDto: CreateWaybillDto) {
    return this.waybillService.create(createWaybillDto);
  }

  @Get()
  findAll() {
    return this.waybillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.waybillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWaybillDto: UpdateWaybillDto) {
    return this.waybillService.update(+id, updateWaybillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.waybillService.remove(+id);
  }
}

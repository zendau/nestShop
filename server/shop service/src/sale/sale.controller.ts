import { Controller, Body, HttpStatus } from '@nestjs/common';
import { SaleService } from './sale.service';
import { ISaleDTO, IEditSaleDTO } from './dto/sale.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @MessagePattern('sale/add')
  async addSale(@Body() createSaleData: ISaleDTO) {
    const res = await this.saleService.create(createSaleData).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('sale/getAll')
  async getAllSales() {
    const res = await this.saleService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('sale/get')
  async getSale(@Payload() saleId: number) {
    const res = await this.saleService.getById(saleId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('sale/edit')
  async editSale(@Body() updateSaleDTO: IEditSaleDTO) {
    const res = await this.saleService.update(updateSaleDTO).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('sale/delete')
  async deleteSale(@Payload() saleId: number) {
    const res = await this.saleService.remove(saleId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

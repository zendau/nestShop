import { Controller, Body, HttpStatus } from '@nestjs/common';
import { WaybillService } from './waybill.service';
import { IWaybillDTO, IEditWaybillDTO } from './dto/waybill.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('waybill')
export class WaybillController {
  constructor(private readonly waybillService: WaybillService) {}

  @MessagePattern('waybill/add')
  async addWaybill(@Body() createWaybillData: IWaybillDTO) {
    const res = await this.waybillService
      .create(createWaybillData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('waybill/getAll')
  async getAllWaybills() {
    const res = await this.waybillService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('waybill/get')
  async getWaybill(@Payload() waybillId: number) {
    const res = await this.waybillService.getById(waybillId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('waybill/edit')
  async editWaybill(@Body() updateWaybillDto: IEditWaybillDTO) {
    const res = await this.waybillService
      .update(updateWaybillDto)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('waybill/delete')
  async deleteWaybill(@Payload() waybillId: number) {
    const res = await this.waybillService.remove(waybillId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

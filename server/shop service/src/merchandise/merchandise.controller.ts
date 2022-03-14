import { Controller, Body, HttpStatus } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { IMerchandiseDTO, IEditMerchandiseDTO } from './dto/merchandise.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MerchandiseController {
  constructor(private readonly merchandiseService: MerchandiseService) {}

  @MessagePattern('merchandise/add')
  async addCategory(@Body() createMerchandiseData: IMerchandiseDTO) {
    const res = await this.merchandiseService
      .create(createMerchandiseData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('merchandise/getAll')
  async getAllCategories() {
    const res = await this.merchandiseService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('merchandise/get')
  async getCategory(@Payload() merchandiseId: number) {
    const res = await this.merchandiseService
      .getById(merchandiseId)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('merchandise/edit')
  async editMerchandise(@Body() updateMerchandiseDTO: IEditMerchandiseDTO) {
    const res = await this.merchandiseService
      .update(updateMerchandiseDTO)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('merchandise/delete')
  async deleteMerchandise(@Payload() merchandiseId: number) {
    const res = await this.merchandiseService
      .remove(merchandiseId)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }
}

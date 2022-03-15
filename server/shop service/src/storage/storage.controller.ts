import { Controller, Body, HttpStatus } from '@nestjs/common';
import { StorageService } from './storage.service';
import { IStorageDTO, IEditStorageDTO } from './dto/storage.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @MessagePattern('storage/add')
  async addStorage(@Body() createStorageData: IStorageDTO) {
    const res = await this.storageService
      .create(createStorageData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('storage/getAll')
  async getAllStorages() {
    const res = await this.storageService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('storage/get')
  async getStorage(@Payload() storageId: number) {
    const res = await this.storageService.getById(storageId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('storage/edit')
  async editStorage(@Body() updateStorageDTO: IEditStorageDTO) {
    const res = await this.storageService
      .update(updateStorageDTO)
      .catch((err) => {
        console.log(err);
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('storage/delete')
  async deleteStorage(@Payload() storageId: number) {
    const res = await this.storageService.remove(storageId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

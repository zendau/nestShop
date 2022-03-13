import { Controller, Body, HttpStatus } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IProviderDTO, IEditProviderDTO } from './dto/provider.dto';

@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}

  @MessagePattern('provider/add')
  async addProvider(@Body() createProviderData: IProviderDTO) {
    const res = await this.providerService
      .create(createProviderData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('provider/getAll')
  async getAllProviders() {
    const res = await this.providerService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('provider/get')
  async getProvider(@Payload() providerId: number) {
    const res = await this.providerService.getById(providerId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('provider/edit')
  async editProvider(@Body() updateProviderDto: IEditProviderDTO) {
    const res = await this.providerService
      .update(updateProviderDto)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('provider/delete')
  async deleteProvider(@Payload() providerId: number) {
    const res = await this.providerService.remove(providerId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

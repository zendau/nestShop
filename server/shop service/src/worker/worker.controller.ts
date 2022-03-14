import { Controller, Body, HttpStatus } from '@nestjs/common';
import { WorkerService } from './worker.service';
import { IWorkerDTO, IEditWorkerDTO } from './dto/worker.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('worker')
export class WorkerController {
  constructor(private readonly workerService: WorkerService) {}

  @MessagePattern('worker/add')
  async addWorker(@Body() createWorkerData: IWorkerDTO) {
    console.log(createWorkerData);
    const res = await this.workerService
      .create(createWorkerData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('worker/getAll')
  async getAllWorkers() {
    const res = await this.workerService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('worker/get')
  async getWorker(@Payload() workerId: number) {
    const res = await this.workerService.getById(workerId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('worker/edit')
  async editWorker(@Body() updateWorkerDto: IEditWorkerDTO) {
    const res = await this.workerService
      .update(updateWorkerDto)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('worker/delete')
  async deleteWorker(@Payload() workerId: number) {
    const res = await this.workerService.remove(workerId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

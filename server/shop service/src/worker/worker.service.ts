import { RoleService } from './../role/role.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IWorkerDTO, IEditWorkerDTO } from './dto/worker.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/role/entities/role.entity';
import { Worker } from './entities/worker.entity';

@Injectable()
export class WorkerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    private roleService: RoleService,
  ) {}

  async create(createWorkerDTO: IWorkerDTO) {
    const workerRole = await this.roleService.getById(
      createWorkerDTO.workerRole,
    );

    if (workerRole instanceof Role) {
      const workerEntity = this.workerRepository.create();
      workerEntity.userId = createWorkerDTO.userId;
      workerEntity.name = createWorkerDTO.name;
      workerEntity.birtday = createWorkerDTO.birtday;
      workerEntity.phone = createWorkerDTO.phone;
      workerEntity.address = createWorkerDTO.address;
      workerEntity.salary = createWorkerDTO.salary;
      workerEntity.workerRole = workerRole;

      const resInsered = await this.workerRepository.save(workerEntity);
      return resInsered;
    } else {
      workerRole.message = `Worker role ${workerRole.message}`;
      return workerRole;
    }
  }

  async getAll() {
    return await this.workerRepository
      .createQueryBuilder('w')
      .innerJoinAndSelect('w.workerRole', 'workerRole')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.workerRepository
      .createQueryBuilder('w')
      .innerJoinAndSelect('w.workerRole', 'workerRole')
      .where('w.workerId = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateWorkerDTO: IEditWorkerDTO) {
    const workerRole = await this.roleService.getById(
      updateWorkerDTO.workerRole,
    );

    if (workerRole instanceof Role) {
      const res = await this.workerRepository
        .createQueryBuilder()
        .update()
        .set({
          userId: updateWorkerDTO.userId,
          name: updateWorkerDTO.name,
          birtday: updateWorkerDTO.birtday,
          phone: updateWorkerDTO.phone,
          address: updateWorkerDTO.address,
          salary: updateWorkerDTO.salary,
          workerRole: workerRole,
        })
        .where(`workerId = ${updateWorkerDTO.workerId}`)
        .execute();
      return !!res.affected;
    } else {
      workerRole.message = `Category ${workerRole.message}`;
      return workerRole;
    }
  }

  async remove(id: number) {
    const res = await this.workerRepository
      .createQueryBuilder()
      .delete()
      .where(`workerId = ${id}`)
      .execute();

    return !!res.affected;
  }
}

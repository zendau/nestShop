import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleDTO, IEditRoleDTO } from './dto/role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: IRoleDTO) {
    console.log('111');
    const resInsered = await this.roleRepository.save(createRoleDto);
    return resInsered;
  }

  async getAll() {
    return await this.roleRepository.createQueryBuilder().getMany();
  }

  async getById(id: number) {
    const res = await this.roleRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateRoleDTO: IEditRoleDTO) {
    const res = await this.roleRepository
      .createQueryBuilder()
      .update()
      .set({
        roleName: updateRoleDTO.roleName,
        description: updateRoleDTO.description,
      })
      .where(`id = ${updateRoleDTO.id}`)
      .execute();

    return !!res.affected;
  }

  async remove(id: number) {
    const res = await this.roleRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}

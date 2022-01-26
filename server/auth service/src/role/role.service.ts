import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import IEditUserData from './interfaces/IEditUserData';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async addNewRole(roleData: Role) {
    const resInsered = await this.rolesRepository.save(roleData);
    return resInsered;
  }

  async updateRole(roleData: IEditUserData) {
    const resUpdate = await this.rolesRepository
      .createQueryBuilder()
      .update()
      .set({
        value: roleData.value,
        desc: roleData.desc,
      })
      .where(`id = ${roleData.id}`)
      .execute();
    return resUpdate;
  }

  async getRoles() {
    const allRoles = await this.rolesRepository.createQueryBuilder().getMany();
    return allRoles;
  }

  async deleteRole(roleId: number) {
    const resDeleted = await this.rolesRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${roleId}`)
      .execute();
    return resDeleted;
  }

}

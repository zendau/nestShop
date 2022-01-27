import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { UserRole } from './userRole.entity';
import IEditUserData from './interfaces/IEditUserData';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private UserRoleRepository: Repository<UserRole>,
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
    console.log(roleId);
    const resDeleted = await this.rolesRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${roleId}`)
      .execute();
    return resDeleted;
  }

  async addUserRole(userRoleData: UserRole) {
    const res = await this.UserRoleRepository.save(userRoleData);

    return res;
  }

  async editUserRole(userRoleData: UserRole) {
    console.log(userRoleData);
    const resUpdate = await this.UserRoleRepository.createQueryBuilder()
      .update()
      .set({
        roleId: userRoleData.roleId,
      })
      .where(`userId = ${userRoleData.userId}`)
      .execute();
    return resUpdate;
  }

  async getUsersRole(roleId: number) {
    const res = await this.UserRoleRepository.createQueryBuilder('ur')
      .select(['ur.id', 'ur.role', 'ur.user'])
      .innerJoinAndSelect('ur.role', 'role')
      .innerJoinAndSelect('ur.user', 'user')
      .where(`role.id = ${roleId}`)
      .getMany();
    console.log(res);
    return res;
  }
}

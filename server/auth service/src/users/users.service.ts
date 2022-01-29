import { RoleService } from './../role/role.service';
import { TokenService } from './../token/token.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository, QueryRunner } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import IUser from './interfaces/IUserData';
import IUserLogin from './interfaces/IUserLogin';
import IUserDTO from './dto/user.dto';

@Injectable()
export class UsersService {
  private queryRunner: QueryRunner;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tokenService: TokenService,
    private roleService: RoleService,
    private connection: Connection,
  ) {
    this.queryRunner = this.connection.createQueryRunner();
  }

  async register(userData: IUser, typeStatus: boolean): Promise<any> {
    const resCheckEmail = await this.findByEmail(userData.email);
    if (!resCheckEmail.status) return resCheckEmail;

    const resCheckPasswords = await this.equalPasswords(
      userData.password,
      userData.confirmPassword,
    );
    if (!resCheckPasswords.status) return resCheckPasswords;

    const hashPassword = await this.hashPassword(userData.password);

    const userEntity = this.usersRepository.create();
    userEntity.email = userData.email;
    userEntity.password = hashPassword;

    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();

    try {
      const resInsered = await this.queryRunner.manager.save(User, userEntity);
      let tokens;

      if (!typeStatus) {
        tokens = await this.registerTransaction(resInsered, userData.roleId);
      } else {
        const role = await this.roleService.getRoleByName(
          process.env.BASE_USER_ROLE,
        );
        tokens = await this.registerTransaction(resInsered, role.id);
      }
      await this.queryRunner.commitTransaction();
      return tokens;
    } catch (e) {
      await this.queryRunner.rollbackTransaction();
      return {
        status: false,
        message: e.message,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    } finally {
      await this.queryRunner.release();
    }
  }

  async login(userData: IUserLogin) {
    const resUserData = await this.findByEmail(userData.email);

    if (resUserData.status) return resUserData;

    const resComparePasswords = await this.comparePassword(
      userData.password,
      resUserData.userData.password,
    );

    if (!resComparePasswords.status) {
      return resComparePasswords;
    }

    const tokens = this.saveTokens({
      ...resUserData.userData,
      role: resUserData.userData.roleId,
    });

    return tokens;
  }

  private async findByEmail(email: string) {
    const user = await this.usersRepository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.roleId', 'r')
      .where('u.email = :email', { email })
      .getOne();
    // const user = await this.usersRepository.find({
    //   where: {
    //     email,
    //   },
    //   relations: ['role'],
    // });

    if (user !== null)
      return {
        status: false,
        message: `Email - ${email} is already registered`,
        httpCode: HttpStatus.BAD_REQUEST,
        userData: user,
      };

    return {
      status: true,
      message: `Email - ${email} is not found`,
      httpCode: HttpStatus.BAD_REQUEST,
    };
  }

  private async equalPasswords(password: string, confirmPassword: string) {
    if (password === confirmPassword)
      return {
        status: true,
      };
    else
      return {
        status: false,
        message: `password and confirm password is not equals`,
        httpCode: HttpStatus.BAD_REQUEST,
      };
  }

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
  }

  private async comparePassword(password: string, hash: string) {
    const resCompare = await bcrypt.compare(password, hash);

    if (!resCompare)
      return {
        status: false,
        message: `Password is wrong`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return {
      status: true,
    };
  }

  private convertUserDTO(userData: IUserDTO) {
    return {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };
  }

  private async saveTokens(resInsert) {
    console.log(resInsert);
    const tokens = await this.tokenService.generateTokens(
      this.convertUserDTO(resInsert),
    );
    await this.tokenService.saveToken(
      resInsert.id,
      tokens.refreshToken,
      this.queryRunner.manager,
    );
    return tokens;
  }

  private async registerTransaction(userData: User, roleId: number) {
    const userRoleData = await this.roleService.addUserRole(
      {
        roleId: roleId,
        userId: userData.id,
      },
      this.queryRunner.manager,
    );

    const roleData = await this.roleService.getRoleById(userRoleData.roleId);

    return await this.saveTokens({
      ...userData,
      role: {
        ...roleData,
      },
    });
  }
}

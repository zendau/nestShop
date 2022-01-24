import { TokenService } from './../token/token.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import IUser from './interfaces/IUserData';
import IUserLogin from './interfaces/IUserLogin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async register(userData: IUser): Promise<any> {
    const resCheckEmail = await this.findByEmail(userData.email);

    if (!resCheckEmail.status) {
      return resCheckEmail;
    }

    const resCheckPasswords = await this.equalPasswords(
      userData.password,
      userData.confirmPassword,
    );

    if (!resCheckPasswords.status) {
      return resCheckPasswords;
    }

    const hashPassword = await this.hashPassword(userData.password);

    const userEntity = this.usersRepository.create();
    userEntity.email = userData.email;
    userEntity.password = hashPassword;

    const resInsered = await this.usersRepository.save(userEntity);

    const tokens = this.saveTokens(resInsered);

    return tokens;
  }

  async login(userData: IUserLogin) {
    const resCheckEmail = await this.findByEmail(userData.email);

    if (resCheckEmail.status) {
      return resCheckEmail;
    }

    const resComparePasswords = await this.comparePassword(
      userData.password,
      resCheckEmail.userData[0].password,
    );

    if (!resComparePasswords.status) {
      return resComparePasswords;
    }

    const tokens = this.saveTokens(resCheckEmail.userData[0]);
    return tokens;
  }

  private async findByEmail(email: string) {
    const user = await this.usersRepository.find({
      where: {
        email,
      },
    });

    if (user.length > 0)
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

  private convertUserDTO(userData: User) {
    return {
      id: userData.id,
      email: userData.email,
    };
  }

  private async saveTokens(resInsert: User) {
    const tokens = await this.tokenService.generateTokens(
      this.convertUserDTO(resInsert),
    );
    await this.tokenService.saveToken(resInsert.id, tokens.refreshToken);
    return tokens;
  }
}

import { TokenService } from './../token/token.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tokenService: TokenService,
  ) {}

  async create(userData: User): Promise<User> {
    const userEntity = this.usersRepository.create();
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    const res = await this.usersRepository.save(userEntity);

    const tokens = await this.tokenService.generateTokens(userData);

    console.log(tokens);

    return res;
  }
}

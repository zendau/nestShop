import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from './token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
  ) {}

  generateTokens(payload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '5m',
      secret: process.env.JWT_ACCESS_SECRET,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async findToken(refreshToken: string) {
    const tokenData = await this.tokenRepository.findOne({ refreshToken });
    return tokenData;
  }

  saveToken(userId: number, refreshToken: string, manager: null);
  saveToken(userId: number, refreshToken: string, manager: EntityManager);

  async saveToken(userId: number, refreshToken: string, manager?: any) {
    if (manager === null) manager = this.tokenRepository;

    const tokenData = await this.tokenRepository.findOne({
      where: {
        userId,
      },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await manager.save(tokenData);
    }

    const tokenEntity = await this.tokenRepository.create();
    tokenEntity.refreshToken = refreshToken;
    tokenEntity.userId = userId;

    const token = await manager.save(tokenEntity);
    return token;
  }

  async removeToken(refreshToken) {
    const tokenData = await this.tokenRepository
      .createQueryBuilder()
      .delete()
      .where(`refreshToken = ${refreshToken}`)
      .execute();

    return tokenData;
  }
}

import { Provider } from './entities/provider.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IProviderDTO, IEditProviderDTO } from './dto/provider.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProviderService {
  constructor(
    @InjectRepository(Provider)
    private provideRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: IProviderDTO) {
    const resInsered = await this.provideRepository.save(createProviderDto);
    return resInsered;
  }

  async getAll() {
    return await this.provideRepository.createQueryBuilder().getMany();
  }

  async getById(id: number) {
    console.log(id);
    const res = await this.provideRepository
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

  async update(updateProviderDTO: IEditProviderDTO) {
    const res = await this.provideRepository
      .createQueryBuilder()
      .update()
      .set({
        name: updateProviderDTO.name,
        phone: updateProviderDTO.phone,
      })
      .where(`id = ${updateProviderDTO.id}`)
      .execute();

    return !!res.affected;
  }

  async remove(id: number) {
    const res = await this.provideRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}

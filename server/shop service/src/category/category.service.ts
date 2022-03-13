import { Category } from './entities/category.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ICategoryDTO, IEditCategoryDTO } from './dto/category.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDTO: ICategoryDTO) {
    const resInsered = await this.categoryRepository.save(createCategoryDTO);
    return resInsered;
  }

  async getAll() {
    return await this.categoryRepository.createQueryBuilder().getMany();
  }

  async getById(id: number) {
    const res = await this.categoryRepository
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

  async update(updateCategoryDTO: IEditCategoryDTO) {
    const res = await this.categoryRepository
      .createQueryBuilder()
      .update()
      .set({
        name: updateCategoryDTO.name,
        description: updateCategoryDTO.description,
      })
      .where(`id = ${updateCategoryDTO.id}`)
      .execute();

    return !!res.affected;
  }

  async remove(id: number) {
    const res = await this.categoryRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}

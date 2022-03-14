import { Category } from './../category/entities/category.entity';
import { CategoryService } from './../category/category.service';
import { Merchandise } from './entities/merchandise.entity';
import { HttpStatus, Injectable } from '@nestjs/common';
import { IMerchandiseDTO, IEditMerchandiseDTO } from './dto/merchandise.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MerchandiseService {
  constructor(
    @InjectRepository(Merchandise)
    private merchandiseRepository: Repository<Merchandise>,
    private categoryService: CategoryService,
  ) {}

  async create(createMerchandiseDTO: IMerchandiseDTO) {
    const userCategory = await this.categoryService.getById(
      createMerchandiseDTO.categoryId,
    );

    if (userCategory instanceof Category) {
      const merchandiseEntity = this.merchandiseRepository.create();
      merchandiseEntity.categoryId = userCategory;
      merchandiseEntity.description = createMerchandiseDTO.description;
      merchandiseEntity.image = createMerchandiseDTO.image;
      merchandiseEntity.name = createMerchandiseDTO.name;

      const resInsered = await this.merchandiseRepository.save(
        merchandiseEntity,
      );
      return resInsered;
    } else {
      userCategory.message = `Category ${userCategory.message}`;
      return userCategory;
    }
  }

  async getAll() {
    return await this.merchandiseRepository
      .createQueryBuilder('m')
      .innerJoinAndSelect('m.categoryId', 'category')
      .getMany();
  }

  async getById(id: number) {
    const res = await this.merchandiseRepository
      .createQueryBuilder('m')
      .innerJoinAndSelect('m.categoryId', 'category')
      .where('m.id = :id', { id })
      .getOne();

    if (res === undefined)
      return {
        status: false,
        message: `id ${id} is not valid`,
        httpCode: HttpStatus.BAD_REQUEST,
      };

    return res;
  }

  async update(updateMerchandiseDTO: IEditMerchandiseDTO) {
    const userCategory = await this.categoryService.getById(
      updateMerchandiseDTO.categoryId,
    );

    if (userCategory instanceof Category) {
      const res = await this.merchandiseRepository
        .createQueryBuilder()
        .update()
        .set({
          categoryId: userCategory,
          name: updateMerchandiseDTO.name,
          image: updateMerchandiseDTO.image,
          description: updateMerchandiseDTO.description,
        })
        .where(`id = ${updateMerchandiseDTO.id}`)
        .execute();
      console.log(res);
      return !!res.affected;
    } else {
      userCategory.message = `Category ${userCategory.message}`;
      return userCategory;
    }
  }

  async remove(id: number) {
    const res = await this.merchandiseRepository
      .createQueryBuilder()
      .delete()
      .where(`id = ${id}`)
      .execute();

    return !!res.affected;
  }
}

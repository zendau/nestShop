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
    const itemCategory = await this.categoryService.getById(
      createMerchandiseDTO.categoryId,
    );

    if (itemCategory instanceof Category) {
      const merchandiseEntity = this.merchandiseRepository.create();
      merchandiseEntity.categoryId = itemCategory;
      merchandiseEntity.description = createMerchandiseDTO.description;
      merchandiseEntity.image = createMerchandiseDTO.image;
      merchandiseEntity.name = createMerchandiseDTO.name;

      const resInsered = await this.merchandiseRepository.save(
        merchandiseEntity,
      );
      return resInsered;
    } else {
      itemCategory.message = `Category ${itemCategory.message}`;
      return itemCategory;
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
    const itemCategory = await this.categoryService.getById(
      updateMerchandiseDTO.categoryId,
    );

    if (itemCategory instanceof Category) {
      const res = await this.merchandiseRepository
        .createQueryBuilder()
        .update()
        .set({
          categoryId: itemCategory,
          name: updateMerchandiseDTO.name,
          image: updateMerchandiseDTO.image,
          description: updateMerchandiseDTO.description,
        })
        .where(`id = ${updateMerchandiseDTO.id}`)
        .execute();
      console.log(res);
      return !!res.affected;
    } else {
      itemCategory.message = `Category ${itemCategory.message}`;
      return itemCategory;
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

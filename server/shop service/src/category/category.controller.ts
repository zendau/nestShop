import { Controller, Body, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CategoryService } from './category.service';
import { ICategoryDTO, IEditCategoryDTO } from './dto/category.dto';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @MessagePattern('category/add')
  async addCategory(@Body() createCategoryData: ICategoryDTO) {
    const res = await this.categoryService
      .create(createCategoryData)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('category/getAll')
  async getAllCategories() {
    const res = await this.categoryService.getAll().catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('category/get')
  async getCategory(@Payload() categoryId: number) {
    const res = await this.categoryService.getById(categoryId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }

  @MessagePattern('category/edit')
  async editCategory(@Body() updateCategoryDTO: IEditCategoryDTO) {
    const res = await this.categoryService
      .update(updateCategoryDTO)
      .catch((err) => {
        return {
          status: false,
          message: err.sqlMessage,
          httpCode: HttpStatus.BAD_REQUEST,
        };
      });
    return res;
  }

  @MessagePattern('category/delete')
  async deleteCategory(@Payload() categoryId: number) {
    const res = await this.categoryService.remove(categoryId).catch((err) => {
      return {
        status: false,
        message: err.sqlMessage,
        httpCode: HttpStatus.BAD_REQUEST,
      };
    });
    return res;
  }
}

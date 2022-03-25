import { Controller, Logger } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Categories } from './interfaces/categories/category.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  logger = new Logger(AppController.name);

  @EventPattern('create-category')
  async createCategory(@Payload() category: Categories) {
    this.logger.log(`Category: ${JSON.stringify(category)}`);
    await this.appService.createCategory(category);
  }

  @MessagePattern('query-categories')
  async getCategories(@Payload() _id: string) {
    if (_id) {
      return await this.appService.queryCategoryById(_id);
    } else {
      return await this.appService.queryCategories();
    }
  }
}

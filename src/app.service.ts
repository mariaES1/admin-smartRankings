import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from './interfaces/categories/category.interface';
import { Player } from './interfaces/players/player.interface';
import { Model } from 'mongoose';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Categories>,
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(AppService.name);

  async createCategory(category: Categories): Promise<Categories> {
    try {
      const createdCategory = new this.categoryModel(category);
      return await createdCategory.save();
    } catch (error) {
      this.logger.log(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async queryCategories(): Promise<Categories[]> {
    try {
      return await this.categoryModel.find().exec();
    } catch (error) {
      this.logger.log(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }

  async queryCategoryById(_id: string): Promise<Categories> {
    try {
      return await this.categoryModel.findOne({ _id }).exec();
    } catch (error) {
      this.logger.log(`error: ${JSON.stringify(error.message)}`);
      throw new RpcException(error.message);
    }
  }
}

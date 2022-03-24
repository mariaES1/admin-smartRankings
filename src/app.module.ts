import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesSchema } from './interfaces/categories/category.schema';
import { PlayerSchema } from './interfaces/players/player.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Maria:DlkcN4qR7VhlH8Sw@cluster0.uvx5v.mongodb.net/srAdmin?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([
      { name: 'Cetegory', schema: CategoriesSchema },
      { name: 'Player', schema: PlayerSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

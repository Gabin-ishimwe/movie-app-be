import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { CategoryModule } from '../category/category.module';
import { CategoryController } from 'src/category/category.controller';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [CategoryModule],
})
export class MovieModule {}

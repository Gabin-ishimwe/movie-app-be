import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { CategoryModule } from 'src/category/category.module';
import { CategoryController } from 'src/category/category.controller';

@Module({
  controllers: [BlogController],
  providers: [BlogService],
  imports: [CategoryModule],
})
export class BlogModule {}

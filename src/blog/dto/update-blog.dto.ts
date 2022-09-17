import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @IsString()
  title: string;

  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  // image: string;

  // @IsNotEmpty()
  // @IsString()
  // userId: string;
}

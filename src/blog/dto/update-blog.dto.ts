import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty({
    description: 'title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description',
  })
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: any;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsString()
  // image: string;

  // @IsNotEmpty()
  // @IsString()
  // userId: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

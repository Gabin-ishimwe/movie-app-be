import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;

  @ApiProperty({
    description: 'rating',
  })
  @IsString()
  rating: string;

  @ApiProperty({
    description: 'category Id',
  })
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

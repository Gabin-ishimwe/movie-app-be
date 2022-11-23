import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsEmpty, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
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

  @ApiProperty({
    description: 'rating',
  })
  rating: string;
}

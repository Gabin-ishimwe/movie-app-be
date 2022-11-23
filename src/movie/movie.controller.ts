import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  ForbiddenException,
  HttpException,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Delete,
  ParseFilePipeBuilder,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { uploadImage } from '../helpers/imageUpload';
import { CategoryService } from '../category/category.service';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('Movie')
@Controller('movie')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { title, description, categoryId, rating } = createMovieDto;
      const category = await this.categoryService.findId(
        parseInt(categoryId, 10),
      );
      if (!category) {
        throw new ForbiddenException('Category not found');
      }
      const imageUpload = await uploadImage(file);
      const image = imageUpload.secure_url;
      const movie = await this.movieService.create({
        title,
        description,
        image,
        rating: parseInt(rating, 10),
        categoryId: parseInt(categoryId, 10),
      });
      return movie;
    } catch (error) {
      console.log(error);
      if (error.message) {
        throw new HttpException(error?.message, 500);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.movieService.findOne(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return movie;
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipeBuilder().build({ fileIsRequired: false }))
    file: Express.Multer.File,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    try {
      let image;
      const { title, description, rating } = updateMovieDto;
      const movie = await this.movieService.findOne(id);
      if (!movie) {
        throw new ForbiddenException('Movie not found');
      }
      if (file) {
        const imageUpload = await uploadImage(file);
        image = imageUpload.secure_url;
      }
      const updateMovie = await this.movieService.update(id, {
        title,
        description,
        image,
        rating: parseInt(rating, 10),
      });
      return updateMovie;
    } catch (error) {
      console.log(error);
      if (error.message) {
        throw new HttpException(error?.message, 500);
      }
      throw new HttpException('Server error', 500);
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const movie = await this.movieService.findOne(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    const deleteMovie = await this.movieService.remove(id);
    return deleteMovie;
  }
}

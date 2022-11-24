import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    const category = await this.categoryService.findOne(name);
    if (category) {
      throw new HttpException('category arleady exists', HttpStatus.AMBIGUOUS);
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const findCategory = await this.categoryService.findId(id);
    if (!findCategory) {
      throw new NotFoundException("Category doesn't exist");
    }
    return findCategory;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    const findCategory = await this.categoryService.findId(id);
    if (!findCategory) {
      throw new NotFoundException("Category doesn't exist");
    }
    return this.categoryService.update(id, createCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const findCategory = await this.categoryService.findId(id);
    if (!findCategory) {
      throw new NotFoundException("Category doesn't exist");
    }
    return this.categoryService.remove(id);
  }
}

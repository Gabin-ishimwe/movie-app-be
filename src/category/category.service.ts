import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(name: string) {
    return this.prisma.category.findUnique({ where: { name } });
  }

  findId(id: number) {
    return this.prisma.category.findUnique({ where: { id } });
  }

  update(id: number, createCategoryDto: CreateCategoryDto) {
    const { name } = createCategoryDto;
    return this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}

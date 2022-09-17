import { Injectable } from '@nestjs/common';
import { Article } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

export interface CreateBlog {
  title: string;
  description: string;
  image: string;
  userId: number;
  categoryId: number;
}

export interface UpdateBlog {
  title: string;
  description: string;
  image: string;
}

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}
  create(createBlogDto: CreateBlog) {
    const { title, description, image, userId, categoryId } = createBlogDto;
    return this.prisma.article.create({
      data: {
        title,
        description,
        image,
        userId,
        categoryId,
      },
    });
  }

  findAll() {
    return this.prisma.article.findMany();
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateBlogDto: UpdateBlog) {
    const { title, description, image } = updateBlogDto;

    return this.prisma.article.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
      },
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface CreateMovie {
  title: string;
  description: string;
  image: string;
  rating: number;
  categoryId: number;
}

export interface UpdateMovie {
  title: string;
  description: string;
  image: string;
  rating: number;
}

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  create(createMovieDto: CreateMovie) {
    const { title, description, image, categoryId, rating } = createMovieDto;
    return this.prisma.movie.create({
      data: {
        title,
        description,
        image,
        rating,
        categories: {
          create: [
            {
              assignedAt: new Date(),
              category: {
                connect: {
                  id: categoryId,
                },
              },
            },
          ],
        },
      },
    });
  }

  findAll() {
    return this.prisma.movie.findMany({
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  findOne(id: number) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        categories: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  update(id: number, updateMovieDto: UpdateMovie) {
    const { title, description, image, rating } = updateMovieDto;

    return this.prisma.movie.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        image,
        rating,
      },
    });
  }

  async remove(id: number) {
    const transaction = await this.prisma.$transaction([
      this.prisma.movie.update({
        where: { id },
        data: {
          categories: {
            deleteMany: {},
          },
        },
      }),
      this.prisma.movie.delete({
        where: { id },
      }),
    ]);
    return transaction.length > 0 ? `Movie with id ${id} deleted` : null;
  }
}

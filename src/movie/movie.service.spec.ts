import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { MovieService } from './movie.service';

describe('Movie Service', () => {
  let movieService: MovieService;
  const mockPrismaService = {
    movie: {
      findMany: jest.fn(() => {
        return [];
      }),
      findUnique: jest.fn((arg) => {
        return {
          id: arg.where.id,
          title: 'avengers',
          description: 'marvels movie',
          rating: 1,
          image: '',
        };
      }),
      update: jest.fn((arg) => {
        const id = arg.where.id;
        return {
          id,
          title: arg.data.title,
          description: arg.data.description,
          image: arg.data.image,
          rating: arg.data.rating,
        };
      }),
      delete: jest.fn((arg) => {
        return arg.where.id;
      }),
      create: jest.fn((arg) => {
        return {
          title: arg.data.title,
          description: arg.data.description,
          image: arg.data.image,
          rating: arg.data.rating,
        };
      }),
    },
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, MovieService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();
    movieService = moduleRef.get<MovieService>(MovieService);
  });
  it('should retrieve all movies', () => {
    expect(movieService.findAll()).toEqual([]);
  });
  it('should retrieve one movie by id', () => {
    expect(movieService.findOne(1)).toEqual({
      id: 1,
      title: 'avengers',
      description: 'marvels movie',
      rating: 1,
      image: '',
    });
  });
  it('should create a movie', () => {
    const createDto = {
      title: 'avengers',
      description: 'marvels movie',
      rating: 1,
      image: '',
      categoryId: 1,
    };
    expect(movieService.create(createDto)).toEqual({
      title: 'avengers',
      description: 'marvels movie',
      rating: 1,
      image: '',
    });
  });
  it('should update one movie by id', () => {
    const updateDto = {
      title: 'avengers',
      description: 'marvels movie',
      rating: 1,
      image: '',
    };
    expect(movieService.update(1, updateDto)).toEqual({
      id: 1,
      ...updateDto,
    });
  });

  it('should rank movies', () => {
    expect(movieService.rankMovie('asc')).toEqual([]);
  });
  // it('should delete movie by id', () => {
  //   expect(movieService.remove(1)).toEqual(1);
  // });
});

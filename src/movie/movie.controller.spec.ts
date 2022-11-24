import { Test } from '@nestjs/testing';
import { CategoryModule } from '../category/category.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

describe('Movie Controller', () => {
  let movieController: MovieController;
  const mockMovieService = {
    findAll: jest.fn(() => {
      return [];
    }),
    findOne: jest.fn((id) => {
      return {
        id,
        title: 'avengers',
        description: 'marvels movie',
        rating: 1,
        image: '',
      };
    }),
    create: jest.fn((dto) => {
      return dto;
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
      };
    }),
    findId: jest.fn((id) => {
      return {
        id,
        name: 'action',
      };
    }),
    remove: jest.fn((id) => {
      return id;
    }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [MovieService],
      imports: [CategoryModule],
    })
      .overrideProvider(MovieService)
      .useValue(mockMovieService)
      .compile();
    movieController = moduleRef.get<MovieController>(MovieController);
  });

  it('should retrieve all movies', () => {
    expect(movieController.findAll()).toEqual([]);
  });
  // it('should create category', async () => {
  //   const res = await categoryController.create({ name: 'actons' });
  //   expect(res).toHaveProperty('name');
  // });
  // it('should update category', async () => {
  //   const dto = { name: 'action' };
  //   const res = await categoryController.update(1, dto);
  //   expect(res).toEqual({
  //     id: 1,
  //     ...dto,
  //   });
  // });
  it('should retrieve one movie', async () => {
    const res = await movieController.findOne(1);
    expect(res).toEqual({
      id: 1,
      title: 'avengers',
      description: 'marvels movie',
      rating: 1,
      image: '',
    });
  });
  it('should delete category', async () => {
    const res = await movieController.remove(1);
    expect(res).toEqual(1);
  });
});

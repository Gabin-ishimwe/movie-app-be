import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryService } from './category.service';

describe('Category Service', () => {
  let categoryService: CategoryService;
  const mockPrismaService = {
    category: {
      findMany: jest.fn(() => {
        return [];
      }),
      findUnique: jest.fn((arg) => {
        return arg.where.name
          ? {
              name: arg.where.name,
            }
          : {
              id: arg.where.id,
              name: 'action',
            };
      }),
      update: jest.fn((arg) => {
        const id = arg.where.id;
        const name = arg.data.name;
        return {
          id,
          name,
        };
      }),
      delete: jest.fn((arg) => {
        return arg.where.id;
      }),
      create: jest.fn((arg) => {
        return {
          name: arg.data.name,
        };
      }),
    },
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PrismaService, CategoryService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();
    categoryService = moduleRef.get<CategoryService>(CategoryService);
  });
  it('should retrieve all categories', () => {
    expect(categoryService.findAll()).toEqual([]);
  });
  it('should retrieve one category by name', () => {
    expect(categoryService.findOne('action')).toEqual({
      name: 'action',
    });
  });
  it('should retrieve one category by id', () => {
    expect(categoryService.findId(1)).toEqual({
      id: 1,
      name: 'action',
    });
  });
  it('should create a category', () => {
    const createDto = { name: 'action' };
    expect(categoryService.create(createDto)).toEqual({
      name: 'action',
    });
  });
  it('should update one category by id', () => {
    const updateDto = { name: 'updated' };
    expect(categoryService.update(1, updateDto)).toEqual({
      id: 1,
      name: 'updated',
    });
  });
  it('should delete catgory by id', () => {
    expect(categoryService.remove(1)).toEqual(1);
  });
});

import { Test } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

describe('Category Controller', () => {
  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;
  let categoryController: CategoryController;
  const mockCategoryService = {
    findAll: jest.fn(() => {
      return [];
    }),
    findOne: jest.fn(() => {
      return null;
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
        id: 1,
        name: 'category',
      };
    }),
  };
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  it('should test category controller', () => {
    expect(categoryController).toBeDefined();
  });
  it('should retrieve all categories', () => {
    expect(categoryController.findAll()).toEqual([]);
  });
  it('should create category', () => {
    expect(categoryController.create({ name: 'action' })).toEqual({
      name: 'action',
    });
  });
  // it('should update category', () => {
  //   const dto = { name: 'category' };
  //   expect(categoryController.update(1, dto)).toEqual({
  //     id: 1,
  //     ...dto,
  //   });
  // });
});

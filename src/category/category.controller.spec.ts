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
    findOne: jest.fn((id) => {
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
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();
    categoryController = moduleRef.get<CategoryController>(CategoryController);
  });

  it('should retrieve all categories', () => {
    expect(categoryController.findAll()).toEqual([]);
  });
  it('should create category', async () => {
    const res = await categoryController.create({ name: 'actons' });
    expect(res).toHaveProperty('name');
  });
  it('should update category', async () => {
    const dto = { name: 'action' };
    const res = await categoryController.update(1, dto);
    expect(res).toEqual({
      id: 1,
      ...dto,
    });
  });
  it('should retrieve one category', async () => {
    const res = await categoryController.findOne(1);
    expect(res).toEqual({
      id: 1,
      name: 'action',
    });
  });
  it('should delete category', async () => {
    const res = await categoryController.remove(1);
    expect(res).toEqual(1);
  });
});

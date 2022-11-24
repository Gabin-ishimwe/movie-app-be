import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CategoryModule } from '../src/category/category.module';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { CategoryService } from '../src/category/category.service';

describe('Category Module e2e testing', () => {
  let app: INestApplication;
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
        return { id: arg.where.id };
      }),
      create: jest.fn((arg) => {
        return {
          name: arg.data.name,
        };
      }),
    },
  };
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CategoryModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    await app.init();
  });

  afterAll(() => {
    app.close();
  });
  it('/category (GET) all categories', () => {
    return request(app.getHttpServer())
      .get('/category')
      .expect('Content-Type', /json/)
      .expect(200);
  });

  it('/category/1 (GET) one category', () => {
    return request(app.getHttpServer())
      .get('/category/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'action',
        });
      });
  });

  it('/category/1 (PUT) update one category', () => {
    return request(app.getHttpServer())
      .patch('/category/1')
      .send({ name: 'updated' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          id: 1,
          name: 'updated',
        });
      });
  });

  it('/category/1 (DELETE) delete one category', () => {
    return request(app.getHttpServer())
      .delete('/category/1')
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toEqual({ id: 1 });
      });
  });

  // it('/category (POST) create categories', () => {
  //   return request(app.getHttpServer())
  //     .post('/category')
  //     .send({ name: 'action' })
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .then((res) => {
  //       console.log(res.body);
  //       expect(res.body).toEqual({ name: 'action' });
  //     });
  // });
});

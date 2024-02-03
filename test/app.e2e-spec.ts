import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MasterModule } from '@api/modules';
import { faker } from '@faker-js/faker';

describe('E2E Testing', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MasterModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await Promise.all([app.close()]);
  });
  let accessToken: string;
  let refreshToken: string;
  const fullname = faker.person.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const categoryId = faker.string.uuid();
  const categoryName = 'Test';
  const productId = faker.string.uuid();
  const productName = faker.commerce.productName();
  const productPrice = String(Number(faker.finance.amount({ dec: 0 })) * 1000);
  const productCategoryId = categoryId;
  describe('Authentication test case', () => {
    it('Register users with valid data', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email,
          password,
          fullname,
        })
        .expect(201);
    });

    it('Login user with valid credentials and provides a jwt token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password })
        .expect(201);

      accessToken = response.body.accessToken;
      refreshToken = response.body.refreshToken;
      expect(response.body.accessToken).toBeDefined();
      expect(accessToken).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      );
    });

    it('fails to authenticate user with an incorrect password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password: faker.internet.password() })
        .expect(401);

      expect(response.body.accessToken).not.toBeDefined();
    });

    it('Refresh token with valid jwt token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(201);

      accessToken = response.body.accessToken;
      expect(response.body.accessToken).toBeDefined();
      expect(accessToken).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      );
    });
    it('Refresh token with invalid jwt token', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({
          refreshToken:
            'eyJhbGciOiJIUzI1NisInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNjAzYjMzMi0yODE1LTQ4NDktYmE0Ni1jYjkxMGQzYWRmZTQiLCJlbWFpbCI6InN1Z2lhcnRvZmFobWlAZ21haWwuY29tIiwiaWF0IjoxNzA2OTczNzU5LCJleHAiOjE3MDc1Nzg1NTl9.ejlUXalaU6A10HzfXHJYR0xeUAvjgtCMScvEOYsJfBg',
        })
        .expect(401);
    });
  });
  describe('Category test case', () => {
    it('Can add new category', async () => {
      await request(app.getHttpServer())
        .post('/category')
        .auth(accessToken, { type: 'bearer' })
        .send({
          id: categoryId,
          name: categoryName,
        })
        .expect(201);
    });
    it('Cant add category because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .post('/category')
        .send({
          id: categoryId,
          name: categoryName,
        })
        .expect(401);
    });
    it('Can read category', async () => {
      await request(app.getHttpServer())
        .get('/category')
        .auth(accessToken, { type: 'bearer' })
        .send()
        .expect(200);
    });
    it('Cant read because jwt is invalid', async () => {
      await request(app.getHttpServer()).get('/category').send().expect(401);
    });
    it('Can update category', async () => {
      await request(app.getHttpServer())
        .patch(`/category/${categoryId}`)
        .auth(accessToken, { type: 'bearer' })
        .send({
          name: faker.commerce.productName(),
        })
        .expect(200);
    });
    it('Cant update because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .patch(`/category/${categoryId}`)
        .send({
          name: faker.commerce.productName(),
        })
        .expect(401);
    });
    it('Can delete category', async () => {
      await request(app.getHttpServer())
        .delete(`/category/${categoryId}`)
        .auth(accessToken, { type: 'bearer' })
        .send()
        .expect(200);
    });
    it('Cant delete because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .delete(`/category/${categoryId}`)
        .send()
        .expect(401);
    });
  });
  describe('Product test case', () => {
    it('Can add new product', async () => {
      await request(app.getHttpServer())
        .post('/category')
        .auth(accessToken, { type: 'bearer' })
        .send({
          id: categoryId,
          name: categoryName,
        });

      await request(app.getHttpServer())
        .post('/product')
        .auth(accessToken, { type: 'bearer' })
        .send({
          id: productId,
          name: productName,
          price: productPrice,
          categoryId: productCategoryId,
        })
        .expect(201);
    });
    it('Cant add product because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .post('/product')
        .send({
          id: productId,
          name: productName,
          price: productPrice,
          categoryId: productCategoryId,
        })
        .expect(401);
    });

    it('Can update product', async () => {
      await request(app.getHttpServer())
        .patch(`/product/${productId}`)
        .auth(accessToken, { type: 'bearer' })
        .send({
          name: faker.commerce.productName(),
        })
        .expect(200);
    });
    it('Cant update product because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .patch(`/product/${productId}`)
        .send({
          name: faker.commerce.productName(),
        })
        .expect(401);
    });

    it('Can delete product', async () => {
      await request(app.getHttpServer())
        .delete(`/product/${productId}`)
        .auth(accessToken, { type: 'bearer' })
        .send()
        .expect(200);
    });
    it('Cant delete product because jwt is invalid', async () => {
      await request(app.getHttpServer())
        .delete(`/product/${productId}`)
        .send()
        .expect(401);
    });
  });
});

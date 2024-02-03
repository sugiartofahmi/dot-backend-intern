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
  describe('Auth Service', () => {
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
    it('Registering users with invalid data', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password',
        })
        .expect(400);
    });
    it('Register the user with the email that has been used', async () => {
      await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          email,
          password,
          fullname,
        })
        .expect(409);
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
        .send({ email, password: 'password' })
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
  describe('Book Service', () => {
    it('Register users with valid data', async () => {
      await request(app.getHttpServer())
        .get('/book')
        .auth(accessToken, { type: 'bearer' })
        .send()
        .expect(200);
    });
  });
});

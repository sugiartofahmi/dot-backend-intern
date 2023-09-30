import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MasterModule } from '@api/modules';

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
  let access_token: string;
  describe('AuthModule', () => {
    it('authenticates user with valid credentials and provides a jwt token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'sugiartofahmi@gmail.com', password: 'Gegebanget1' })
        .expect(201);

      access_token = response.body.access_token;
      expect(response.body.access_token).toBeDefined();
      expect(access_token).toMatch(
        /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
      );
    });

    it('fails to authenticate user with an incorrect password', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'sugiartofahmi@gmail.com', password: 'Gegebaget1' })
        .expect(401);

      expect(response.body.access_token).not.toBeDefined();
    });
  });
  describe('UserModule', () => {
    it('Get data user success', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/me')
        .auth(access_token, { type: 'bearer' })
        .send();

      expect(response.status).toBe(200);
    });
    it('Get data user failed', async () => {
      const response = await request(app.getHttpServer())
        .get('/user/me')
        .auth('444k', { type: 'bearer' })
        .send();

      expect(response.status).toBe(401);
    });
  });
  describe('PermissionGuard', () => {
    it('PermissionGuard success', async () => {
      const response = await request(app.getHttpServer())
        .get('/user')
        .auth(access_token, { type: 'bearer' })
        .send();

      expect(response.status).toBe(200);
    });
    it('PermissionGuard failed', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'sugiartofahmi24@gmail.com',
          password: 'Gegebanget1',
        });
      const response = await request(app.getHttpServer())
        .get('/user')
        .auth(loginResponse.body.access_token, { type: 'bearer' })
        .send();

      expect(response.status).toBe(403);
    });
  });
});

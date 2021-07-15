import { UsersController } from './../src/users/users.controller';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../src/users/users.module';
import * as request from 'supertest';
import { UsersService } from '../src/users/users.service';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { response } from 'express';

describe('UsersController (e2e)', () => {
  let app: INestApplication;

  const mockUsers = [
    {
      email: 'minhdoan2@gmail.com',
      password: 'hsu321',
    },
  ];

  const mockUsersRepository = {
    post: jest.fn().mockImplementation((dto) => dto),
    find: jest.fn().mockResolvedValue(mockUsers),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //   it('/users (GET)', () => {
  //     return request(app.getHttpServer())
  //       .get('/users')
  //       .expect(200)
  //       .expect('Hello World!');
  //   });

  it('/users/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/users/signin')
      .send({
        email: 'minhdoan2@gmail.com',
        password: 'hsu321',
      })
      .expect(201);
    //   .expect((response) => {
    //     console.log(response.body);
    //   });
  });
});

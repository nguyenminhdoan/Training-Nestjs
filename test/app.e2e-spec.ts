import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { RegisterDTO } from 'src/auth/auth.dto';
import { AuthModule } from '../src/auth/auth.module';
import { UserService } from '../src/shared/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../src/config/typeorm.config';
import { AuthService } from '../src/auth/auth.service';
import { SharedModule } from '../src/shared/shared.module';
// import { TestModule } from './test.module';

describe('AUTH', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/nestjs');
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule, SharedModule, TypeOrmModule.forRoot(config)],
      providers: [UserService, AuthService],
    }).compile();

    app = await moduleRef.createNestApplication().init();
  });

  afterAll(async (done) => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect(done);
  });

  let userToken: string;

  const user: RegisterDTO = {
    email: 'minhdoan3@gmail.com',
    password: 'hsu123',
  };

  const wrongUser: RegisterDTO = {
    email: 'minhdoan@gmail.com',
    password: 'hsu123',
  };

  it('should register successfully', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        console.log(body);
        expect(body.token).toBeUndefined();
        expect(body.email).toEqual('minhdoan3@gmail.com');
        expect(body.password).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should raise an error duplicate account', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        console.log(body);
        expect(body.message).toEqual('User already exists');
      });
  });

  it('should login user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        userToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual('minhdoan3@gmail.com');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should login fail user', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(wrongUser)
      .expect(({ body }) => {
        expect(body.message).toEqual('Invalid login');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

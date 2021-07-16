import { HttpStatus } from '@nestjs/common';
import { RegisterDTO } from 'src/auth/auth.dto';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
const app = 'http://localhost:3000';

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/nestjs');
  await mongoose.connection.db.dropDatabase();
});

afterAll(async (done) => {
  await mongoose.disconnect(done);
});

// describe('AppController (e2e)', () => {
//   it('/ (GET)', () => {
//     return request(app).get('/').expect(200).expect('hello world');
//   });
// });

describe('AUTH', () => {
  const user: RegisterDTO = {
    email: 'minhdoan3@gmail.com',
    password: 'hsu123',
  };

  const wrongUser: RegisterDTO = {
    email: 'minhdoan@gmail.com',
    password: 'hsu123',
  };

  let userToken: string;

  it('should register successfully', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        console.log(body);
        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual('minhdoan3@gmail.com');
        expect(body.user.password).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should raise an error duplicate account', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        console.log(body);
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login user', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        userToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.user.email).toEqual('minhdoan3@gmail.com');
        expect(body.user.password).toBeDefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should login fail user', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(wrongUser)
      .expect(({ body }) => {
        expect(body.message).toEqual('Invalid login');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});

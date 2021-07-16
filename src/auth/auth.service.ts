import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';

// export type User = {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
// };
@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  // private readonly users: User[] = [
  //   {
  //     id: 1,
  //     name: 'doan',
  //     email: 'minhdoan1@gmail.com',
  //     password: 'hsu123',
  //   },
  //   {
  //     id: 2,
  //     name: 'andrew',
  //     email: 'minhdoan2@gmail.com',
  //     password: 'hsu321',
  //   },
  // ];

  // async validateUser(email: string, password: string): Promise<any> {
  //   const user = await this.findOne(email);
  //   if (user && user.password === password) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  // async findOne(email: string): Promise<User | undefined> {
  //   return this.users.find((user) => user.email === email);
  // }

  async signPayload(payload: any) {
    return sign(payload, 'secretkey', { expiresIn: '12h' });
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}

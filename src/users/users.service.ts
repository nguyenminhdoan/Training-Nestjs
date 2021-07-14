import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'doan',
      email: 'minhdoan1@gmail.com',
      password: 'hsu123',
    },
    {
      id: 2,
      name: 'andrew',
      email: 'minhdoan2@gmail.com',
      password: 'hsu321',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}

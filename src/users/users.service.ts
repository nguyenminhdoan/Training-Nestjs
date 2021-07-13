import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
};
@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      name: 'doan',
      username: 'minhdoan1@gmail.com',
      password: 'hsu123',
    },
    {
      id: 2,
      name: 'andrew',
      username: 'minhdoan2',
      password: 'hsu321',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}

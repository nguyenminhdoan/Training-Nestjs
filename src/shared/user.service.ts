import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { User } from '../user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDTO: RegisterDTO) {
    const { email } = userDTO;
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = await this.userRepository.save(userDTO);

    return createdUser;
  }

  async findByLogin(userDTO: LoginDTO) {
    const { email, password } = userDTO;
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
    }

    if (await bcrypt.compare(password, user.password)) {
      if (user._id) {
        const { _id, email } = user;
        return {
          email,
          _id,
        };
      }
    } else {
      throw new HttpException('Invalid login', HttpStatus.UNAUTHORIZED);
    }
  }

  async findByPayload(payload: any) {
    const { email } = payload;
    return await this.userRepository.findOne({ email });
  }

  createUser(email: string, password: string) {
    console.log(name);
    const newUser = this.userRepository.create({ password, email });
    return this.userRepository.save(newUser);
  }
}

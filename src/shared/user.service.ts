import { Inject, forwardRef } from '@nestjs/common';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterDTO } from '../auth/auth.dto';
import { User } from '../user.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    // @Inject(forwardRef(() => AuthService))
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: RegisterDTO) {
    try {
      const { email } = userDTO;
      const user = await this.userRepository.findOne({ email });
      if (user) {
        return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const newUser = await this.userRepository.create(userDTO);
      return this.userRepository.save(newUser);
    } catch (error) {
      console.log(error.message);
    }
  }

  // async findOne(email) {
  //   return this.userRepository.findOneOrFail(email);
  // }

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

  // createUser(email: string, password: string) {
  //   console.log(name);
  //   const newUser = this.userRepository.create({ password, email });
  //   return this.userRepository.save(newUser);
  // }
}

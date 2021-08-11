import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async signPayload(payload: any) {
    return await sign(payload, this.configService.get('SECRET_KEY'), {
      expiresIn: '12h',
    });
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}

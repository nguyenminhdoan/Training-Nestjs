import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signPayload(payload: any) {
    return await sign(payload, 'keysecret', { expiresIn: '12h' });
  }

  async validateUser(payload: any) {
    return await this.userService.findByPayload(payload);
  }
}

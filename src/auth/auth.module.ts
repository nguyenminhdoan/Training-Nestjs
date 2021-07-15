import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UsersService } from '../users/users.service';

@Module({
  providers: [AuthService, LocalStrategy, UsersService],
  imports: [UsersModule, PassportModule],
  exports: [AuthService, AuthModule],
})
export class AuthModule {}

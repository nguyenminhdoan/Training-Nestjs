import { PassportModule } from '@nestjs/passport';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { LocalStrategy } from 'src/auth/local.strategy';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [PassportModule],
  providers: [UsersService, AuthService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from '../shared/shared.module';
import { JwtStrategy } from './auth-jwt.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [PassportModule, SharedModule],
  controllers: [AuthController],

})
export class AuthModule {}

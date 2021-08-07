import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../shared/user.service';
import { SharedModule } from '../shared/shared.module';
import { User } from '../user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy, UserService],
  imports: [
    PassportModule,
    SharedModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => SharedModule),
  ],
  controllers: [AuthController],
})
export class AuthModule {}

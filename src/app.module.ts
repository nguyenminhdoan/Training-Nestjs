import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(config), SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

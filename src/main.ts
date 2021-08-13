import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.enableCors();

  const configSwagger = new DocumentBuilder()
    .setTitle('hello')
    .setDescription('Nest API project training')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup('/', app, document);

  await app.listen(config.get('PORT'));
}
bootstrap();

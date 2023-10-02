import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { CONFIG } from 'libs/config/src';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number(CONFIG.PORT));

  Logger.log(`Application started on port ${CONFIG.PORT}`, 'NestApplication');
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from './app.module';
import { AppConfig, appConfig } from './app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const _appConfig: AppConfig = await app.get(appConfig.KEY);

  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Request validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(_appConfig.port);
}

bootstrap();

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';

import { AppConfig, appConfig } from './app.config';
import { AppModule } from './app.module';

const APP_NAME = 'nestjs-starter';

async function bootstrap() {
  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL,
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike(APP_NAME, {
            colors: true,
            prettyPrint: true,
          }),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance: logger,
    }),
  });
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

  // Security
  app.use(helmet());
  app.enableCors({
    origin: _appConfig.allowedOrigins || '*',
  });

  await app.listen(_appConfig.port);
}

bootstrap();
